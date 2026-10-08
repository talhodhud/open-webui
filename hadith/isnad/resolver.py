"""
hadith.isnad.resolver
=====================
Evidence-based Narrator and Relative Identity Resolver.
Rules:
1. NEVER fabricates identities or grades without evidence.
2. Raw mentions remain unmodified in raw_text.
3. Multi-candidate names (e.g. bare 'سفيان', 'عمرو', 'عبيد الله', or duplicate names in DB)
   return status='ambiguous' with candidates list and narrator_id=None.
4. Relatives ('أبيه', 'جده') are resolved using authentic context:
   - Patronymic nasab derivation from child's name (e.g. 'سعيد بن أبي بردة' -> father is 'أبو بردة').
   - Grandfather is derived either from 2nd patronymic ('أحمد بن محمد بن علي') or
     by looking up the father's father in isnad_relative_map.
   - If unresolved, status='unknown' / grade='مبهم / يحتاج دليلاً', without assuming reliability.
   - Never claims isnad_relative_map_lookup unless an authentic row was actually used.
5. Strict Sahabi matching: exact normalized match only, never substring of a compound name.
6. Honest grade mapping: negations ('ليس بثقة', 'غير ثقة') -> 'weak';
   non-committal ('غير محدد', 'لم يوثق', 'استنباط من الأسانيد') -> 'unknown'.
"""

import os
import re
import sqlite3
from dataclasses import dataclass, field
from typing import Optional, List, Dict, Tuple, Any

from .parser import ExtractedMention, IsnadParser

SAHABA_META = {
    "ابو هريره": "عبد الرحمن بن صخر الدوسي · ت 57 هـ · روى 5374 حديثاً",
    "عبد الله بن عمر": "أبو عبد الرحمن · ت 73 هـ · مكة والمدينة · روى 2630 حديثاً",
    "انس بن مالك": "أبو حمزة · خادم رسول الله ﷺ · ت 93 هـ · روى 2286 حديثاً",
    "عائشه": "أم عبد الله · الصديقة بنت الصديق · ت 58 هـ · روت 2210 أحاديث",
    "عبد الله بن عباس": "أبو العباس · حبر الأمة وترجمان القرآن · ت 68 هـ · روى 1660 حديثاً",
    "جابر بن عبد الله": "أبو عبد الله · الأنصاري السلمي · ت 78 هـ · روى 1540 حديثاً",
    "ابو سعيد الخدري": "سعد بن مالك بن سنان · ت 74 هـ · روى 1170 حديثاً",
    "علي بن ابي طالب": "أبو الحسن · أمير المؤمنين · ت 40 هـ · روى 586 حديثاً",
    "عمر بن الخطاب": "الفاروق · ت 23 هـ · روى 539 حديثاً",
    "عثمان بن عفان": "أبو عبد الله · ذو النورين · ت 35 هـ · روى 146 حديثاً",
    "ابو بكر الصديق": "عبد الله بن أبي قحافة · الصديق الأكبر · ت 13 هـ · روى 142 حديثاً",
    "ابو موسي الاشعري": "عبد الله بن قيس · ت 44 هـ · صاحب الصوت الندي · والي الكوفة والبصرة",
    "معاويه بن حيده": "معاوية بن حيدة القشيري · صحابي جليل",
    "عبد الله بن عمرو بن العاص": "عبد الله بن عمرو بن العاص · صحابي جليل"
}

@dataclass
class ResolvedMention:
    mention: ExtractedMention
    canonical_name: Optional[str] = None
    narrator_id: Optional[int] = None
    identity_status: str = "unresolved"  # "resolved" | "candidate" | "unresolved"
    grade: str = "غير محدد في المصدر"
    status: str = "unknown"             # "prophet" | "sahabi" | "reliable" | "acceptable" | "weak" | "ambiguous" | "unknown"
    evidence_source: Optional[str] = None
    resolution_rule: Optional[str] = None
    candidates: Optional[List[Dict[str, Any]]] = None

