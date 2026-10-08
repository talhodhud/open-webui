"""
hadith.isnad.parser
===================
General Isnad tokenizer and structural parser.
Extracts:
1. Tahweel [ح] branches (zero, one, or multiple).
2. Convergence points (كلاهما عن / جميعا عن / قالا عن / جميعهم عن).
3. Co-narrators coordinated with 'و' (e.g. إسحاق بن إبراهيم، وابن أبي خلف).
4. Authentic character-level source spans on original text (preserving leading whitespace).
5. Clean separation of referral notes (نحو حديث شعبة) and exception notes (وليس في حديث زيد...).
6. Raw mention names without synthetic assumptions.
"""

import re
from dataclasses import dataclass, field
from typing import List, Dict, Tuple, Optional, Any

DIACRITICS_RE = re.compile(r'[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0640]')

NATIVE_WAW_NAMES = {
    'وهب', 'وكيع', 'واصل', 'وهبان', 'ورقاء', 'وضاح', 'وليد', 'وهيب',
    'واقد', 'واثلة', 'وجيه', 'وديعة', 'وردان', 'وصيف', 'وعلة'
}

RELATIVE_TERMS = {
    'ابيه': 'father', 'ابي': 'father', 'ابوه': 'father', 'والده': 'father',
    'جده': 'grandfather', 'جد': 'grandfather',
    'عمه': 'uncle', 'عم': 'uncle',
    'خاله': 'maternal_uncle', 'خال': 'maternal_uncle',
    'خالته': 'aunt', 'عمتة': 'aunt', 'عمته': 'aunt',
    'امه': 'mother', 'ام': 'mother'
}

NON_NARRATOR_WORDS = {
    'الله', 'رسول', 'رسول الله', 'ذلك', 'هذا', 'كان', 'النبي',
    'صلى الله عليه وسلم', 'عليه السلام', 'رضي الله عنه', 'رحمه الله',
    'سلم', 'وسلم', 'صلى', 'صلي', 'عليه', 'عليهم',
    'يقول', 'يحدث', 'قال', 'قالت', 'سمع', 'سمعت', 'يروي', 'روى'
}

@dataclass
class ExtractedMention:
    mention_id: str
    raw_text: str
    norm_text: str
    source_span: Tuple[int, int]
    transmission_term: str
    transmission_span: Tuple[int, int]
    is_relative: bool = False
    relation_type: Optional[str] = None
    branch_id: Optional[str] = None
    stage_index: int = 0
    co_narrator_index: int = 0

@dataclass
class ParsedBranch:
    branch_id: str
    stages: List[List[ExtractedMention]] = field(default_factory=list)
    has_prophetic_endpoint: bool = False
    prophetic_span: Optional[Tuple[int, int]] = None

@dataclass
class ParsedIsnad:
    original_text: str
    clean_text: str
    branches: List[ParsedBranch] = field(default_factory=list)
    common_link: Optional[ExtractedMention] = None
    stem_stages: List[List[ExtractedMention]] = field(default_factory=list)
    has_prophetic_endpoint: bool = False
    prophetic_span: Optional[Tuple[int, int]] = None
    referral_note: Optional[str] = None
    variant_notes: List[str] = field(default_factory=list)
    is_branched: bool = False


