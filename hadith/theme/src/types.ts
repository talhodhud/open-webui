export type HadithRecord = {
 record_id: string; collection: string; collection_label: string; chapter_title: string;
 arabic: string; english: string; citation: string; source_url: string; source_file: string;
 source_position: number; dorar_search_url: string; match_label: string;
 snippet: {text: string; match: boolean}[]; arabic_parts: {text: string; match: boolean}[];
};
export type SearchResponse = { status: string; results: HadithRecord[]; total_matches: number; suggestions: string[]; message?: string };
export const collections = [
 ['all','الكتب الستة'],['bukhari','صحيح البخاري'],['muslim','صحيح مسلم'],['abudawud','سنن أبي داود'],
 ['tirmidhi','جامع الترمذي'],['nasai','سنن النسائي'],['ibnmajah','سنن ابن ماجه']
];
export const bukhariExampleId = 'itqan:bukhari:1:1:bf026de7e155';
// A manual transcription of this single source occurrence. No biography or grade is inferred.
export const exampleChain = [
 {name:'الإمام البخاري',detail:'المصنف · صحيح البخاري',quote:'نسبة الكتاب في ملف المصدر'},
 {name:'الحميدي عبد الله بن الزبير',detail:'الاسم كما ورد في النص',quote:'حَدَّثَنَا الْحُمَيْدِيُّ عَبْدُ اللَّهِ بْنُ الزُّبَيْرِ'},
 {name:'سفيان',detail:'الهوية التفصيلية تحتاج إلى توثيق',quote:'قَالَ : حَدَّثَنَا سُفْيَانُ'},
 {name:'يحيى بن سعيد الأنصاري',detail:'الاسم كما ورد في النص',quote:'قَالَ : حَدَّثَنَا يَحْيَى بْنُ سَعِيدٍ الْأَنْصَارِيُّ'},
 {name:'محمد بن إبراهيم التيمي',detail:'الاسم كما ورد في النص',quote:'قَالَ : أَخْبَرَنِي مُحَمَّدُ بْنُ إِبْرَاهِيمَ التَّيْمِيُّ'},
 {name:'علقمة بن وقاص الليثي',detail:'الاسم كما ورد في النص',quote:'أَنَّهُ سَمِعَ عَلْقَمَةَ بْنَ وَقَّاصٍ اللَّيْثِيَّ'},
 {name:'عمر بن الخطاب',detail:'رضي الله عنه · ورد اسمه في النص',quote:'يَقُولُ : سَمِعْتُ عُمَرَ بْنَ الْخَطَّابِ'},
 {name:'رسول الله ﷺ',detail:'طرف الرواية كما ورد في النص',quote:'قَالَ : سَمِعْتُ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ'}
];