class NarratorResolver:
    def __init__(self, db_path: Optional[str] = None):
        self.db_path = db_path
        self._relative_map_cache: Dict[Tuple[str, str], List[str]] = {}
        self._kunya_map_cache: Dict[str, List[str]] = {}
        self._load_cached_maps()

    def _load_cached_maps(self):
        if not self.db_path or not os.path.exists(self.db_path):
            return
        try:
            conn = sqlite3.connect(self.db_path)
            cur = conn.cursor()
            for r in cur.execute("SELECT narrator_norm, relation_type, relative_name FROM isnad_relative_map").fetchall():
                key = (r[0], r[1])
                if key not in self._relative_map_cache:
                    self._relative_map_cache[key] = []
                self._relative_map_cache[key].append(r[2])
            for r in cur.execute("SELECT kunya_norm, real_name FROM isnad_kunya_map").fetchall():
                key = r[0]
                if key not in self._kunya_map_cache:
                    self._kunya_map_cache[key] = []
                self._kunya_map_cache[key].append(r[1])
            conn.close()
        except Exception:
            pass

    def get_sahabi_meta(self, norm_name: str) -> Optional[str]:
        n_clean = norm_name.strip()
        for k, v in SAHABA_META.items():
            k_norm = IsnadParser.normalize_arabic(k).strip()
            if n_clean == k_norm:
                return v
        return None

    KNOWN_AMBIGUOUS_BARE_NAMES = {
        "سفيان", "عمرو", "عبيد الله", "شعبة", "مالك", "حماد", "يحيى", "سليمان", "إسماعيل", "هشام", "ثابت", "سالم", "خالد", "زاهر"
    }

    def query_narrator_db(self, clean_name: str) -> Tuple[str, str, Optional[List[Dict[str, Any]]], Optional[int], Optional[str]]:
        """
        Queries hadith_rijal.db for narrator credibility and identity.
        Returns (status_key, grade_title, candidates, narrator_id, canonical_name).
        """
        if not self.db_path or not os.path.exists(self.db_path):
            return "unknown", "غير محدد في المصدر", None, None, clean_name

        norm_name = IsnadParser.normalize_arabic(clean_name)
        norm_name = re.sub(r'اء\b', 'ا', norm_name)

        # Check sahabi meta first (EXACT MATCH ONLY)
        s_meta = self.get_sahabi_meta(norm_name)
        if s_meta:
            return "sahabi", "صحابي جليل", None, None, clean_name

        try:
            conn = sqlite3.connect(self.db_path)
            conn.create_function("NORM_AR", 1, IsnadParser.normalize_arabic)
            cur = conn.cursor()

            # Check if this is an abbreviated bare first name without patronymic or kunya
            is_bare_name = (
                norm_name in self.KNOWN_AMBIGUOUS_BARE_NAMES or
                (len(clean_name.split()) == 1 and not clean_name.startswith(("أبو", "ابو", "ابن", "بن", "أم", "ام")))
            )

            if is_bare_name:
                cur.execute(
                    "SELECT id, full_name, grade_ar FROM narrators WHERE full_name_norm = ? OR full_name_norm LIKE ? LIMIT 10",
                    (norm_name, f"{norm_name} بن %")
                )
                rows = cur.fetchall()
                conn.close()
                candidates = [{"id": r[0], "name": r[1].split(" : ")[0].strip(), "grade": r[2]} for r in rows[:5]]
                return "ambiguous", "متعدد المرشحين يحتاج تمييزاً", candidates, None, clean_name

            # Exact name or prefix lookup
            cur.execute(
                "SELECT id, full_name, grade_ar FROM narrators WHERE full_name_norm = ? OR full_name_norm LIKE ? LIMIT 10",
                (norm_name, f"{norm_name} : %")
            )
            rows = cur.fetchall()

            if not rows:
                if len(clean_name.split()) >= 2:
                    cur.execute(
                        "SELECT id, full_name, grade_ar FROM narrators WHERE full_name_norm LIKE ? LIMIT 10",
                        (f"%{norm_name}%",)
                    )
                    rows = cur.fetchall()

            conn.close()

            if not rows:
                return "unknown", "غير محدد في المصدر", None, None, clean_name

            if len(rows) == 1:
                nid, full_name, g_text = rows[0]
                g_key, g_title = self._map_grade_string(g_text)
                return g_key, g_title, None, nid, full_name.split(" : ")[0].strip()

            # Multiple candidates -> ambiguous without assuming identity or grade of row 0
            candidates = [{"id": r[0], "name": r[1].split(" : ")[0].strip(), "grade": r[2]} for r in rows[:5]]
            return "ambiguous", "متعدد المرشحين يحتاج تمييزاً", candidates, None, clean_name

        except Exception:
            return "unknown", "غير محدد في المصدر", None, None, clean_name

    @staticmethod
    def _map_grade_string(grade_text: Optional[str]) -> Tuple[str, str]:
        if not grade_text:
            return "unknown", "غير محدد في المصدر"
        gt = grade_text.strip()
        if not gt:
            return "unknown", "غير محدد في المصدر"

        # Explicit negations and non-reliability terms
        negation_weak = ('ليس بثقة', 'غير ثقة', 'ليس بحجة', 'ليس بالقوي', 'لا يحتج به', 'فيه ضعف', 'تكلم فيه', 'ضعفه', 'لا يوثق', 'ليس بذاك')
        weak_terms = ('ضعيف', 'متروك', 'كذاب', 'وضاع', 'منكر', 'واه', 'ليس بشيء', 'مجهول', 'ساقط', 'تالف', 'واهي')
        unknown_terms = ('غير محدد', 'لم يوثق', 'لا أعرفه', 'مجهول الحال', 'مستور', 'استنباط من الأسانيد', 'روى له')
        reliable_terms = ('ثقة', 'ثبت', 'حجة', 'إمام', 'حافظ', 'عدل', 'متقن', 'ضابط')
        acceptable_terms = ('صدوق', 'لا بأس به', 'مقبول', 'صالح الحديث', 'حسن الحديث', 'محله الصدق')

        if any(nw in gt for nw in negation_weak):
            return "weak", gt
        if any(w in gt for w in weak_terms):
            return "weak", gt
        if any(u in gt for u in unknown_terms):
            return "unknown", gt
        if any(r in gt for r in reliable_terms):
            return "reliable", gt
        if any(a in gt for a in acceptable_terms):
            return "acceptable", gt
        return "unknown", gt

    def resolve_relative(
        self,
        rel_mention: ExtractedMention,
        anchor_mention: Optional[ExtractedMention]
    ) -> ResolvedMention:
        """
        Resolves an ambiguous relative mention like 'عن أبيه' or 'عن جده'
        using authentic contextual evidence from anchor_mention.
        """
        rel_type = rel_mention.relation_type or "relative"
        norm_rel = rel_mention.norm_text

        resolved = ResolvedMention(mention=rel_mention)

        if not anchor_mention:
            resolved.identity_status = "unresolved"
            resolved.grade = "مبهم / يحتاج دليلاً"
            resolved.status = "unknown"
            return resolved

        anchor_raw = anchor_mention.raw_text
        anchor_norm = anchor_mention.norm_text

        # 1. Patronymic Nasab Derivation for father
        # E.g. 'سعيد بن أبي بردة' -> father is 'أبو بردة'
        if rel_type == "father" or norm_rel in ("ابيه", "ابي", "ابوه", "والده"):
            if " بن " in anchor_raw:
                parts = anchor_raw.split(" بن ", 1)
                father_candidate = parts[1].strip()
                father_name = father_candidate.split(" بن ")[0].strip()
                if father_name.startswith("أبي ") or father_name.startswith("ابي "):
                    father_name = "أبو " + father_name[4:].strip()

                g_key, g_title, cands, nid, c_name = self.query_narrator_db(father_name)

                resolved.canonical_name = c_name or father_name
                resolved.narrator_id = nid
                resolved.identity_status = "resolved" if g_key in ("reliable", "acceptable", "weak", "sahabi") else "candidate"
                resolved.grade = g_title
                resolved.status = g_key
                resolved.evidence_source = "patronymic_nasab_derivation" if g_key in ("reliable", "acceptable", "weak", "sahabi") else None
                resolved.resolution_rule = f"مشتق من نسب الابن ({anchor_raw})" if g_key in ("reliable", "acceptable", "weak", "sahabi") else "لم يتم العثور على قرينة حاسمة في قاعدة البيانات"
                resolved.candidates = cands
                return resolved

            # Check cached isnad_relative_map
            fathers_from_map = self._relative_map_cache.get((anchor_norm, "father"), [])
            distinct_fathers = list(dict.fromkeys(fathers_from_map))
            if len(distinct_fathers) > 1:
                cands_list = []
                for fn in distinct_fathers:
                    gk, gt, _, nid, cn = self.query_narrator_db(fn)
                    cands_list.append({"id": nid, "name": cn or fn, "grade": gt or "غير محدد"})
                resolved.canonical_name = None
                resolved.narrator_id = None
                resolved.identity_status = "candidate"
                resolved.status = "ambiguous"
                resolved.grade = "متعدد المرشحين يحتاج تمييزاً"
                resolved.evidence_source = "isnad_relative_map_lookup_multiple_candidates"
                resolved.resolution_rule = f"تعدد المرشحين في قاعدة العلاقات كوالد لـ ({anchor_raw})"
                resolved.candidates = cands_list
                return resolved
            elif len(distinct_fathers) == 1:
                father_from_map = distinct_fathers[0]
                g_key, g_title, cands, nid, c_name = self.query_narrator_db(father_from_map)
                resolved.canonical_name = c_name or father_from_map
                resolved.narrator_id = nid
                resolved.identity_status = "resolved"
                resolved.grade = g_title
                resolved.status = g_key
                resolved.evidence_source = "isnad_relative_map_lookup"
                resolved.resolution_rule = f"مسجل في قاعدة العلاقات الإسنادية كوالد لـ ({anchor_raw})"
                resolved.candidates = cands
                return resolved

        # 2. Grandfather resolution
        if rel_type == "grandfather" or norm_rel in ("جده", "جد"):
            # Determine father first if anchor is grandson with patronymic
            gf_candidates = []
            evidence_src = None
            res_rule = None

            # Case A: anchor has two 'بن' e.g. 'سعيد بن أبي بردة بن أبي موسى' -> grandfather is 3rd part
            if anchor_raw.count(" بن ") >= 2:
                parts = anchor_raw.split(" بن ")
                gf_candidates = [parts[2].strip()]
                evidence_src = "patronymic_nasab_derivation"
                res_rule = f"مشتق من نسب الحفيد ({anchor_raw})"

            # Case B: anchor has one 'بن' e.g. 'طالب بن أبي سالم' or 'سعيد بن أبي بردة'
            # The father is parts[1] ('أبو سالم' / 'أبو بردة'). The grandfather is the father's father!
            elif " بن " in anchor_raw:
                parts = anchor_raw.split(" بن ", 1)
                father_candidate = parts[1].split(" بن ")[0].strip()
                if father_candidate.startswith("أبي ") or father_candidate.startswith("ابي "):
                    father_candidate = "أبو " + father_candidate[4:].strip()
                father_norm = IsnadParser.normalize_arabic(father_candidate)

                # Look up father's father in isnad_relative_map
                gfs = self._relative_map_cache.get((father_norm, "father"), [])
                if gfs:
                    gf_candidates = list(dict.fromkeys(gfs))
                    evidence_src = "isnad_relative_map_lookup"
                    res_rule = f"مسجل في قاعدة العلاقات الإسنادية كجد لـ ({anchor_raw})"
                else:
                    # Also check direct grandfather map for anchor_norm
                    direct_gfs = self._relative_map_cache.get((anchor_norm, "grandfather"), [])
                    if direct_gfs:
                        gf_candidates = list(dict.fromkeys(direct_gfs))
                        evidence_src = "isnad_relative_map_lookup"
                        res_rule = f"مسجل في قاعدة العلاقات الإسنادية كجد لـ ({anchor_raw})"

            # Case C: anchor is ALREADY the father (e.g. 'أبو سالم' or 'أبو بردة')
            else:
                anchor_first = anchor_raw.split(" : ")[0].split(" ، ")[0].strip()
                anchor_kunya_norm = IsnadParser.normalize_arabic(anchor_first)
                if anchor_kunya_norm.startswith("ابي "):
                    anchor_kunya_norm = "ابو " + anchor_kunya_norm[4:].strip()

                gfs = self._relative_map_cache.get((anchor_kunya_norm, "father"), [])
                if gfs:
                    gf_candidates = list(dict.fromkeys(gfs))
                    evidence_src = "isnad_relative_map_lookup"
                    res_rule = f"مسجل في قاعدة العلاقات الإسنادية كجد لـ ({anchor_raw})"

            if len(gf_candidates) > 1:
                cands_list = []
                for gn in gf_candidates:
                    gk, gt, _, nid, cn = self.query_narrator_db(gn)
                    cands_list.append({"id": nid, "name": cn or gn, "grade": gt or "غير محدد"})
                resolved.canonical_name = None
                resolved.narrator_id = None
                resolved.identity_status = "candidate"
                resolved.status = "ambiguous"
                resolved.grade = "متعدد المرشحين يحتاج تمييزاً"
                resolved.evidence_source = "isnad_relative_map_lookup_multiple_candidates"
                resolved.resolution_rule = f"تعدد المرشحين في قاعدة العلاقات كجد لـ ({anchor_raw})"
                resolved.candidates = cands_list
                return resolved
            elif len(gf_candidates) == 1:
                gf_name = gf_candidates[0]
                g_key, g_title, cands, nid, c_name = self.query_narrator_db(gf_name)
                resolved.canonical_name = c_name or gf_name
                resolved.narrator_id = nid
                resolved.identity_status = "resolved"
                resolved.grade = g_title
                resolved.status = g_key
                resolved.evidence_source = evidence_src
                resolved.resolution_rule = res_rule
                resolved.candidates = cands
                return resolved

        # If no authentic evidence could resolve the relative:
        resolved.identity_status = "unresolved"
        resolved.grade = "مبهم / يحتاج دليلاً"
        resolved.status = "unknown"
        resolved.canonical_name = None
        resolved.narrator_id = None
        resolved.evidence_source = None
        resolved.resolution_rule = "لم يتم العثور على قرينة حاسمة في قاعدة البيانات"
        return resolved

    def resolve_mention(
        self,
        mention: ExtractedMention,
        anchor_mention: Optional[ExtractedMention] = None
    ) -> ResolvedMention:
        """
        Resolves a mention:
        - If relative, calls resolve_relative.
        - Otherwise, queries database without fabricating identity or grade.
        """
        if mention.is_relative:
            return self.resolve_relative(mention, anchor_mention)

        resolved = ResolvedMention(mention=mention)
        raw_name = mention.raw_text

        # Kunya lookup from cache if single kunya
        norm_name = mention.norm_text
        kunyas = self._kunya_map_cache.get(norm_name, [])
        lookup_name = kunyas[0] if len(kunyas) == 1 else raw_name

        g_key, g_title, cands, nid, c_name = self.query_narrator_db(lookup_name)

        resolved.canonical_name = c_name or (f"{raw_name} [{kunyas[0]}]" if len(kunyas) == 1 else raw_name)
        resolved.narrator_id = nid
        resolved.grade = g_title
        resolved.status = g_key
        resolved.candidates = cands

        if g_key in ("reliable", "acceptable", "weak", "sahabi") and nid is not None:
            resolved.identity_status = "resolved"
            resolved.evidence_source = "hadith_rijal_db_exact_match"
        elif g_key == "ambiguous" or (cands and len(cands) > 1):
            resolved.canonical_name = raw_name
            resolved.narrator_id = None
            resolved.identity_status = "candidate"
            resolved.status = "ambiguous"
            resolved.evidence_source = "hadith_rijal_db_multiple_candidates"
        else:
            resolved.identity_status = "unresolved"
            resolved.evidence_source = None

        return resolved