class IsnadParser:
    @staticmethod
    def strip_diacritics(text: str) -> str:
        if not text:
            return ""
        return DIACRITICS_RE.sub("", text)

    @staticmethod
    def build_char_mapping(orig_text: str) -> Tuple[str, List[int]]:
        clean_chars = []
        mapping = []
        for orig_idx, ch in enumerate(orig_text):
            if not DIACRITICS_RE.match(ch):
                norm_ch = ch
                if norm_ch in 'إأآٱ':
                    norm_ch = 'ا'
                elif norm_ch == 'ة':
                    norm_ch = 'ه'
                elif norm_ch == 'ى':
                    norm_ch = 'ي'
                mapping.append(orig_idx)
                clean_chars.append(norm_ch)
        return "".join(clean_chars), mapping

    @staticmethod
    def get_orig_slice(clean_start: int, clean_end: int, clean_to_orig_map: List[int], orig_text: str) -> Tuple[int, int]:
        orig_len = len(orig_text)
        if not clean_to_orig_map or clean_start >= len(clean_to_orig_map):
            return 0, 0
        orig_start = clean_to_orig_map[clean_start]
        end_idx = min(clean_end - 1, len(clean_to_orig_map) - 1)
        orig_last_char = clean_to_orig_map[end_idx]
        orig_end = orig_last_char + 1
        while orig_end < orig_len and DIACRITICS_RE.match(orig_text[orig_end]):
            orig_end += 1
        return orig_start, orig_end

    @staticmethod
    def normalize_arabic(s: str) -> str:
        if not s:
            return ""
        s = DIACRITICS_RE.sub("", s.strip())
        s = re.sub(r'[إأآاٱ]', 'ا', s)
        s = re.sub(r'ة\b', 'ه', s)
        s = re.sub(r'ى\b', 'ي', s)
        s = re.sub(r'[{}\[\]\(\)«»"“”‏\.]', '', s)
        return re.sub(r'\s+', ' ', s).strip()

    @classmethod
    def clean_raw_mention(cls, text: str) -> str:
        s = DIACRITICS_RE.sub("", text)
        s = re.sub(r'\s*رض[يى]\s*الله\s*عنه[ما]*\s*', ' ', s)
        s = re.sub(r'[ـ\s]*عليه\s*السلام[ـ\s]*', ' ', s)
        s = re.sub(r'[ـ\s]*(?:صلى|صلي)\s*الله\s*عليه\s*(?:وسلم|واله)?\s*', ' ', s)
        s = re.sub(r'\s*رحم[هة]\s*الله\s*', ' ', s)
        s = re.sub(r'\s*(?:زوج\s+النبي|ام\s+المؤمنين)\s*', ' ', s)
        s = re.sub(r'[{}\[\]\(\)«»"“”‏:،,\.]', ' ', s)
        s = re.sub(r'^(?:[وف]?(?:حدثنا|حدثني|اخبرنا|اخبرني|انبانا|سمعت|عن|ان|انها|انه|قال|يقول)\s+)+', '', s)
        s = re.sub(r'\s*(?:على|علي)\s+المنبر\s*', ' ', s)
        s = re.sub(r'\s+(?:يقول|يحدث|قال)\s*$', '', s)
        s = re.sub(r'^[،,\s\.]+|[،,\s\.]+$', '', s)
        # Strip conjunction waw e.g. "وابن أبي خلف" -> "ابن أبي خلف"
        if s.startswith('و') and len(s) >= 4:
            s_rest = s[1:].strip()
            norm_rest = cls.normalize_arabic(s_rest)
            if s_rest.startswith('ال') or norm_rest.startswith(('ابن', 'بن', 'ابو', 'ابي', 'ابا', 'عبد', 'اسحاق', 'محمد')):
                s = s_rest
        return re.sub(r'\s+', ' ', s).strip()

    @classmethod
    def split_co_narrators(cls, stage_text: str) -> List[str]:
        raw_parts = [p.strip() for p in re.split(r'[\n]', stage_text) if p.strip()]
        results = []
        for p in raw_parts:
            p = p.strip()
            if not p:
                continue
            words = p.split()
            current = []
            for i, w in enumerate(words):
                norm_w = cls.normalize_arabic(w)
                if w == 'و':
                    if current:
                        results.append(" ".join(current))
                        current = []
                    continue

                if w.startswith('و') and len(w) >= 3 and current:
                    rest = w[1:]
                    norm_w_no_waw = cls.normalize_arabic(rest)
                    clean_first_word = cls.normalize_arabic(w)
                    if clean_first_word in NATIVE_WAW_NAMES:
                        current.append(w)
                    elif rest.startswith('ال') or norm_w_no_waw in ('ابن', 'بن', 'ابو', 'ابي', 'ابا', 'عبد'):
                        results.append(" ".join(current))
                        current = [rest]
                    elif len(rest) >= 3 and not (current and current[-1] in ('بن', 'ابن', 'ابو', 'ابي', 'ام')):
                        results.append(" ".join(current))
                        current = [rest]
                    else:
                        current.append(w)
                else:
                    current.append(w)

            if current:
                results.append(" ".join(current))

        cleaned_results = []
        for r in results:
            c = cls.clean_raw_mention(r)
            norm_c = cls.normalize_arabic(c)
            if len(c) >= 2 and c not in NON_NARRATOR_WORDS and norm_c not in NON_NARRATOR_WORDS:
                cleaned_results.append(c)
        return cleaned_results

    @classmethod
    def find_isnad_end(cls, clean_text: str) -> int:
        """
        Determines the structural boundary between Isnad and Matn:
        1. Referral or variant notes at the end (نحو حديث فلان, بمثله, بمعناه, وليس في حديث...)
        2. Quoted speech: Speech verbs (قال, قالت, يقول, انه قال, انها قالت) followed by quotes/colon
        3. Prophetic terminus (عن/ان/سمعت النبي/رسول الله صلي الله عليه وسلم) followed by speech or action
        4. Companion speech verb (قال/قالت) followed by narrative story verbs or dialog
        """
        # 1. Referral or variant notes
        m_ref = re.search(r'(?:[،,\.\s]+|\b)(نحو\s+حديث|بمثله|بمعناه|وليس\s+في\s+حديث|زاد\s+في|وفي\s+رواية|غير\s+ان|وزاد)\b', clean_text)
        ref_pos = m_ref.start() if m_ref else len(clean_text)

        # 2. Quoted speech: Speech verb followed by quotes/colons
        # Matches: قال "...", يقول : "...", قالت "...", قال ‏"‏...
        m_quote = re.search(r'(?:[،,\.\s]+|\b)(?:قال|قالت|يقول|انه\s+قال|انها\s+قالت)\s*[:،,\.\s]*[\"\'«“\u200f]', clean_text)
        if m_quote and m_quote.start() < ref_pos:
            ref_pos = m_quote.start()

        # 3. Prophetic terminus:
        prophet_pattern = r'(?:عن|ان|سمعت|روي)\s+(?:النبي|رسول\s+الله)(?:\s+صلي\s+الله\s+عليه\s+وسلم|\s+عليه\s+السلام)?'
        m_prophet = re.search(prophet_pattern, clean_text)
        if m_prophet and m_prophet.start() < ref_pos:
            after_prophet = clean_text[m_prophet.end():ref_pos]
            m_after = re.search(r'^\s*(?:[،,\.\s]+|\b)(?:قال|قالت|يقول|انه\s+قال|يحدث|خطبنا|كان|نهي|امر|سئل|دخل|رايت|اتي|لما|اذا)\b', after_prophet)
            if m_after:
                end_candidate = m_prophet.end()
                if end_candidate < ref_pos:
                    ref_pos = end_candidate
            else:
                m_q = re.search(r'[\"\'«“\u200f]', after_prophet)
                if m_q:
                    end_candidate = m_prophet.end() + m_q.start()
                    if end_candidate < ref_pos:
                        ref_pos = end_candidate

        # 4. Companion speech verb before narrative story verbs or dialog:
        m_story = re.search(r'(?:[،,\.\s]+|\b)(?:قال|قالت)\s+(?:دخل|دخلت|دخلنا|رهط|لما|خسفت|كسفت|نودي|سالت|رايت|اتي|اتاني|جاء|جاءه|خرج|خطب|كنا|انما|من\s+كان|من\s+حج)\b', clean_text)
        if m_story and m_story.start() < ref_pos:
            ref_pos = m_story.start()

        return ref_pos

    def parse(self, text: str) -> ParsedIsnad:
        # Keep original text without stripping to preserve exact caller offsets
        orig_text = text
        clean_text, clean_to_orig = self.build_char_mapping(orig_text)

        # 1. Extract and detach referral and exception notes
        referral_note = None
        variant_notes = []

        m_ref = re.search(r'(?:[،,\.\s]+|\b)(نحو\s+حديث\s+[^\.\n،]+?)(?=\s+(?:وليس|زاد|وفي|وقال)|\.|\n|$)', clean_text)
        if m_ref:
            referral_note = m_ref.group(1).strip()

        m_var = re.finditer(r'(?:[،,\.\s]+|\b)(وليس\s+في\s+حديث\s+[^\.\n]+|زاد\s+في\s+[^\.\n]+)', clean_text)
        for mv in m_var:
            variant_notes.append(mv.group(1).strip())

        # Strip matn body and trailing notes via structural analysis
        isnad_clean_end = self.find_isnad_end(clean_text)
        isnad_clean = clean_text[:isnad_clean_end]

        # 2. Check Tahweel and Convergence
        tahweel_regex = r'[\s,،]+(?:[\(\[]?\s*ح\s*[\)\]]?|تحويل)[\s,،]+'
        conv_regex = r'[\s,،]+(?:كلاهما|كلاهم|جميعا|جميعهم|قالا|رويا)\s+(?:عن|قال|روى)\s+'

        t_matches = list(re.finditer(tahweel_regex, isnad_clean))
        c_match = re.search(conv_regex, isnad_clean)

        is_branched = bool(t_matches or c_match)

        parsed = ParsedIsnad(
            original_text=orig_text,
            clean_text=clean_text,
            referral_note=referral_note,
            variant_notes=variant_notes,
            is_branched=is_branched
        )

        # Case A: Tahweel with Convergence (e.g. Muslim 32:8, two_h_three_branches)
        if c_match and t_matches and t_matches[0].start() < c_match.start():
            relevant_t_matches = [tm for tm in t_matches if tm.start() < c_match.start()]
            chunks = []
            curr_pos = 0
            for tm in relevant_t_matches:
                chunks.append((curr_pos, tm.start()))
                curr_pos = tm.end()
            chunks.append((curr_pos, c_match.start()))

            for b_idx, (c_start, c_end) in enumerate(chunks):
                b_chunk = isnad_clean[c_start:c_end]
                branch = ParsedBranch(branch_id=f"b{b_idx+1}")
                branch.stages = self._extract_stages(b_chunk, clean_to_orig, orig_text, offset=c_start, branch_id=f"b{b_idx+1}")
                parsed.branches.append(branch)

            stem_chunk = isnad_clean[c_match.end():]
            stem_stages = self._extract_stages(stem_chunk, clean_to_orig, orig_text, offset=c_match.end(), branch_id="stem", is_stem=True)
            if stem_stages:
                parsed.common_link = stem_stages[0][0]
                parsed.stem_stages = stem_stages[1:]
            else:
                parsed.stem_stages = []

            self._detect_prophetic_endpoint(stem_chunk, c_match.end(), clean_to_orig, orig_text, parsed)

        # Case B: Tahweel without Convergence (unjoined parallel chains, e.g. h_without_join)
        elif t_matches and not c_match:
            chunks = []
            curr_pos = 0
            for tm in t_matches:
                chunks.append((curr_pos, tm.start()))
                curr_pos = tm.end()
            chunks.append((curr_pos, len(isnad_clean)))

            has_any_prophet = False
            for b_idx, (c_start, c_end) in enumerate(chunks):
                b_chunk = isnad_clean[c_start:c_end]
                branch = ParsedBranch(branch_id=f"b{b_idx+1}")
                branch.stages = self._extract_stages(b_chunk, clean_to_orig, orig_text, offset=c_start, branch_id=f"b{b_idx+1}")
                p_span = self._detect_prophetic_in_chunk(b_chunk, c_start, clean_to_orig, orig_text)
                if p_span:
                    branch.has_prophetic_endpoint = True
                    branch.prophetic_span = p_span
                    has_any_prophet = True
                    if not parsed.prophetic_span:
                        parsed.prophetic_span = p_span
                parsed.branches.append(branch)

            parsed.has_prophetic_endpoint = has_any_prophet

        # Case C: Single isnad (no Tahweel)
        else:
            single_branch = ParsedBranch(branch_id="primary")
            single_branch.stages = self._extract_stages(isnad_clean, clean_to_orig, orig_text, offset=0, branch_id="primary")
            parsed.branches.append(single_branch)
            self._detect_prophetic_endpoint(isnad_clean, 0, clean_to_orig, orig_text, parsed)
            if single_branch.stages and len(single_branch.stages[0]) > 1:
                parsed.is_branched = True

        return parsed

    def _extract_stages(
        self,
        chunk_clean: str,
        clean_to_orig: List[int],
        orig_text: str,
        offset: int,
        branch_id: str,
        is_stem: bool = False
    ) -> List[List[ExtractedMention]]:
        verbs_pattern = r'(?:^|(?<=[\s،,]))([وف]?(?:حدثنا|حدثني|حدثه|حدثهم|اخبرنا|اخبرني|اخبره|اخبرهم|انبانا|سمعت|سمعنا|سمع|انه سمع|انها سمعت|يخبر|يروي|عن|انها|انه|ان|قال(?:\s+قال)?))(?=\s+)'
        v_matches = list(re.finditer(verbs_pattern, chunk_clean))

        stages = []
        stage_idx = 0

        # In stem chunks (after "كلاهما عن"), the first narrator might precede the first verb
        if is_stem and v_matches and v_matches[0].start() > 0:
            lead_chunk = chunk_clean[:v_matches[0].start()].strip()
            clean_name = self.clean_raw_mention(lead_chunk)
            if len(clean_name) >= 2 and clean_name not in NON_NARRATOR_WORDS:
                start_c = offset + chunk_clean.find(lead_chunk)
                end_c = start_c + len(lead_chunk)
                s_span = self.get_orig_slice(start_c, end_c, clean_to_orig, orig_text)
                norm_n = self.normalize_arabic(clean_name)
                is_rel = norm_n in RELATIVE_TERMS
                rel_type = RELATIVE_TERMS.get(norm_n)
                m = ExtractedMention(
                    mention_id=f"m_{branch_id}_{stage_idx}_1",
                    raw_text=clean_name,
                    norm_text=norm_n,
                    source_span=s_span,
                    transmission_term="عن",
                    transmission_span=(s_span[0], s_span[0]),
                    is_relative=is_rel,
                    relation_type=rel_type,
                    branch_id=branch_id,
                    stage_index=stage_idx,
                    co_narrator_index=0
                )
                stages.append([m])
                stage_idx += 1

        for i, vm in enumerate(v_matches):
            verb = vm.group(1).strip()
            v_start = offset + vm.start(1)
            v_end = offset + vm.end(1)
            verb_span = self.get_orig_slice(v_start, v_end, clean_to_orig, orig_text)

            seg_start = vm.end(1)
            seg_end = v_matches[i + 1].start(1) if i + 1 < len(v_matches) else len(chunk_clean)
            seg_text = chunk_clean[seg_start:seg_end].strip()
            if not seg_text:
                continue

            co_names = self.split_co_narrators(seg_text)
            stage_mentions = []

            for co_idx, co_name in enumerate(co_names):
                norm_n = self.normalize_arabic(co_name)
                if norm_n in ('النبي', 'رسول الله') or 'رسول الله' in norm_n or norm_n in NON_NARRATOR_WORDS or len(norm_n) < 2:
                    continue

                sub_pos = chunk_clean.find(co_name, seg_start)
                if sub_pos != -1:
                    c_s = offset + sub_pos
                    c_e = c_s + len(co_name)
                    s_span = self.get_orig_slice(c_s, c_e, clean_to_orig, orig_text)
                else:
                    c_s = offset + seg_start
                    c_e = offset + seg_end
                    s_span = self.get_orig_slice(c_s, c_e, clean_to_orig, orig_text)

                is_rel = norm_n in RELATIVE_TERMS
                rel_type = RELATIVE_TERMS.get(norm_n)

                m = ExtractedMention(
                    mention_id=f"m_{branch_id}_{stage_idx}_{co_idx+1}",
                    raw_text=co_name,
                    norm_text=norm_n,
                    source_span=s_span,
                    transmission_term=verb,
                    transmission_span=verb_span,
                    is_relative=is_rel,
                    relation_type=rel_type,
                    branch_id=branch_id,
                    stage_index=stage_idx,
                    co_narrator_index=co_idx
                )
                stage_mentions.append(m)

            if stage_mentions:
                stages.append(stage_mentions)
                stage_idx += 1

        return stages

    def _detect_prophetic_endpoint(
        self,
        tail_clean: str,
        offset: int,
        clean_to_orig: List[int],
        orig_text: str,
        parsed: ParsedIsnad
    ):
        p_span = self._detect_prophetic_in_chunk(tail_clean, offset, clean_to_orig, orig_text)
        if p_span:
            parsed.has_prophetic_endpoint = True
            parsed.prophetic_span = p_span
        else:
            parsed.has_prophetic_endpoint = False
            parsed.prophetic_span = None

    def _detect_prophetic_in_chunk(
        self,
        chunk: str,
        offset: int,
        clean_to_orig: List[int],
        orig_text: str
    ) -> Optional[Tuple[int, int]]:
        prophetic_pattern = r'(?:سمعت|سمعنا|قال|يقول|يحدث|روى|عن|ان|انه\s+سمع|انها\s+سمعت)\s+(?:رسول\s+الل[هة]|النبي)'
        m_prophet = re.search(prophetic_pattern, chunk)
        if m_prophet:
            c_s = offset + m_prophet.start()
            c_e = offset + m_prophet.end()
            return self.get_orig_slice(c_s, c_e, clean_to_orig, orig_text)
        return None
