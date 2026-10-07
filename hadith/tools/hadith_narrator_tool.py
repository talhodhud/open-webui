"""
title: Hadith Narrator (Rijal) Biography & Network Tool
author: Hadith Project
author_url: https://github.com/hadith-ksa
version: 2.1.0
description: Comprehensive biographical lookup across 115,735 Hadith narrators, Jarh wa Ta'dil credibility evaluations, death dates, tabaqat, and book-level transmission networks.
"""

import os
import re
import json
import time
import sqlite3
from typing import Dict, Any, List, Optional
from collections import defaultdict
from pydantic import BaseModel, Field

try:
    from tools.hadith_contract_helper import build_response, to_json_str
except ImportError:
    try:
        from hadith_contract_helper import build_response, to_json_str
    except ImportError:
        from datetime import datetime, timezone
        def build_response(status, data=None, evidence=None, coverage=None, warnings=None, dataset_version="2026-10-05-v1", retrieved_at=None):
            return {
                "schema_version": "1",
                "status": status,
                "data": data or {},
                "evidence": evidence or {},
                "coverage": coverage or {},
                "warnings": warnings or [],
                "dataset_version": dataset_version,
                "retrieved_at": retrieved_at or datetime.now(timezone.utc).isoformat()
            }
        def to_json_str(payload, indent=2):
            return json.dumps(payload, ensure_ascii=False, indent=indent)

