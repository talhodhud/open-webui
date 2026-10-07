"""
hadith.isnad.resolver
=====================
Evidence-based Narrator and Relative Identity Resolver.
Rules:
1. NEVER fabricates identities or grades without evidence.
2. Raw mentions remain unmodified in raw_text.
3. Multi-candidate names (e.g. bare 'سفيان', 'عمرو', 'عبيد الله') return status='ambiguous' with candidates list.
4. Relatives ('أبيه', 'جده') are resolved using authentic context:
   - Patronymic nasab derivation from child's name (e.g. 'سعيد بن أبي بردة' -> father is 'أبو بردة').
   - isnad_relative_map lookup for father/grandfather (e.g. father of 'أبو بردة' is 'أبو موسى الأشعري').
   - If unresolved, status='unknown' / grade='مبهم / يحتاج دليلاً', without assuming reliability.
5. Strict Sahabi matching (prevents bare 'عمرو' from falsely matching 'عبد الله بن عمرو').
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
        self._relative_map_cache: Dict[Tuple[str, str], str] = {}
        self._kunya_map_cache: Dict[str, str] = {}
        self._load_cached_maps()

    def _load_cached_maps(self):
        if not self.db_path or not os.path.exists(self.db_path):
            return
        try:
            conn = sqlite3.connect(self.db_path)
            cur = conn.cursor()
            for r in cur.execute("SELECT narrator_norm, relation_type, relative_name FROM isnad_relative_map").fetchall():
                self._relative_map_cache[(r[0], r[1])] = r[2]
            for r in cur.execute("SELECT kunya_norm, real_name FROM isnad_kunya_map").fetchall():
                self._kunya_map_cache[r[0]] = r[1]
            conn.close()
        except Exception:
            pass

    def get_sahabi_meta(self, norm_name: str) -> Optional[str]:
        n_clean = norm_name.strip()
        for k, v in SAHABA_META.items():
            k_norm = IsnadParser.normalize_arabic(k).strip()
            if n_clean == k_norm:
                return v
            k_words = k_norm.split()
            if len(k_words) >= 2 and k_norm in n_clean:
                return v
        return None

    KNOWN_AMBIGUOUS_BARE_NAMES = {
        "سفيان", "عمرو", "عبيد الله", "شعبة", "مالك", "حماد", "يحيى", "سليمان", "إسماعيل", "هشام"
    }

    def query_narrator_db(self, clean_name: str) -> Tuple[str, str, Optional[List[Dict[str, Any]]], Optional[int], Optional[str]]:
        """
        Queries hadith_rijal.db for narrator credibility and identity.
        Returns (status_key, grade_title, candidates, narrator_id, canonical_name).
        """
        if not self.db_path or not os.path.exists(self.db_path):
            return "unknown", "غير محدد في المصدر", None, None, None

        norm_name = IsnadParser.normalize_arabic(clean_name)
        # Handle trailing hamza variation like زكرياء -> زكريا
        norm_name = re.sub(r'اء\b', 'ا', norm_name)

        # Check sahabi meta first
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
                return "ambiguous", "متعدد المرشحين يحتاج تمييزاً", candidates, None, None

            # Exact name or prefix lookup
            cur.execute(
                "SELECT id, full_name, grade_ar FROM narrators WHERE full_name_norm = ? OR full_name_norm LIKE ? LIMIT 10",
                (norm_name, f"{norm_name} : %")
            )
            rows = cur.fetchall()

            if not rows:
                # Substring candidate search if name has at least 2 words
                if len(clean_name.split()) >= 2:
                    cur.execute(
                        "SELECT id, full_name, grade_ar FROM narrators WHERE full_name_norm LIKE ? LIMIT 10",
                        (f"%{norm_name}%",)
                    )
                    rows = cur.fetchall()

            conn.close()

            if not rows:
                return "unknown", "غير محدد في المصدر", None, None, None

            if len(rows) == 1:
                nid, full_name, g_text = rows[0]
                g_key, g_title = self._map_grade_string(g_text)
                return g_key, g_title, None, nid, full_name.split(" : ")[0].strip()

            # Multiple candidates
            nid, full_name, g_text = rows[0]
            g_key, g_title = self._map_grade_string(g_text)
            candidates = [{"id": r[0], "name": r[1].split(" : ")[0].strip(), "grade": r[2]} for r in rows[:5]]
            return g_key, g_title, candidates, nid, full_name.split(" : ")[0].strip()

        except Exception:
            return "unknown", "غير محدد في المصدر", None, None, None

    @staticmethod
    def _map_grade_string(grade_text: Optional[str]) -> Tuple[str, str]:
        if not grade_text:
            return "unknown", "غير محدد في المصدر"
        gt = grade_text.strip()
        reliable_terms = ('ثقة', 'ثبت', 'حجة', 'إمام', 'حافظ', 'عدل', 'متقن', 'ضابط')
        acceptable_terms = ('صدوق', 'لا بأس به', 'مقبول', 'صالح الحديث', 'حسن الحديث', 'محله الصدق', 'روى له')
        weak_terms = ('ضعيف', 'متروك', 'كذاب', 'وضاع', 'منكر', 'واه', 'ليس بشيء', 'مجهول', 'ساقط')

        if any(w in gt for w in weak_terms):
            return "weak", gt
        if any(r in gt for r in reliable_terms):
            return "reliable", gt
        if any(a in gt for a in acceptable_terms):
            return "acceptable", gt
        return "acceptable", gt

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
        if rel_type == "father" or norm_rel in ("ابيه", "ابي", "ابوه"):
            # Check if anchor name contains 'بن <father>'
            if " بن " in anchor_raw:
                parts = anchor_raw.split(" بن ", 1)
                father_candidate = parts[1].strip()
                father_name = father_candidate.split(" بن ")[0].strip()
                # Normalize kunya from genitive to nominative (e.g. 'أبي بردة' -> 'أبو بردة')
                if father_name.startswith("أبي ") or father_name.startswith("ابي "):
                    father_name = "أبو " + father_name[4:].strip()

                norm_father = IsnadParser.normalize_arabic(father_name)
                # Check DB for father's biographical profile
                g_key, g_title, cands, nid, c_name = self.query_narrator_db(father_name)

                resolved.canonical_name = c_name or father_name
                resolved.narrator_id = nid
                resolved.identity_status = "resolved" if g_key in ("reliable", "acceptable", "weak", "sahabi") else "unresolved"
                resolved.grade = g_title
                resolved.status = g_key
                resolved.evidence_source = "patronymic_nasab_derivation" if g_key in ("reliable", "acceptable", "weak", "sahabi") else None
                resolved.resolution_rule = f"مشتق من نسب الابن ({anchor_raw})" if g_key in ("reliable", "acceptable", "weak", "sahabi") else "لم يتم العثور على قرينة حاسمة في قاعدة البيانات"
                resolved.candidates = cands
                return resolved

            # Check cached isnad_relative_map
            father_from_map = self._relative_map_cache.get((anchor_norm, "father"))
            if father_from_map:
                g_key, g_title, cands, nid, c_name = self.query_narrator_db(father_from_map)
                resolved.canonical_name = c_name or father_from_map
                resolved.narrator_id = nid
                resolved.identity_status = "resolved" if g_key in ("reliable", "acceptable", "weak", "sahabi") else "unresolved"
                resolved.grade = g_title
                resolved.status = g_key
                resolved.evidence_source = "isnad_relative_map_lookup"
                resolved.resolution_rule = f"مسجل في قاعدة العلاقات الإسنادية كوالد لـ ({anchor_raw})"
                return resolved

        # 2. Grandfather resolution
        if rel_type == "grandfather" or norm_rel in ("جده", "جد"):
            # Grandfather can be resolved via:
            # A) Anchor is father (e.g. 'أبو بردة'): look up father of father in relative_map
            # B) Anchor is grandson (e.g. 'سعيد بن أبي بردة'): derive father first, then look up in relative_map
            gf_name = None

            # Case A: anchor is already the father
            anchor_first = anchor_raw.split(" : ")[0].split(" ، ")[0].strip()
            if " بن " in anchor_first:
                # e.g. 'أبو بردة بن أبي موسى' -> his father is 'أبو موسى'
                parts = anchor_first.split(" بن ")
                anchor_kunya_or_first = parts[0].strip()
                gf_from_nasab = parts[1].strip()
                if len(parts) >= 2:
                    gf_name = gf_from_nasab
            else:
                anchor_kunya_or_first = anchor_first

            anchor_kunya_norm = IsnadParser.normalize_arabic(anchor_kunya_or_first)
            if anchor_kunya_norm.startswith("ابي "):
                anchor_kunya_norm = "ابو " + anchor_kunya_norm[4:].strip()

            if not gf_name:
                gf_name = self._relative_map_cache.get((anchor_kunya_norm, "father"))

            # Case B: anchor is grandson (e.g. 'سعيد بن أبي بردة')
            if not gf_name and " بن " in anchor_raw:
                parts = anchor_raw.split(" بن ", 1)
                father_candidate = parts[1].split(" بن ")[0].strip()
                if father_candidate.startswith("أبي ") or father_candidate.startswith("ابي "):
                    father_candidate = "أبو " + father_candidate[4:].strip()
                father_norm = IsnadParser.normalize_arabic(father_candidate)
                gf_name = self._relative_map_cache.get((father_norm, "father"))

            # Also check direct grandfather map
            if not gf_name:
                gf_name = self._relative_map_cache.get((anchor_norm, "grandfather"))

            if gf_name:
                g_key, g_title, cands, nid, c_name = self.query_narrator_db(gf_name)
                resolved.canonical_name = c_name or gf_name
                resolved.narrator_id = nid
                resolved.identity_status = "resolved" if g_key in ("reliable", "acceptable", "weak", "sahabi") else "unresolved"
                resolved.grade = g_title
                resolved.status = g_key
                resolved.evidence_source = "isnad_relative_map_lookup"
                resolved.resolution_rule = f"مسجل في قاعدة العلاقات الإسنادية كجد لـ ({anchor_raw})"
                return resolved

        # If no evidence could resolve the relative:
        resolved.identity_status = "unresolved"
        resolved.grade = "مبهم / يحتاج دليلاً"
        resolved.status = "unknown"
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
        kunya_real = self._kunya_map_cache.get(norm_name)
        lookup_name = kunya_real if kunya_real else raw_name

        g_key, g_title, cands, nid, c_name = self.query_narrator_db(lookup_name)

        resolved.canonical_name = c_name or (f"{raw_name} [{kunya_real}]" if kunya_real else raw_name)
        resolved.narrator_id = nid
        resolved.grade = g_title
        resolved.status = g_key
        resolved.candidates = cands

        if g_key in ("reliable", "acceptable", "weak", "sahabi"):
            resolved.identity_status = "resolved"
            resolved.evidence_source = "hadith_rijal_db_exact_match"
        elif g_key == "ambiguous":
            resolved.identity_status = "candidate"
            resolved.evidence_source = "hadith_rijal_db_multiple_candidates"
        else:
            resolved.identity_status = "unresolved"
            resolved.evidence_source = None

        return resolved