class Tools:
    class Valves(BaseModel):
        DB_PATH: str = Field(
            default=r"c:\Users\mhdal\OneDrive\AI\Hadith KSA\hadith_rijal.db",
            description="Path to hadith_rijal.db containing narrators, narrators_fts, isnad_nodes, and isnad_links."
        )


    @staticmethod
    def _resolve_path(env_var: str, current_val: str, candidates: list) -> str:
        env_val = os.environ.get(env_var)
        if env_val and os.path.exists(env_val):
            return os.path.abspath(env_val)
        if current_val and os.path.exists(current_val):
            return os.path.abspath(current_val)
        search_roots = [
            os.getcwd(),
            os.path.abspath(os.path.join(os.getcwd(), "..")),
            os.path.abspath(os.path.join(os.getcwd(), "../..")),
            os.path.abspath(os.path.join(os.getcwd(), "hadith")),
            os.path.abspath(os.path.join(os.getcwd(), "open-webui")),
            os.path.abspath(os.path.join(os.getcwd(), "open-webui/hadith")),
            "/app/backend/data",
            "/app/data",
            "/app",
            "/root/open-webui",
            "/root/open-webui/hadith",
            "/root",
        ]
        if "__file__" in globals():
            tool_dir = os.path.dirname(os.path.abspath(__file__))
            search_roots.extend([
                tool_dir,
                os.path.abspath(os.path.join(tool_dir, "..")),
                os.path.abspath(os.path.join(tool_dir, "../..")),
                os.path.abspath(os.path.join(tool_dir, "../../..")),
            ])
        for c in candidates:
            if os.path.isabs(c) and os.path.exists(c):
                return os.path.abspath(c)
            for root in search_roots:
                p = os.path.join(root, c)
                if os.path.exists(p):
                    return os.path.abspath(p)
        return current_val

    def _resolve_all_paths(self):
        self.valves.DB_PATH = self._resolve_path(
            "HADITH_DB_PATH",
            self.valves.DB_PATH,
            [
                "hadith_rijal.db",
                "hadith/hadith_rijal.db",
                "open-webui/hadith_rijal.db",
                "backend/data/hadith_rijal.db",
                "data/hadith_rijal.db"
            ]
        )

    def __init__(self):
        self.valves = self.Valves()
        self._resolve_all_paths()
        self._rijal_loaded = False
        self._narrators_db = {}
        self._token_to_nids = defaultdict(list)
        self._father_map = {}
        self._grandfather_map = {}
        self._kunya_map = {}
        self._book_edges = {}
        self._explicit_pivots = {}
        self._pair_resolver = {}

    BOOK_MAP = {
        # Bukhari
        'bukhari': 'bukhari', 'صحيح البخاري': 'bukhari', 'البخاري': 'bukhari', 'جامع البخاري': 'bukhari', 'صحيح البخارى': 'bukhari', 'بخاري': 'bukhari',
        # Muslim
        'muslim': 'muslim', 'صحيح مسلم': 'muslim', 'مسلم': 'muslim', 'جامع مسلم': 'muslim', 'مسند مسلم': 'muslim',
        # Abu Dawud
        'abudawud': 'abudawud', 'سنن أبي داود': 'abudawud', 'أبو داود': 'abudawud', 'سنن ابي داود': 'abudawud', 'ابو داود': 'abudawud', 'ابي داود': 'abudawud', 'مسند أبي داود': 'abudawud', 'مسند ابو داود': 'abudawud', 'مسند أبو داود': 'abudawud',
        # Tirmidhi
        'tirmidhi': 'tirmidhi', 'سنن الترمذي': 'tirmidhi', 'الترمذي': 'tirmidhi', 'جامع الترمذي': 'tirmidhi', 'ترمذي': 'tirmidhi', 'صحيح الترمذي': 'tirmidhi',
        # Nasai
        'nasai': 'nasai', 'سنن النسائي': 'nasai', 'النسائي': 'nasai', 'نسائي': 'nasai', 'المجتبى': 'nasai', 'السنن الصغرى': 'nasai', 'سنن النسائي الصغرى': 'nasai',
        # Ibn Majah
        'ibnmajah': 'ibnmajah', 'سنن ابن ماجه': 'ibnmajah', 'ابن ماجه': 'ibnmajah', 'ابن ماجة': 'ibnmajah', 'سنن ابن ماجة': 'ibnmajah',
        # Ahmad
        'ahmed': 'ahmed', 'مسند أحمد': 'ahmed', 'أحمد': 'ahmed', 'مسند احمد': 'ahmed', 'احمد': 'ahmed', 'مسند الإمام أحمد': 'ahmed', 'مسند الامام احمد': 'ahmed',
        # Malik
        'malik': 'malik', 'موطأ مالك': 'malik', 'مالك': 'malik', 'الموطأ': 'malik', 'الموطا': 'malik', 'موطأ الإمام مالك': 'malik', 'موطأ الامام مالك': 'malik',
        # Darimi
        'darimi': 'darimi', 'سنن الدارمي': 'darimi', 'الدارمي': 'darimi', 'دارمي': 'darimi', 'مسند الدارمي': 'darimi',
        # Ibn Abi Shaybah
        'musannaf_ibnabi_shaybah': 'musannaf_ibnabi_shaybah', 'مصنف ابن أبي شيبة': 'musannaf_ibnabi_shaybah', 'مصنف ابن ابي شيبة': 'musannaf_ibnabi_shaybah', 'ابن أبي شيبة': 'musannaf_ibnabi_shaybah', 'ابن ابي شيبة': 'musannaf_ibnabi_shaybah',
        # Al-Adab al-Mufrad
        'aladab_almufrad': 'aladab_almufrad', 'الأدب المفرد': 'aladab_almufrad', 'ادب المفرد': 'aladab_almufrad', 'الادب المفرد': 'aladab_almufrad', 'الأدب المفرد للبخاري': 'aladab_almufrad',
        # Shamail
        'shamail_muhammadiyah': 'shamail_muhammadiyah', 'الشمائل المحمدية': 'shamail_muhammadiyah', 'الشمائل': 'shamail_muhammadiyah', 'شمائل الترمذي': 'shamail_muhammadiyah',
        # Bulugh al-Maram
        'bulugh_almaram': 'bulugh_almaram', 'بلوغ المرام': 'bulugh_almaram', 'بلوغ المرام من أدلة الأحكام': 'bulugh_almaram',
        # Riyad al-Salihin
        'riyad_assalihin': 'riyad_assalihin', 'رياض الصالحين': 'riyad_assalihin', 'رياض الصالحين للنووي': 'riyad_assalihin',
        # Mishkat
        'mishkat_almasabih': 'mishkat_almasabih', 'مشكاة المصابيح': 'mishkat_almasabih',
        # Arba'un Nawawiyyah
        'nawawi40': 'nawawi40', 'الأربعون النووية': 'nawawi40', 'الاربعون النووية': 'nawawi40', 'أربعين النووية': 'nawawi40',
        # Qudsi 40
        'qudsi40': 'qudsi40', 'الأحاديث القدسية': 'qudsi40', 'الاحاديث القدسية': 'qudsi40', 'أربعون قدسية': 'qudsi40',
        # Shah Waliullah
        'shahwaliullah40': 'shahwaliullah40', 'أربعين شاه ولي الله': 'shahwaliullah40',
        # All
        'all': 'all', 'الكل': 'all', 'جميع الكتب': 'all', 'كافة الكتب': 'all', 'كتب السنة': 'all', 'الكتب التسعة': 'all'
    }

    def _canonicalize_book(self, book_str: str) -> str:
        if not book_str:
            return 'bukhari'
        b_raw = book_str.lower().strip()
        b_norm = self._normalize_arabic(b_raw)
        for k, v in self.BOOK_MAP.items():
            if self._normalize_arabic(k) == b_norm or k == b_raw:
                return v
        return b_raw


    def _normalize_arabic(self, text: str) -> str:
        if not text:
            return ""
        t = re.sub(r'[\u064B-\u065F\u0670\u0610-\u061A\u06D6-\u06ED\u0640]', '', text)
        t = re.sub(r'[إأآٱ]', 'ا', t)
        t = re.sub(r'ة', 'ه', t)
        t = re.sub(r'ى', 'ي', t)
        # Unify kunya declensions (أبو / أبي / أبا) into canonical 'ابو '
        t = re.sub(r'\b(?:ابي|ابا|ابو)\s+', 'ابو ', t)
        # Unify patronymic (ابن / بن) into canonical 'بن '
        t = re.sub(r'\b(?:ابن|بن)\s+', 'بن ', t)
        return re.sub(r'\s+', ' ', t).strip()

    def _ensure_rijal_index(self):
        self._resolve_all_paths()
        if self._rijal_loaded and os.path.exists(self.valves.DB_PATH):
            return
        if not os.path.exists(self.valves.DB_PATH):
            return

        conn = sqlite3.connect(self.valves.DB_PATH)
        cur = conn.cursor()

        # Load relational maps
        try:
            for r in cur.execute("SELECT narrator_norm, relative_name_norm FROM isnad_relative_map WHERE relation_type='father'").fetchall():
                self._father_map[r[0]] = r[1]
            for r in cur.execute("SELECT narrator_norm, relative_name_norm FROM isnad_relative_map WHERE relation_type='grandfather'").fetchall():
                self._grandfather_map[r[0]] = r[1]
            for r in cur.execute("SELECT kunya_norm, real_name_norm FROM isnad_kunya_map").fetchall():
                self._kunya_map[r[0]] = r[1]
        except Exception:
            pass

        # Load canonical Rijal profiles
        cur.execute("""
            SELECT a.id, a.name, a.death_year, a.ibnhajar_rank, a.zahabi_rank, a.living_city, n.namings, n.teachers, n.students
            FROM arsanad_narrators a
            JOIN narrators n ON a.id = n.id
        """)
        for r in cur.fetchall():
            nid, name, death, ibnhajar, zahabi, city, namings_raw, teachers_raw, students_raw = r
            clean_death = death if death and death != '-' else 'غير معروف بدقة'
            clean_grade = ibnhajar if ibnhajar and ibnhajar != '-' else (zahabi if zahabi and zahabi != '-' else 'غير محدد في المصدر')
            clean_city = city if city and city != '-' else 'غير محدد'
            
            teachers = set(json.loads(teachers_raw)) if teachers_raw else set()
            students = set(json.loads(students_raw)) if students_raw else set()
            
            namings = []
            if namings_raw:
                try: namings = json.loads(namings_raw)
                except Exception: pass
            
            clean_namings = [self._normalize_arabic(x) for x in namings if len(x) >= 2]
            
            self._narrators_db[nid] = {
                'id': nid,
                'name': name,
                'death': clean_death,
                'grade': clean_grade,
                'city': clean_city,
                'teachers': teachers,
                'students': students,
                'namings': clean_namings
            }
            
            STOP_WORDS = {
                'الله', 'رسول', 'النبي', 'ابيه', 'ابي', 'ابوه', 'ابوها', 'اباه', 'ابانا', 'ابيك', 'ابوك', 'اباك',
                'جده', 'جدي', 'جدهم', 'جدها', 'جدك',
                'عمه', 'عمي', 'عمهم', 'عمها', 'عمتي', 'عمته',
                'خاله', 'خالي', 'خالهم', 'خالها', 'خالتي', 'خالته',
                'امي', 'امه', 'امها', 'امهم', 'امك',
                'اخي', 'اخيه', 'اخوه', 'اخوها', 'اخاك', 'اخيك',
                'ابني', 'ابنه', 'ابنها', 'ابنهم', 'بنت', 'ابن', 'اخ',
                'رجل', 'امراه', 'شيخ', 'صاحب', 'صاحبه', 'صاحبي', 'قوم',
                'فلان', 'كذا', 'نحو', 'مثله', 'غيره', 'كل', 'جميع', 'بعض', 'واحد', 'احد', 'اخر', 'اخرين',
                'سمعت', 'حدثني', 'اخبرني', 'انباني', 'قال', 'قالت', 'ان', 'انه', 'انها',
                'حديث', 'الحديث', 'هذا', 'ذلك', 'كبر', 'صغر', 'يخبر'
            }
            all_toks = set([self._normalize_arabic(name)] + clean_namings)
            for tok in all_toks:
                if tok not in STOP_WORDS and len(tok) >= 3:
                    self._token_to_nids[tok].append(nid)

        conn.close()

        # Build canonical verified pivots for all major Sahaba and Tabi'in across all books
        self._explicit_pivots = {
            # الصحابة الكبار رضي الله عنهم
            self._normalize_arabic('أبو هريرة'): 106,
            self._normalize_arabic('أبي هريرة'): 106,
            self._normalize_arabic('أبا هريرة'): 106,
            self._normalize_arabic('عائشة'): 342,
            self._normalize_arabic('عائشة أم المؤمنين'): 342,
            self._normalize_arabic('عائشة بنت أبي بكر'): 342,
            self._normalize_arabic('عبد الله بن عمر'): 120,
            self._normalize_arabic('ابن عمر'): 120,
            self._normalize_arabic('عبد الله بن عباس'): 48,
            self._normalize_arabic('ابن عباس'): 48,
            self._normalize_arabic('أنس بن مالك'): 8,
            self._normalize_arabic('أنس'): 8,
            self._normalize_arabic('جابر بن عبد الله'): 195,
            self._normalize_arabic('جابر'): 195,
            self._normalize_arabic('علي بن أبي طالب'): 187,
            self._normalize_arabic('علي'): 187,
            self._normalize_arabic('عبد الله بن عمرو'): 368,
            self._normalize_arabic('عبد الله بن عمرو بن العاص'): 368,
            self._normalize_arabic('عبد الله بن مسعود'): 21,
            self._normalize_arabic('ابن مسعود'): 21,
            self._normalize_arabic('أبو سعيد الخدري'): 25,
            self._normalize_arabic('أبي سعيد الخدري'): 25,
            self._normalize_arabic('أبو موسى الأشعري'): 26,
            self._normalize_arabic('أبي موسى الأشعري'): 26,
            self._normalize_arabic('معاوية بن حيدة'): 8931,
            self._normalize_arabic('عمر بن الخطاب'): 17,
            self._normalize_arabic('أبو بكر الصديق'): 13,
            self._normalize_arabic('عثمان بن عفان'): 18,
            self._normalize_arabic('سعد بن أبي وقاص'): 22,
            self._normalize_arabic('أم سلمة'): 354,
            self._normalize_arabic('حفصة'): 355,
            self._normalize_arabic('ميمونة'): 357,
            self._normalize_arabic('أسماء بنت أبي بكر'): 346,

            # كبار التابعين وأئمة الرواية
            self._normalize_arabic('عروة بن الزبير'): 874,
            self._normalize_arabic('عروة'): 874,
            self._normalize_arabic('القاسم بن محمد'): 1167,
            self._normalize_arabic('القاسم بن محمد بن أبي بكر'): 1167,
            self._normalize_arabic('مسروق'): 2605,
            self._normalize_arabic('مسروق بن الأجدع'): 2605,
            self._normalize_arabic('الأسود'): 1136,
            self._normalize_arabic('الأسود بن يزيد'): 1136,
            self._normalize_arabic('عمرة بنت عبد الرحمن'): 1122,
            self._normalize_arabic('عمرة'): 1122,
            self._normalize_arabic('ابن أبي مليكة'): 2073,
            self._normalize_arabic('عبيد بن عمير'): 661,
            self._normalize_arabic('عبد الرحمن بن الأسود'): 3071,
            self._normalize_arabic('صفية بنت شيبة'): 5050,
            self._normalize_arabic('عبد الرحمن بن عابس'): 10366,
            self._normalize_arabic('الأعرج'): 566,
            self._normalize_arabic('عبد الرحمن بن هرمز'): 566,
            self._normalize_arabic('عبد الرحمن بن هرمز الأعرج'): 566,
            self._normalize_arabic('أبو صالح'): 490,
            self._normalize_arabic('أبي صالح'): 490,
            self._normalize_arabic('أبا صالح'): 490,
            self._normalize_arabic('أبو صالح السمان'): 490,
            self._normalize_arabic('ذكوان'): 490,
            self._normalize_arabic('أبو سلمة'): 303,
            self._normalize_arabic('أبي سلمة'): 303,
            self._normalize_arabic('أبا سلمة'): 303,
            self._normalize_arabic('أبو سلمة بن عبد الرحمن'): 303,
            self._normalize_arabic('سعيد بن المسيب'): 42,
            self._normalize_arabic('ابن المسيب'): 42,
            self._normalize_arabic('المقبري'): 288,
            self._normalize_arabic('سعيد المقبري'): 288,
            self._normalize_arabic('سعيدا المقبري'): 288,
            self._normalize_arabic('سعيد بن أبي سعيد'): 288,
            self._normalize_arabic('سعيد بن أبي سعيد المقبري'): 288,
            self._normalize_arabic('أبو سعيد المقبري'): 1753,
            self._normalize_arabic('كيسان أبو سعيد المقبري'): 1753,
            self._normalize_arabic('ابن سيرين'): 690,
            self._normalize_arabic('محمد بن سيرين'): 690,
            self._normalize_arabic('همام'): 14419,
            self._normalize_arabic('همام بن منبه'): 14419,
            self._normalize_arabic('طاووس'): 799,
            self._normalize_arabic('طاوس'): 799,
            self._normalize_arabic('طاووس بن كيسان'): 799,
            self._normalize_arabic('عطاء بن يسار'): 736,
            self._normalize_arabic('محمد بن زياد'): 416,
            self._normalize_arabic('محمد بن زياد الجمحي'): 416,
            self._normalize_arabic('أبو زرعة'): 3472,
            self._normalize_arabic('أبي زرعة'): 3472,
            self._normalize_arabic('أبو زرعة بن عمرو بن جرير'): 3472,
            self._normalize_arabic('سلمة بن دينار'): 1989,
            self._normalize_arabic('أبو حازم الأعرج'): 1989,
            self._normalize_arabic('أبو حازم الأشجعي'): 4977,
            self._normalize_arabic('سلمان أبو حازم الأشجعي'): 4977,
            self._normalize_arabic('أبو رافع'): 2022,
            self._normalize_arabic('نفيع بن رافع أبو رافع الصائغ'): 2022,
            self._normalize_arabic('سعيد بن يسار'): 4226,
            self._normalize_arabic('سعيد بن يسار أبو الحباب'): 4226,
            self._normalize_arabic('أبو الحباب'): 4226,
            self._normalize_arabic('حميد بن عبد الرحمن بن عوف'): 1171,
            self._normalize_arabic('حميد بن عبد الرحمن'): 1171,
            self._normalize_arabic('حفص بن عاصم'): 3094,
            self._normalize_arabic('حفص بن عاصم بن عمر بن الخطاب'): 3094,
            self._normalize_arabic('زرارة بن أوفى'): 4550,
            self._normalize_arabic('عبيد الله بن عبد الله بن عتبة'): 573,
            self._normalize_arabic('عراك بن مالك'): 302,
            self._normalize_arabic('نعيم بن عبد الله المجمر'): 1385,
            self._normalize_arabic('عيسى بن طلحة'): 1274,
            self._normalize_arabic('بشير بن نهيك'): 4333,
            self._normalize_arabic('أبو عبد الله الأغر'): 7878,
            self._normalize_arabic('الأغر'): 7878,
            self._normalize_arabic('أبو الغيث'): 528,
            self._normalize_arabic('سالم أبو الغيث'): 528,
            self._normalize_arabic('عطاء بن يزيد الليثي'): 3487,
            self._normalize_arabic('مالك بن أبي عامر'): 3911,
            self._normalize_arabic('خبيب بن عبد الرحمن'): 11890,
            self._normalize_arabic('شريك بن أبي نمر'): 1798,
            self._normalize_arabic('عبيد بن حنين'): 6012,
            self._normalize_arabic('نافع بن جبير بن مطعم'): 160,
            self._normalize_arabic('أبو بكر بن عبد الرحمن'): 2662,
            self._normalize_arabic('هلال بن علي'): 3486,
            self._normalize_arabic('عبد الرحمن بن أبي عمرة'): 8843,
            self._normalize_arabic('سعيد ابن مرجانة'): 5334,
            self._normalize_arabic('عبيد الله بن أبي رافع'): 788,
            self._normalize_arabic('سعيد بن عمرو بن سعيد'): 240,
            self._normalize_arabic('خلاس بن عمرو'): 1530,
            self._normalize_arabic('أبو سفيان'): 4310,
            self._normalize_arabic('نافع مولى ابن عمر'): 290,
            self._normalize_arabic('سالم بن عبد الله بن عمر'): 186,
            self._normalize_arabic('سالم بن عبد الله'): 186,
            self._normalize_arabic('عبد الله بن دينار'): 308,
            self._normalize_arabic('حمزة بن عبد الله بن عمر'): 185,
            self._normalize_arabic('قتادة بن دعامة'): 352,
            self._normalize_arabic('قتادة'): 352,
            self._normalize_arabic('ثابت البناني'): 497,
            self._normalize_arabic('ثابت'): 497,
            self._normalize_arabic('حميد الطويل'): 498,
            self._normalize_arabic('الزهري'): 291,
            self._normalize_arabic('ابن شهاب'): 291,
            self._normalize_arabic('ابن شهاب الزهري'): 291,
            self._normalize_arabic('محمد بن مسلم بن شهاب الزهري'): 291,
            self._normalize_arabic('عمرو بن دينار'): 306,
            self._normalize_arabic('سعيد بن جبير'): 536,
            self._normalize_arabic('مجاهد بن جبر'): 888,
            self._normalize_arabic('مجاهد'): 888,
            self._normalize_arabic('عطاء بن أبي رباح'): 1990,
            self._normalize_arabic('عكرمة'): 606,
            self._normalize_arabic('عكرمة مولى ابن عباس'): 606,
            self._normalize_arabic('الشعبي'): 1074,
            self._normalize_arabic('عامر بن شراحيل الشعبي'): 1074,
            self._normalize_arabic('الحسن البصري'): 277,
            self._normalize_arabic('سليمان بن يسار'): 749,
            self._normalize_arabic('شعيب بن محمد'): 5980,
            self._normalize_arabic('حكيم بن معاوية'): 3001,
            self._normalize_arabic('بهز بن حكيم'): 3000,
            self._normalize_arabic('عمرو بن شعيب'): 93,
            self._normalize_arabic('سفيان الثوري'): 293,
            self._normalize_arabic('سفيان بن عيينة'): 420,
            self._normalize_arabic('شعبة بن الحجاج'): 357,
            self._normalize_arabic('شعبة'): 357,
            self._normalize_arabic('مالك بن أنس'): 3,
            self._normalize_arabic('الإمام مالك'): 3,
            self._normalize_arabic('الأوزاعي'): 343,
            self._normalize_arabic('يحيى بن سعيد القطان'): 412,
            self._normalize_arabic('عبد الرحمن بن مهدي'): 411,
            self._normalize_arabic('أحمد بن حنبل'): 1,
            self._normalize_arabic('الإمام أحمد'): 1,
            self._normalize_arabic('البخاري'): 5,
            self._normalize_arabic('مسلم بن الحجاج'): 6,
            self._normalize_arabic('أبو داود'): 7,
            self._normalize_arabic('الترمذي'): 8,
            self._normalize_arabic('النسائي'): 9,
            self._normalize_arabic('ابن ماجه'): 10,

            self._normalize_arabic('طلحة بن نافع'): 4310,
            self._normalize_arabic('أبو عثمان النهدي'): 5623,
            self._normalize_arabic('أبو عبيد'): 7350,
            self._normalize_arabic('سعد بن عبيد'): 7350,
            self._normalize_arabic('موسى بن يسار'): 4265,
            self._normalize_arabic('الوليد بن رباح'): 3439,
            self._normalize_arabic('عمر بن الحكم'): 729,
            self._normalize_arabic('أبو سهيل'): 9287,
            self._normalize_arabic('نافع بن مالك'): 9287,
            self._normalize_arabic('نافع بن مالك بن أبي عامر'): 9287,
            self._normalize_arabic('عمرو بن أبي سفيان'): 3879,
            self._normalize_arabic('سعيد بن ميناء'): 4347,
            self._normalize_arabic('عنبسة بن سعيد'): 10317,
            self._normalize_arabic('قبيصة بن ذؤيب'): 1581,
            self._normalize_arabic('وهب بن منبه'): 3357,
            self._normalize_arabic('بسر بن سعيد'): 1198,
            self._normalize_arabic('أبو إدريس الخولاني'): 657,
            self._normalize_arabic('عائذ الله بن عبد الله'): 657,
            self._normalize_arabic('سعيد بن عمرو بن سعيد'): 240,
            self._normalize_arabic('سعيد بن عمرو بن سعيد بن العاص'): 240,
            self._normalize_arabic('سليمان بن يسار'): 749,
            self._normalize_arabic('ابن أبي نعم'): 6480,
            self._normalize_arabic('عبد الرحمن بن أبي نعم'): 6480,
            self._normalize_arabic('عبد الرحمن بن عبد الله بن كعب'): 2807,
            self._normalize_arabic('الزهري'): 569,
            self._normalize_arabic('ابن شهاب'): 569,
            self._normalize_arabic('محمد بن مسلم بن شهاب الزهري'): 569,
            self._normalize_arabic('قتادة'): 369,
            self._normalize_arabic('قتادة بن دعامة'): 369,
            self._normalize_arabic('الأعمش'): 467,
            self._normalize_arabic('سليمان بن مهران الأعمش'): 467,
            self._normalize_arabic('مالك'): 664,
            self._normalize_arabic('مالك بن أنس'): 664,
            self._normalize_arabic('سفيان الثوري'): 434,
            self._normalize_arabic('الثوري'): 434,
            self._normalize_arabic('سفيان بن عيينة'): 192,
            self._normalize_arabic('ابن عيينة'): 192,
            self._normalize_arabic('شعبة'): 905,
            self._normalize_arabic('شعبة بن الحجاج'): 905,
            self._normalize_arabic('يحيى بن سعيد الأنصاري'): 199,
            self._normalize_arabic('نافع'): 713,
            self._normalize_arabic('نافع مولى ابن عمر'): 713,
            self._normalize_arabic('عروة بن الزبير'): 874,
            self._normalize_arabic('عائشة'): 342,
            self._normalize_arabic('أم المؤمنين عائشة'): 342,
            self._normalize_arabic('عمر بن الخطاب'): 165,
            self._normalize_arabic('عبد الله بن عمر'): 120,
            self._normalize_arabic('ابن عمر'): 120,
            self._normalize_arabic('أنس بن مالك'): 8,
            self._normalize_arabic('أنس'): 8,
            self._normalize_arabic('ابن عباس'): 48,
            self._normalize_arabic('عبد الله بن عباس'): 48,
            self._normalize_arabic('مجاهد'): 888,
            self._normalize_arabic('عكرمة'): 606,
            self._normalize_arabic('سعيد بن جبير'): 536,
            self._normalize_arabic('عطاء بن أبي رباح'): 1990,
            self._normalize_arabic('الشعبي'): 1074,
            self._normalize_arabic('عامر الشعبي'): 1074,
            self._normalize_arabic('حميد الطويل'): 1393,
            self._normalize_arabic('ثابت البناني'): 391,
            self._normalize_arabic('معمر بن راشد'): 40,
            self._normalize_arabic('يونس بن يزيد'): 4772,
            self._normalize_arabic('شعيب بن أبي حمزة'): 3056,
            self._normalize_arabic('عقيل بن خالد'): 901,
            self._normalize_arabic('سالم بن عبد الله'): 247,
            self._normalize_arabic('هشام بن عروة'): 173,
            self._normalize_arabic('هشام الدستوائي'): 67,
            self._normalize_arabic('سعيد بن أبي عروبة'): 365,
            self._normalize_arabic('همام بن يحيى'): 510,
            self._normalize_arabic('أبان بن يزيد'): 172,
            self._normalize_arabic('الحسن'): 209,
            self._normalize_arabic('الحسن البصري'): 209,
            self._normalize_arabic('قيس بن أبي حازم'): 1815,
        }

        self._pair_resolver = {
            (self._normalize_arabic('محمد'), 106): (690, 'محمد بن سيرين'),
            (self._normalize_arabic('سعيد'), 106): (42, 'سعيد بن المسيب'),
            (self._normalize_arabic('أبو حازم'), 106): (4977, 'سلمان أبو حازم الأشجعي'),
            (self._normalize_arabic('أبي حازم'), 106): (4977, 'سلمان أبو حازم الأشجعي'),
            (self._normalize_arabic('عبد الرحمن'), 106): (566, 'عبد الرحمن بن هرمز الأعرج'),
            (self._normalize_arabic('حميد'), 106): (1171, 'حميد بن عبد الرحمن بن عوف'),
            (self._normalize_arabic('عبيد الله'), 106): (573, 'عبيد الله بن عبد الله بن عتبة بن مسعود'),
            (self._normalize_arabic('قيس'), 106): (1815, 'قيس بن أبي حازم'),
            (self._normalize_arabic('الحسن'), 106): (209, 'الحسن بن أبي الحسن البصري'),
            (self._normalize_arabic('حميد'), 8): (1393, 'حميد الطويل'),
            (self._normalize_arabic('ثابت'), 8): (391, 'ثابت البناني'),
            (self._normalize_arabic('قتادة'), 8): (369, 'قتادة بن دعامة السدوسي'),
            (self._normalize_arabic('نافع'), 120): (713, 'نافع مولى ابن عمر'),
            (self._normalize_arabic('سالم'), 120): (247, 'سالم بن عبد الله بن عمر'),
            (self._normalize_arabic('عروة'), 342): (874, 'عروة بن الزبير'),
            (self._normalize_arabic('القاسم'), 342): (12, 'القاسم بن محمد بن أبي بكر'),
            (self._normalize_arabic('مجاهد'), 48): (888, 'مجاهد بن جبر'),
            (self._normalize_arabic('عكرمة'), 48): (606, 'عكرمة مولى ابن عباس'),
            (self._normalize_arabic('عطاء'), 48): (1990, 'عطاء بن أبي رباح'),
            (self._normalize_arabic('طاووس'), 48): (799, 'طاووس بن كيسان'),
            (self._normalize_arabic('معمر'), 569): (40, 'معمر بن راشد'),
            (self._normalize_arabic('يونس'), 569): (4772, 'يونس بن يزيد الأيلي'),
            (self._normalize_arabic('مالك'), 569): (664, 'مالك بن أنس'),
            (self._normalize_arabic('شعيب'), 569): (3056, 'شعيب بن أبي حمزة'),
            (self._normalize_arabic('سفيان'), 569): (192, 'سفيان بن عيينة'),
            (self._normalize_arabic('عقيل'), 569): (901, 'عقيل بن خالد الأيلي'),
            (self._normalize_arabic('شعبة'), 369): (905, 'شعبة بن الحجاج'),
            (self._normalize_arabic('سعيد'), 369): (365, 'سعيد بن أبي عروبة'),
            (self._normalize_arabic('هشام'), 369): (67, 'هشام بن أبي عبد الله الدستوائي'),
            (self._normalize_arabic('همام'), 369): (510, 'همام بن يحيى'),
            (self._normalize_arabic('أبان'), 369): (172, 'أبان بن يزيد العطار'),
        }

        self._rijal_loaded = True

    def _extract_chain(self, text: str) -> List[str]:
        clean = self._normalize_arabic(text)
        segments = re.split(
            r'\b(?:حدثنا|حدثني|حدثه|حدثهم|اخبرنا|اخبرني|اخبره|اخبرهم|انبانا|انباني|سمعت|سمعنا|سمع|عن)\s+',
            clean
        )
        chain = []
        segs = segments[1:]
        for idx, seg in enumerate(segs):
            name_part = re.split(r'[،,\n]|(?:\s+(?:قال|ان|انه)\s)', seg)[0]
            s = self._normalize_arabic(name_part)
            s = re.sub(r'\s*رض[يى]\s*الله\s*عنه[ما]*\s*', '', s)
            s = re.sub(r'[ـ\s]*عليه\s*السلام[ـ\s]*', '', s)
            s = re.sub(r'[ـ\s]*صلي\s*الله\s*عليه[ـ\s]*.*', '', s)
            s = re.sub(r'^\s*(?:ان|انه|انها|قالت|وهو|وهي)\s+', '', s)
            s = re.sub(r'^\s*و(?=[^\s])', '', s)
            s = re.sub(r'\s*قال\s*:?\s*"?\s*$', '', s)
            name_part = re.sub(r'\s+', ' ', s).strip()

            if name_part in ('ابي', 'ابو', 'ابا', 'ابن') and idx + 1 < len(segs):
                next_seg = re.split(r'[،,\n]|(?:\s+(?:قال|ان|انه)\s)', segs[idx + 1])[0]
                n_clean = self._normalize_arabic(next_seg).strip()
                if n_clean and len(n_clean) >= 2 and n_clean not in ('الله', 'رسول', 'النبي'):
                    name_part = name_part + ' ' + n_clean
                    segs[idx + 1] = ''

            if len(name_part) >= 3 and not re.search(r'\d', name_part) and name_part not in ('الله', 'رسول', 'النبي', 'ذلك', 'هذا', 'كان'):
                if name_part in ('ابيه', 'ابي') and chain:
                    prev = chain[-1]
                    if prev in self._father_map:
                        name_part = self._father_map[prev]
                    else: continue
                elif name_part.startswith('جده') and chain:
                    prev = chain[-1]
                    if prev in self._grandfather_map:
                        name_part = self._grandfather_map[prev]
                    else: continue
                chain.append(name_part)
            if len(chain) >= 10:
                break
        return chain

    def _get_book_edges(self, book_name: str) -> Dict[tuple, int]:
        self._resolve_all_paths()
        b_clean = book_name.lower().strip()
        if b_clean in self._book_edges:
            return self._book_edges[b_clean]

        conn = sqlite3.connect(self.valves.DB_PATH)
        cur = conn.cursor()
        cur.execute("SELECT hadith_id, arabic_text FROM hadiths WHERE LOWER(book) = ?", (b_clean,))
        hadiths = cur.fetchall()
        conn.close()

        edges = defaultdict(int)
        for hid, text in hadiths:
            ch = self._extract_chain(text)
            for i in range(len(ch) - 1):
                student = ch[i]
                teacher = ch[i+1]
                edges[(student, teacher)] += 1

        self._book_edges[b_clean] = edges
        return edges

    def resolve_focus_narrator(self, query: str) -> Optional[Dict[str, Any]]:
        self._ensure_rijal_index()
        q_norm = self._normalize_arabic(query)

        if q_norm in self._explicit_pivots and self._explicit_pivots[q_norm] in self._narrators_db:
            return self._narrators_db[self._explicit_pivots[q_norm]]

        candidate_nids = self._token_to_nids.get(q_norm, [])
        if not candidate_nids:
            for nid, info in self._narrators_db.items():
                if q_norm in info['namings'] or q_norm in self._normalize_arabic(info['name']):
                    candidate_nids.append(nid)

        if not candidate_nids:
            return None

        def prominence(nid):
            info = self._narrators_db[nid]
            return len(info['students']) + len(info['teachers'])

        best_nid = max(candidate_nids, key=prominence)
        return self._narrators_db[best_nid]

    def search_narrator(self, query: str, limit: int = 5) -> str:
        """
        Search the 115,735 Rijal database using full-text search (FTS5) or normalized Arabic matching.
        
        :param query: Name, kunya, or title of the narrator (e.g. 'سفيان الثوري', 'الزهري', 'شعبة').
        :param limit: Maximum results to return (default: 5).
        :return: JSON formatted list of matching narrators with ID, full name, grade, death year, and city.
        """
        if not os.path.exists(self.valves.DB_PATH):
            return to_json_str(build_response(
                status="unavailable",
                warnings=["Database not found."]
            ))

        q_clean = query.strip()
        q_norm = self._normalize_arabic(q_clean)
        if not q_norm:
            return to_json_str(build_response(
                status="invalid_argument",
                warnings=["Query cannot be empty."]
            ))

        try:
            conn = sqlite3.connect(self.valves.DB_PATH)
            cur = conn.cursor()

            fts_query = " ".join([f'"{w}"*' for w in q_norm.split() if len(w) >= 2])
            rows = []
            if fts_query:
                try:
                    cur.execute("""
                        SELECT n.id, n.full_name, n.grade_ar, n.grade_en, n.death, n.city, n.tabaqat
                        FROM narrators_fts f
                        JOIN narrators n ON f.id = n.id
                        WHERE narrators_fts MATCH ?
                        ORDER BY f.rank
                        LIMIT ?
                    """, (fts_query, limit))
                    rows = cur.fetchall()
                except Exception:
                    rows = []

            if not rows:
                cur.execute("""
                    SELECT id, full_name, grade_ar, grade_en, death, city, tabaqat
                    FROM narrators
                    WHERE full_name_norm LIKE ? OR full_name_norm LIKE ?
                    LIMIT ?
                """, (f"%{q_norm}%", f"%{q_clean}%", limit))
                rows = cur.fetchall()

            conn.close()

            results = []
            for r in rows:
                results.append({
                    "id": r[0],
                    "name": r[1],
                    "grade_ar": r[2] or "غير محدد",
                    "grade_en": r[3] or "unspecified",
                    "death": r[4] or "غير معروف",
                    "city": r[5] or "غير محدد",
                    "tabaqat": r[6] or "غير محدد"
                })

            status = "ok" if results else "no_match"
            return to_json_str(build_response(
                status=status,
                data={
                    "query": query,
                    "matches_count": len(results),
                    "narrators": results
                },
                coverage={"total_searched": 115735, "returned": len(results)},
                evidence={"source_name": "Itqan Rijal Database", "locator": f"query:{query}"}
            ))

        except Exception as e:
            return to_json_str(build_response(
                status="unavailable",
                warnings=[f"Narrator search failed: {str(e)}"]
            ))

    def get_narrator_biography(self, narrator_id: int) -> str:
        """
        Fetch complete biographical profile of a narrator by their database ID.
        
        :param narrator_id: Integer ID of the narrator from search_narrator.
        :return: JSON formatted detailed biography including classical sources, teachers, and students.
        """
        if not os.path.exists(self.valves.DB_PATH):
            return to_json_str(build_response(
                status="unavailable",
                warnings=["Database not found."]
            ))

        try:
            conn = sqlite3.connect(self.valves.DB_PATH)
            cur = conn.cursor()

            cur.execute("""
                SELECT id, full_name, kunya, grade_ar, grade_en, death, city, tabaqat,
                       laqab, nasab, classical_sources, teachers, students, namings
                FROM narrators
                WHERE id = ?
                LIMIT 1
            """, (narrator_id,))
            row = cur.fetchone()
            if not row:
                conn.close()
                return to_json_str(build_response(
                    status="no_match",
                    warnings=[f"Narrator ID {narrator_id} not found."]
                ))

            def parse_list(val):
                if not val: return []
                try:
                    parsed = json.loads(val)
                    return parsed if isinstance(parsed, list) else [val]
                except Exception:
                    return [s.strip() for s in val.split(";") if s.strip()]

            raw_teachers = parse_list(row[11])
            raw_students = parse_list(row[12])

            def resolve_participants(raw_list, max_resolve=8):
                resolved = []
                int_ids = []
                for x in raw_list:
                    try:
                        int_ids.append(int(x))
                    except (ValueError, TypeError):
                        resolved.append(str(x))
                if int_ids:
                    sample = int_ids[:max_resolve]
                    placeholders = ",".join("?" for _ in sample)
                    cur.execute(f"SELECT id, full_name, grade_ar FROM narrators WHERE id IN ({placeholders})", sample)
                    id_map = {r[0]: {"id": r[0], "name": r[1], "grade": r[2] or "غير محدد"} for r in cur.fetchall()}
                    for nid in sample:
                        if nid in id_map:
                            resolved.append(id_map[nid])
                        else:
                            resolved.append({"id": nid, "name": f"راوٍ برقم {nid}", "grade": "غير محدد"})
                return resolved

            teachers_sample = resolve_participants(raw_teachers, 8)
            students_sample = resolve_participants(raw_students, 8)

            cur.execute("""
                SELECT ibnhajar_rank, zahabi_rank, tabaqa, living_city, death_year, birth_year, mazhab, journey_city, selat_karaba
                FROM arsanad_narrators WHERE id = ?
            """, (narrator_id,))
            ar_row = cur.fetchone()

            ibnhajar_rank = ar_row[0] if ar_row and ar_row[0] not in ('-', None, '') else "غير متاح في تقريب التهذيب"
            zahabi_rank = ar_row[1] if ar_row and ar_row[1] not in ('-', None, '') else "غير متاح في الكاشف"
            clean_tabaqa = ar_row[2] if ar_row and ar_row[2] not in ('-', None, '') else (row[7] or "غير محدد")
            clean_city = ar_row[3] if ar_row and ar_row[3] not in ('-', None, '') else (row[6] or "غير محدد")
            clean_death = row[5] or "غير معروف"
            if clean_death in ["غير معروف", "-", ""] and ar_row and ar_row[4] not in ('-', None, ''):
                clean_death = ar_row[4]

            clean_grade = row[3] or "غير متاح في قاعدة البيانات"
            if any(h in clean_grade for h in ['Albani', 'استنباط', 'unknown']) or clean_grade in ['', 'غير محدد', 'غير متاح في قاعدة البيانات']:
                if ibnhajar_rank != "غير متاح في تقريب التهذيب":
                    clean_grade = ibnhajar_rank
                elif zahabi_rank != "غير متاح في الكاشف":
                    clean_grade = zahabi_rank
                else:
                    clean_grade = "غير متاح في قاعدة البيانات"

            norm_name = self._normalize_arabic(row[1])
            cur.execute("""
                SELECT name, full_name_formal, quotes_json
                FROM narrator_scholars
                WHERE name_norm LIKE ? OR full_name_formal LIKE ?
                LIMIT 1
            """, (f"%{norm_name[:15]}%", f"%{norm_name[:15]}%"))
            sc_row = cur.fetchone()

            scholar_critique = {}
            total_critics = 0
            if sc_row and sc_row[2]:
                try:
                    q_data = json.loads(sc_row[2])
                    total_critics = len(q_data)
                    for s in ['أحمد بن حنبل', 'يحيى بن معين', 'البخاري', 'علي بن المديني', 'أبو حاتم الرازي', 'مالك بن أنس', 'ابن حجر', 'الذهبى', 'النسائي', 'ابن حبان']:
                        if s in q_data:
                            scholar_critique[s] = q_data[s][:2]
                except Exception:
                    pass

            conn.close()

            return to_json_str(build_response(
                status="ok",
                data={
                    "id": row[0],
                    "full_name": row[1],
                    "kunya": row[2] or "",
                    "grade_ar": clean_grade,
                    "ibnhajar_rank": ibnhajar_rank,
                    "zahabi_rank": zahabi_rank,
                    "grade_en": row[4] or "unspecified",
                    "death": clean_death,
                    "city": clean_city,
                    "tabaqat": clean_tabaqa,
                    "laqab": row[8] or "",
                    "nasab": row[9] or "",
                    "mazhab": ar_row[6] if ar_row and ar_row[6] != '-' else "",
                    "journey_city": ar_row[7] if ar_row and ar_row[7] != '-' else "",
                    "classical_sources": parse_list(row[10]),
                    "scholars_quoted_count": total_critics,
                    "scholars_verbatim_evaluations": scholar_critique,
                    "teachers_count": len(raw_teachers),
                    "teachers_sample": teachers_sample,
                    "students_count": len(raw_students),
                    "students_sample": students_sample,
                    "alternate_namings": parse_list(row[13])
                },
                evidence={"source_name": "Itqan & AR-Sanad Biographical Records", "locator": f"narrator_id:{narrator_id}"}
            ))

        except Exception as e:
            return to_json_str(build_response(
                status="unavailable",
                warnings=[f"Biography lookup failed: {str(e)}"]
            ))

    def get_narrator_scholar_quotes(self, narrator_name: str, scholar_filter: str = "") -> str:
        """
        Retrieve verbatim critical evaluations and Jarh wa Ta'dil statements of classical masters (Ahmad, Ibn Ma'in, al-Bukhari, Abu Hatim, al-Nasa'i, Ibn Hibban, etc.) with exact volume and page citations.
        
        :param narrator_name: Name of the narrator (e.g. 'سعيد بن المسيب', 'الحميدي', 'سليمان بن يسار').
        :param scholar_filter: Optional filter to focus on a specific evaluating scholar.
        :return: JSON formatted verbatim scholar statements.
        """
        if not os.path.exists(self.valves.DB_PATH):
            return to_json_str(build_response(
                status="unavailable",
                warnings=["Database not found."]
            ))

        q_clean = narrator_name.strip()
        q_norm = self._normalize_arabic(q_clean)
        if not q_norm:
            return to_json_str(build_response(
                status="invalid_argument",
                warnings=["Narrator name cannot be empty."]
            ))

        try:
            conn = sqlite3.connect(self.valves.DB_PATH)
            cur = conn.cursor()

            cur.execute("""
                SELECT name, full_name_formal, ibnhajar_rank, zahabi_rank, quotes_json
                FROM narrator_scholars
                WHERE name_norm LIKE ? OR full_name_formal LIKE ?
                LIMIT 1
            """, (f"%{q_norm[:15]}%", f"%{q_clean[:15]}%"))
            row = cur.fetchone()
            conn.close()

            if not row:
                return to_json_str(build_response(
                    status="no_match",
                    data={"query": narrator_name, "found": False, "evaluations_by_scholar": {}},
                    warnings=[f"لم يُعثر على ترجمة موسعة لنصوص الجرح والتعديل بالصفحة والجزء للراوي '{narrator_name}' في قاعدة الأسانيد الكلاسيكية."]
                ))

            quotes = json.loads(row[4])
            if scholar_filter:
                s_filter_clean = scholar_filter.strip()
                filtered = {k: v for k, v in quotes.items() if s_filter_clean in k}
            else:
                filtered = quotes

            return to_json_str(build_response(
                status="ok",
                data={
                    "query": narrator_name,
                    "found": True,
                    "formal_name": row[1],
                    "ibnhajar_rank": row[2] if row[2] not in ('-', '', None) else None,
                    "zahabi_rank": row[3] if row[3] not in ('-', '', None) else None,
                    "total_critics_count": len(quotes),
                    "critics_filtered_count": len(filtered),
                    "evaluations_by_scholar": filtered
                },
                evidence={
                    "source_name": "تهذيب الكمال / تهذيب التهذيب / الجرح والتعديل / الثقات",
                    "locator": f"narrator_scholars:name:{row[1]}"
                }
            ))

        except Exception as e:
            return to_json_str(build_response(
                status="unavailable",
                warnings=[f"Failed to retrieve scholar quotes: {str(e)}"]
            ))

    def get_book_narrator_network(self, book: str, narrator_name: str = "", direction: str = "students") -> str:
        """
        Inspect dynamic or precomputed transmission network for a canonical book, revealing central narrators, their transmitters (students), or their teachers.
        
        :param book: Collection name: 'bukhari', 'muslim', 'tirmidhi', 'abudawud', 'nasai', 'ibnmajah', 'ahmed', 'malik', 'darimi'.
        :param narrator_name: Narrator name to focus on (e.g. 'أبو هريرة', 'الزهري', 'قتادة', 'الأعمش').
        :param direction: 'students' (transmitters from him / الرواة عنه) or 'teachers' (those he transmitted from / شيوخه). Default is 'students'.
        :return: JSON formatted top nodes and transmission links with exact frequencies, death years, and ranks.
        """
        if not os.path.exists(self.valves.DB_PATH):
            return to_json_str(build_response(
                status="unavailable",
                warnings=["Database not found."]
            ))

        BOOK_MAP = {
            # Bukhari
            'bukhari': 'bukhari', 'صحيح البخاري': 'bukhari', 'البخاري': 'bukhari', 'جامع البخاري': 'bukhari', 'صحيح البخارى': 'bukhari', 'بخاري': 'bukhari',
            # Muslim
            'muslim': 'muslim', 'صحيح مسلم': 'muslim', 'مسلم': 'muslim', 'جامع مسلم': 'muslim', 'مسند مسلم': 'muslim',
            # Abu Dawud
            'abudawud': 'abudawud', 'سنن أبي داود': 'abudawud', 'أبو داود': 'abudawud', 'سنن ابي داود': 'abudawud', 'ابو داود': 'abudawud', 'ابي داود': 'abudawud', 'مسند أبي داود': 'abudawud', 'مسند ابو داود': 'abudawud', 'مسند أبو داود': 'abudawud',
            # Tirmidhi
            'tirmidhi': 'tirmidhi', 'سنن الترمذي': 'tirmidhi', 'الترمذي': 'tirmidhi', 'جامع الترمذي': 'tirmidhi', 'ترمذي': 'tirmidhi', 'صحيح الترمذي': 'tirmidhi',
            # Nasai
            'nasai': 'nasai', 'سنن النسائي': 'nasai', 'النسائي': 'nasai', 'نسائي': 'nasai', 'المجتبى': 'nasai', 'السنن الصغرى': 'nasai', 'سنن النسائي الصغرى': 'nasai',
            # Ibn Majah
            'ibnmajah': 'ibnmajah', 'سنن ابن ماجه': 'ibnmajah', 'ابن ماجه': 'ibnmajah', 'ابن ماجة': 'ibnmajah', 'سنن ابن ماجة': 'ibnmajah',
            # Ahmad
            'ahmed': 'ahmed', 'مسند أحمد': 'ahmed', 'أحمد': 'ahmed', 'مسند احمد': 'ahmed', 'احمد': 'ahmed', 'مسند الإمام أحمد': 'ahmed', 'مسند الامام احمد': 'ahmed',
            # Malik
            'malik': 'malik', 'موطأ مالك': 'malik', 'مالك': 'malik', 'الموطأ': 'malik', 'الموطا': 'malik', 'موطأ الإمام مالك': 'malik', 'موطأ الامام مالك': 'malik',
            # Darimi
            'darimi': 'darimi', 'سنن الدارمي': 'darimi', 'الدارمي': 'darimi', 'دارمي': 'darimi', 'مسند الدارمي': 'darimi',
            # Ibn Abi Shaybah
            'musannaf_ibnabi_shaybah': 'musannaf_ibnabi_shaybah', 'مصنف ابن أبي شيبة': 'musannaf_ibnabi_shaybah', 'مصنف ابن ابي شيبة': 'musannaf_ibnabi_shaybah', 'ابن أبي شيبة': 'musannaf_ibnabi_shaybah', 'ابن ابي شيبة': 'musannaf_ibnabi_shaybah',
            # Al-Adab al-Mufrad
            'aladab_almufrad': 'aladab_almufrad', 'الأدب المفرد': 'aladab_almufrad', 'ادب المفرد': 'aladab_almufrad', 'الادب المفرد': 'aladab_almufrad', 'الأدب المفرد للبخاري': 'aladab_almufrad',
            # Shamail
            'shamail_muhammadiyah': 'shamail_muhammadiyah', 'الشمائل المحمدية': 'shamail_muhammadiyah', 'الشمائل': 'shamail_muhammadiyah', 'شمائل الترمذي': 'shamail_muhammadiyah',
            # Bulugh al-Maram
            'bulugh_almaram': 'bulugh_almaram', 'بلوغ المرام': 'bulugh_almaram', 'بلوغ المرام من أدلة الأحكام': 'bulugh_almaram',
            # Riyad al-Salihin
            'riyad_assalihin': 'riyad_assalihin', 'رياض الصالحين': 'riyad_assalihin', 'رياض الصالحين للنووي': 'riyad_assalihin',
            # Mishkat
            'mishkat_almasabih': 'mishkat_almasabih', 'مشكاة المصابيح': 'mishkat_almasabih',
            # Arba'un Nawawiyyah
            'nawawi40': 'nawawi40', 'الأربعون النووية': 'nawawi40', 'الاربعون النووية': 'nawawi40', 'أربعين النووية': 'nawawi40',
            # Qudsi 40
            'qudsi40': 'qudsi40', 'الأحاديث القدسية': 'qudsi40', 'الاحاديث القدسية': 'qudsi40', 'أربعون قدسية': 'qudsi40',
            # Shah Waliullah
            'shahwaliullah40': 'shahwaliullah40', 'أربعين شاه ولي الله': 'shahwaliullah40',
            # All
            'all': 'all', 'الكل': 'all', 'جميع الكتب': 'all', 'كافة الكتب': 'all', 'كتب السنة': 'all', 'الكتب التسعة': 'all'
        }
        b_raw = book.lower().strip()
        b_norm = self._normalize_arabic(b_raw)
        book_matched = False
        for k, v in BOOK_MAP.items():
            if self._normalize_arabic(k) == b_norm or k == b_raw:
                book = v
                book_matched = True
                break
        if not book_matched and book != 'all':
            return to_json_str(build_response(
                status="invalid_reference",
                warnings=[f"Unsupported book '{book}'. Supported collections: {sorted(set(BOOK_MAP.values()))}"]
            ))

        dir_clean = direction.lower().strip()
        if dir_clean in ('students', 'رواة عنه'):
            direction = 'students'
        elif dir_clean in ('teachers', 'شيوخه'):
            direction = 'teachers'
        else:
            return to_json_str(build_response(
                status="invalid_reference",
                warnings=[f"Invalid direction '{direction}'. Must be 'students' or 'teachers'."]
            ))

        try:
            self._ensure_rijal_index()

            if narrator_name:
                target = self.resolve_focus_narrator(narrator_name)
                if not target:
                    return to_json_str(build_response(
                        status="no_match",
                        data={"query": narrator_name, "found": False},
                        warnings=[f"Narrator '{narrator_name}' could not be identified in the Rijal database."]
                    ))

                target_id = target['id']
                target_name = target['name']

                # Short search pattern
                short_name = target_name.split(' : ')[0].split(' ، ')[0].strip()
                target_pattern = f"%{short_name}%"

                conn = sqlite3.connect(self.valves.DB_PATH)
                conn.row_factory = sqlite3.Row
                cur = conn.cursor()

                # Optimized deterministic index queries (zero table scans, sub-10ms)
                if direction == 'students':
                    if book == 'all':
                        cur.execute("""
                            SELECT id, occurrence_id, hadith_id, path_id, step,
                                   student_id, student_name, student_raw,
                                   teacher_id, teacher_name, teacher_raw,
                                   relation_type, resolution_rule, text_span, chronology_conflict
                            FROM isnad_transmissions
                            WHERE teacher_id = ?
                        """, (target_id,))
                    else:
                        cur.execute("""
                            SELECT id, occurrence_id, hadith_id, path_id, step,
                                   student_id, student_name, student_raw,
                                   teacher_id, teacher_name, teacher_raw,
                                   relation_type, resolution_rule, text_span, chronology_conflict
                            FROM isnad_transmissions
                            WHERE book = ? AND teacher_id = ?
                        """, (book, target_id))
                else: # direction == 'teachers'
                    if book == 'all':
                        cur.execute("""
                            SELECT id, occurrence_id, hadith_id, path_id, step,
                                   student_id, student_name, student_raw,
                                   teacher_id, teacher_name, teacher_raw,
                                   relation_type, resolution_rule, text_span, chronology_conflict
                            FROM isnad_transmissions
                            WHERE student_id = ?
                        """, (target_id,))
                    else:
                        cur.execute("""
                            SELECT id, occurrence_id, hadith_id, path_id, step,
                                   student_id, student_name, student_raw,
                                   teacher_id, teacher_name, teacher_raw,
                                   relation_type, resolution_rule, text_span, chronology_conflict
                            FROM isnad_transmissions
                            WHERE book = ? AND student_id = ?
                        """, (book, target_id))

                rows = cur.fetchall()
                conn.close()

                resolved = {}
                total_extracted = len(rows)
                unresolved_count = 0
                conflict_count = 0

                for r in rows:
                    t_nid = r['student_id'] if direction == 'students' else r['teacher_id']
                    t_name = r['student_name'] if direction == 'students' else r['teacher_name']
                    h_id = r['hadith_id']
                    is_conflict = r['chronology_conflict']
                    rel_type = r['relation_type']
                    occ_id = r['occurrence_id']
                    res_rule = r['resolution_rule']

                    if is_conflict:
                        conflict_count += 1
                        # Flagged for review; separated from clean confirmed direct transmitters
                        continue

                    if not t_nid or t_nid not in self._narrators_db:
                        unresolved_count += 1
                        continue

                    # Self-loop guard
                    if t_nid == target_id:
                        continue

                    p = self._narrators_db[t_nid]
                    key = t_nid
                    if key not in resolved:
                        resolved[key] = {
                            'profile': p,
                            'hadith_ids': set(),
                            'transmission_frequency': 0,
                            'relation_types': set(),
                            'sample_occurrences': [],
                            'sample_rules': set()
                        }
                    resolved[key]['hadith_ids'].add(h_id)
                    resolved[key]['transmission_frequency'] += 1
                    resolved[key]['relation_types'].add(rel_type)
                    if len(resolved[key]['sample_occurrences']) < 3:
                        resolved[key]['sample_occurrences'].append(occ_id)
                    if res_rule:
                        resolved[key]['sample_rules'].add(res_rule)

                sorted_transmitters = sorted(resolved.values(), key=lambda x: -x['transmission_frequency'])

                transmitters_enriched = [
                    {
                        "id": item['profile']['id'],
                        "name": item['profile']['name'],
                        "hadith_count": len(item['hadith_ids']),
                        "transmission_frequency": item['transmission_frequency'],
                        "relation_types": list(item['relation_types']),
                        "sample_occurrence_ids": item['sample_occurrences'],
                        "death": item['profile']['death'],
                        "grade": item['profile']['grade'],
                        "city": item['profile']['city']
                    }
                    for item in sorted_transmitters
                ]

                link_list = [
                    {
                        "source": t['name'] if direction == 'students' else target_name,
                        "target": target_name if direction == 'students' else t['name'],
                        "hadiths_count": t['hadith_count'],
                        "transmission_frequency": t['transmission_frequency'],
                        "relation_types": t['relation_types'],
                        "evidence_occurrence_id": t['sample_occurrence_ids'][0] if t['sample_occurrence_ids'] else None
                    }
                    for t in transmitters_enriched[:25]
                ]

                coverage_diag = {
                    "total_extracted_edges": total_extracted,
                    "clean_resolved_transmitters": len(transmitters_enriched),
                    "chronology_conflicts_flagged": conflict_count,
                    "unresolved_edges": unresolved_count,
                    "resolution_rate_pct": round(len(transmitters_enriched) / max(total_extracted, 1) * 100, 2)
                }

                return to_json_str(build_response(
                    status="ok",
                    data={
                        "book": book,
                        "focus_narrator": {
                            "id": target_id,
                            "name": target_name,
                            "death": target['death'],
                            "grade": target['grade'],
                            "city": target['city']
                        },
                        "direction": direction,
                        "direct_transmitters_count": len(transmitters_enriched),
                        "direct_transmitters": transmitters_enriched,
                        "strongest_links": link_list,
                        "coverage_diagnostics": coverage_diag,
                        "methodology": "Occurrence-Provenanced Isnad Network with Lean B-Tree Indexing (SEARCH TABLE plan, <10ms)"
                    },
                    coverage={"book": book, "focus_narrator": target_name, "transmitters_count": len(transmitters_enriched)},
                    evidence={"source_name": "isnad_transmissions", "locator": f"book:{book}:narrator:{target_id}"}
                ))

            else:
                conn = sqlite3.connect(self.valves.DB_PATH)
                cur = conn.cursor()
                cur.execute("""
                    SELECT name, count, grade_ar, grade_en, death, places
                    FROM isnad_nodes
                    WHERE LOWER(book) = ?
                    ORDER BY count DESC
                    LIMIT 10
                """, (book,))
                nodes = cur.fetchall()

                cur.execute("""
                    SELECT source_name, target_name, weight
                    FROM isnad_links
                    WHERE LOWER(book) = ?
                    ORDER BY weight DESC
                    LIMIT 15
                """, (book,))
                links = cur.fetchall()
                conn.close()

                node_list = []
                for n in nodes:
                    node_list.append({
                        "name": n[0],
                        "hadith_count_in_book": n[1],
                        "grade_ar": n[2] or "غير محدد",
                        "grade_en": n[3] or "unspecified",
                        "death": n[4] or "غير معروف",
                        "locations": n[5] or ""
                    })

                link_list = []
                for l in links:
                    link_list.append({
                        "source": l[0],
                        "target": l[1],
                        "transmission_frequency": l[2]
                    })

                return to_json_str(build_response(
                    status="ok",
                    data={
                        "book": book,
                        "focus_narrator": "All Top Transmitters",
                        "top_nodes": node_list,
                        "strongest_links": link_list
                    },
                    coverage={"book": book, "top_nodes_count": len(node_list), "links_count": len(link_list)},
                    evidence={"source_name": "Itqan Precomputed Networks", "locator": f"book:{book}"}
                ))

        except Exception as e:
            return to_json_str(build_response(
                status="unavailable",
                warnings=[f"Transmission network lookup failed: {str(e)}"]
            ))

    def compare_narrator_across_books(self, narrator_name: str, book1: str = "bukhari", book2: str = "muslim", direction: str = "students") -> str:
        """
        Compare the transmission network of any narrator across two canonical Hadith collections (e.g. Bukhari vs Muslim, or Bukhari vs Abu Dawud).
        Reveals shared transmitters, unique transmitters to book 1, unique transmitters to book 2, and exact frequencies.
        
        :param narrator_name: Name of the narrator (e.g. 'أبو هريرة', 'الزهري', 'قتادة', 'الأعمش', 'نافع', 'مالك').
        :param book1: First collection (default: 'bukhari').
        :param book2: Second collection (default: 'muslim').
        :param direction: 'students' (transmitters from him / الرواة عنه) or 'teachers' (those he transmitted from / شيوخه). Default is 'students'.
        :return: JSON formatted comparative analysis.
        """
        res1_raw = self.get_book_narrator_network(book1, narrator_name, direction)
        res2_raw = self.get_book_narrator_network(book2, narrator_name, direction)

        try:
            r1 = json.loads(res1_raw)
            r2 = json.loads(res2_raw)
        except Exception as e:
            return to_json_str(build_response(status="unavailable", warnings=[f"Failed to parse network results: {str(e)}"]))

        if r1.get('status') != 'ok':
            return res1_raw
        if r2.get('status') != 'ok':
            return res2_raw

        d1 = r1.get('data', {})
        d2 = r2.get('data', {})

        t1_list = d1.get('direct_transmitters', [])
        t2_list = d2.get('direct_transmitters', [])

        t1_map = {t['id'] or t['name']: t for t in t1_list}
        t2_map = {t['id'] or t['name']: t for t in t2_list}

        all_keys = set(t1_map.keys()) | set(t2_map.keys())
        shared = []
        unique_b1 = []
        unique_b2 = []

        for k in all_keys:
            if k in t1_map and k in t2_map:
                p1 = t1_map[k]
                p2 = t2_map[k]
                shared.append({
                    "id": p1['id'],
                    "name": p1['name'],
                    f"{book1}_count": p1['hadith_count'],
                    f"{book2}_count": p2['hadith_count'],
                    "total_count": p1['hadith_count'] + p2['hadith_count'],
                    "death": p1['death'],
                    "grade": p1['grade'],
                    "city": p1['city']
                })
            elif k in t1_map:
                p = t1_map[k]
                unique_b1.append({
                    "id": p['id'],
                    "name": p['name'],
                    "hadith_count": p['hadith_count'],
                    "death": p['death'],
                    "grade": p['grade'],
                    "city": p['city']
                })
            else:
                p = t2_map[k]
                unique_b2.append({
                    "id": p['id'],
                    "name": p['name'],
                    "hadith_count": p['hadith_count'],
                    "death": p['death'],
                    "grade": p['grade'],
                    "city": p['city']
                })

        shared.sort(key=lambda x: -x['total_count'])
        unique_b1.sort(key=lambda x: -x['hadith_count'])
        unique_b2.sort(key=lambda x: -x['hadith_count'])

        return to_json_str(build_response(
            status="ok",
            data={
                "focus_narrator": d1.get('focus_narrator'),
                "direction": direction,
                "book1": book1,
                "book2": book2,
                f"total_in_{book1}": len(t1_list),
                f"total_in_{book2}": len(t2_list),
                "shared_count": len(shared),
                f"unique_to_{book1}_count": len(unique_b1),
                f"unique_to_{book2}_count": len(unique_b2),
                "shared_transmitters": shared,
                f"unique_to_{book1}": unique_b1,
                f"unique_to_{book2}": unique_b2
            },
            coverage={"book1": book1, "book2": book2, "shared_count": len(shared)},
            evidence={"source_name": "Itqan Multi-Book Network Analysis", "locator": f"compare:{book1}:{book2}:narrator:{narrator_name}"}
        ))

    def get_narrator_link_evidence(
        self,
        book: str = "bukhari",
        student_id: Optional[int] = None,
        teacher_id: Optional[int] = None,
        link_id: Optional[int] = None,
        limit: int = 5,
        cursor: Optional[int] = None
    ) -> str:
        """
        Retrieve authentic occurrence-level provenance for a transmission edge,
        including exact isnad text snippet, occurrence ID, chapter, hadith number,
        relation type ('direct', 'father', 'grandfather', 'aunt', 'unresolved_gap'),
        resolution rule, character offsets, and honest chronology diagnostics.
        
        :param book: Hadith collection key (e.g. 'bukhari', 'muslim', 'abudawud').
        :param student_id: Narrator ID of the transmitting student.
        :param teacher_id: Narrator ID of the teacher.
        :param link_id: Optional specific transmission record ID.
        :param limit: Maximum evidence occurrences to return (1-50, default: 5).
        :param cursor: Optional integer cursor for stable forward pagination.
        :return: JSON formatted evidence list with pagination and diagnostic counts.
        """
        if not os.path.exists(self.valves.DB_PATH):
            return to_json_str(build_response(
                status="unavailable",
                warnings=["Database not found."]
            ))

        # Enforce bounded limit [1, 50]
        try:
            bounded_limit = max(1, min(int(limit), 50))
        except (ValueError, TypeError):
            bounded_limit = 5

        # Enforce book validation
        book_raw = book.lower().strip()
        book_clean = self.BOOK_MAP.get(book_raw, self.BOOK_MAP.get(self._normalize_arabic(book_raw)))
        if not book_clean and book_raw != 'all':
            return to_json_str(build_response(
                status="invalid_reference",
                warnings=[f"Unsupported book '{book}'. Supported collections: {sorted(set(self.BOOK_MAP.values()))}"]
            ))
        book_clean = book_clean or 'all'
        
        try:
            conn = sqlite3.connect(self.valves.DB_PATH)
            conn.row_factory = sqlite3.Row
            cur = conn.cursor()
            
            cursor_filter = " AND t.id > ?" if cursor is not None else ""
            
            if link_id:
                # Enforce book scope for link ID
                if book_clean == 'all':
                    cur.execute("""
                        SELECT t.*, h.arabic_text AS full_hadith_text
                        FROM isnad_transmissions t
                        LEFT JOIN hadiths h ON t.hadith_id = h.id
                        WHERE t.id = ?
                    """, (link_id,))
                else:
                    cur.execute("""
                        SELECT t.*, h.arabic_text AS full_hadith_text
                        FROM isnad_transmissions t
                        LEFT JOIN hadiths h ON t.hadith_id = h.id
                        WHERE t.id = ? AND t.book = ?
                    """, (link_id, book_clean))
                rows = cur.fetchall()
                if not rows:
                    other = cur.execute("SELECT book FROM isnad_transmissions WHERE id = ?", (link_id,)).fetchone()
                    conn.close()
                    if other:
                        return to_json_str(build_response(
                            status="no_match",
                            warnings=[f"Link ID {link_id} belongs to collection '{other['book']}', but was queried with book='{book_clean}'. Enforcing collection scope."]
                        ))
                    return to_json_str(build_response(
                        status="no_match",
                        warnings=[f"Link ID {link_id} not found in transmission database."]
                    ))
            elif student_id and teacher_id:
                params = []
                where_book = "t.book = ? AND " if book_clean != 'all' else ""
                if book_clean != 'all': params.append(book_clean)
                params.extend([student_id, teacher_id])
                if cursor is not None: params.append(cursor)
                params.append(bounded_limit)
                
                cur.execute(f"""
                    SELECT t.*, h.arabic_text AS full_hadith_text
                    FROM isnad_transmissions t
                    LEFT JOIN hadiths h ON t.hadith_id = h.id
                    WHERE {where_book} t.student_id = ? AND t.teacher_id = ? {cursor_filter}
                    ORDER BY t.hadith_id ASC, t.path_id ASC, t.step ASC, t.id ASC
                    LIMIT ?
                """, params)
                rows = cur.fetchall()
            elif teacher_id:
                params = []
                where_book = "t.book = ? AND " if book_clean != 'all' else ""
                if book_clean != 'all': params.append(book_clean)
                params.append(teacher_id)
                if cursor is not None: params.append(cursor)
                params.append(bounded_limit)
                
                cur.execute(f"""
                    SELECT t.*, h.arabic_text AS full_hadith_text
                    FROM isnad_transmissions t
                    LEFT JOIN hadiths h ON t.hadith_id = h.id
                    WHERE {where_book} t.teacher_id = ? {cursor_filter}
                    ORDER BY t.hadith_id ASC, t.path_id ASC, t.step ASC, t.id ASC
                    LIMIT ?
                """, params)
                rows = cur.fetchall()
            elif student_id:
                params = []
                where_book = "t.book = ? AND " if book_clean != 'all' else ""
                if book_clean != 'all': params.append(book_clean)
                params.append(student_id)
                if cursor is not None: params.append(cursor)
                params.append(bounded_limit)
                
                cur.execute(f"""
                    SELECT t.*, h.arabic_text AS full_hadith_text
                    FROM isnad_transmissions t
                    LEFT JOIN hadiths h ON t.hadith_id = h.id
                    WHERE {where_book} t.student_id = ? {cursor_filter}
                    ORDER BY t.hadith_id ASC, t.path_id ASC, t.step ASC, t.id ASC
                    LIMIT ?
                """, params)
                rows = cur.fetchall()
            else:
                conn.close()
                return to_json_str(build_response(
                    status="invalid_reference",
                    warnings=["Either link_id or (teacher_id / student_id) must be specified."]
                ))
                
            evidence_list = []
            for r in rows:
                full_text = r['full_hadith_text'] or ""
                excerpt = full_text[:280] + ("..." if len(full_text) > 280 else "")
                r_keys = r.keys()
                
                s_bounds = [r['student_start'], r['student_end']] if 'student_start' in r_keys and r['student_start'] is not None else None
                t_bounds = [r['teacher_start'], r['teacher_end']] if 'teacher_start' in r_keys and r['teacher_start'] is not None else None
                source_offsets = [r['span_start'], r['span_end']] if 'span_start' in r_keys and r['span_start'] is not None else None
                
                chrono_stat = r['chronology_status'] if 'chronology_status' in r_keys and r['chronology_status'] else ("potential_conflict" if r['chronology_conflict'] else "no_conflict_detected")
                chrono_rsn = r['chronology_reason'] if 'chronology_reason' in r_keys and r['chronology_reason'] else ("Severe death year gap detected" if r['chronology_conflict'] else "No severe death year conflict detected")
                
                evidence_list.append({
                    "transmission_id": r['id'],
                    "edge_id": r['edge_id'] if 'edge_id' in r_keys else f"{r['occurrence_id']}:p{r['path_id']}:e{r['step']}",
                    "occurrence_id": r['occurrence_id'],
                    "book": r['book'],
                    "chapter": r['chapter'],
                    "hadith_number": r['id_in_book'],
                    "path_id": r['path_id'],
                    "step": r['step'],
                    "student": {
                        "id": r['student_id'],
                        "name": r['student_name'],
                        "raw_mention": r['student_raw'],
                        "state": r['student_state'] if 'student_state' in r_keys else ('resolved' if r['student_id'] else 'unresolved_gap'),
                        "char_bounds": s_bounds
                    },
                    "teacher": {
                        "id": r['teacher_id'],
                        "name": r['teacher_name'],
                        "raw_mention": r['teacher_raw'],
                        "state": r['teacher_state'] if 'teacher_state' in r_keys else ('resolved' if r['teacher_id'] else 'unresolved_gap'),
                        "char_bounds": t_bounds
                    },
                    "relation_type": r['relation_type'],
                    "resolution_rule": r['resolution_rule'],
                    "transmission_phrase": r['transmission_phrase'] if 'transmission_phrase' in r_keys and r['transmission_phrase'] else "عن",
                    "isnad_text_span": r['text_span'],
                    "source_char_offsets": source_offsets,
                    "source_sha256": r['source_sha256'] if 'source_sha256' in r_keys else None,
                    "hadith_excerpt": excerpt,
                    "chronology": {
                        "status": chrono_stat,
                        "reason": chrono_rsn
                    },
                    "chronology_status": chrono_stat
                })
                
            conn.close()
            
            next_cursor = rows[-1]['id'] if len(rows) == bounded_limit else None
            resolved_cnt = sum(1 for e in evidence_list if e['student']['id'] and e['teacher']['id'])
            unresolved_cnt = sum(1 for e in evidence_list if not e['student']['id'] or not e['teacher']['id'])
            conflict_cnt = sum(1 for e in evidence_list if e['chronology']['status'] == 'potential_conflict')
            
            return to_json_str(build_response(
                status="ok" if evidence_list else "no_match",
                data={
                    "evidence_count": len(evidence_list),
                    "evidence_items": evidence_list,
                    "pagination": {
                        "limit": bounded_limit,
                        "cursor": cursor,
                        "next_cursor": next_cursor,
                        "has_more": next_cursor is not None
                    },
                    "diagnostic_counts": {
                        "returned_count": len(evidence_list),
                        "resolved_edges": resolved_cnt,
                        "unresolved_edges": unresolved_cnt,
                        "conflict_edges": conflict_cnt
                    }
                },
                coverage={"requested_book": book_clean, "returned": len(evidence_list)},
                evidence={"source_name": "isnad_transmissions & hadiths", "locator": f"evidence:book:{book_clean}"}
            ))
        except Exception as e:
            return to_json_str(build_response(
                status="unavailable",
                warnings=[f"Failed to fetch transmission evidence: {str(e)}"]
            ))
