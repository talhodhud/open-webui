// Generated from planning/islam_topic_taxonomy_v1.json and bayan_lesson_packs_v1.json.
// Enforces negative exclusion rules; semantic packs, not chapter_title_candidate_only.
export const TOPICS = [
  {
    "id": "topic-faith",
    "title": "الإيمان والمعنى",
    "titleEn": "Faith and Purpose",
    "question": "كيف يربط الإسلام الإيمان بالنية والعمل؟",
    "questionEn": "How does Islam connect inner faith with intention and daily action?",
    "seedQueries": [
      "الإيمان",
      "النيات"
    ],
    "chapterTitles": [
      "كتاب بدء الوحى",
      "كتاب الإيمان",
      "كتاب الرقاق",
      "كتاب القدر",
      "كتاب الإيمان وشرائعه"
    ],
    "chapterCount": 10,
    "collections": [
      "bukhari",
      "muslim",
      "nasai",
      "tirmidhi"
    ],
    "subtopics": [
      {
        "id": "faith_intention",
        "title": "النية والإخلاص وتجريد القصد لله",
        "objective": "فهم أن الأعمال في الإسلام لا تُقاس بظاهرها المادي فحسب، بل بصدق القصد الباطني ونقاء النية."
      },
      {
        "id": "faith_pillars",
        "title": "أركان الإيمان وأثرها في سكينة النفس",
        "objective": "استيعاب ركائز الإيمان بالله ورسله واليوم الآخر كمنظومة تعطي الإنسان طمأنينة وغاية في الوجود."
      },
      {
        "id": "faith_conduct",
        "title": "الإيمان سلوك عملي ومسؤولية أخلاقية",
        "objective": "إدراك أن الإيمان الصادق يثمر حياءً وحسن تعامل وأمانة، وأن دعوى الإيمان بلا عمل دعوى جوفاء."
      }
    ],
    "mappingStatus": "semantic_pack_derived",
    "reviewStatus": "needs_review",
    "sourceVerified": true,
    "scholarlyApproved": false,
    "modelId": "hadith-islam-guide",
    "unifiedModelId": "bayan-unified-pilot",
    "primarySkillId": "hadith-islam-guide"
  },
  {
    "id": "topic-mercy",
    "title": "الرحمة وحسن الخلق",
    "titleEn": "Mercy and Good Character",
    "question": "كيف تظهر الرحمة في تعامل المسلم مع الناس؟",
    "questionEn": "How is mercy manifested in a Muslim's interaction with humanity and creation?",
    "seedQueries": [
      "من لا يرحم",
      "الرفق"
    ],
    "chapterTitles": [
      "كتاب الأدب",
      "كتاب الرقاق",
      "كتاب البر والصلة والآداب",
      "كتاب الأدب عن رسول الله صلى الله عليه وسلم"
    ],
    "chapterCount": 7,
    "collections": [
      "abudawud",
      "bukhari",
      "ibnmajah",
      "muslim",
      "tirmidhi"
    ],
    "subtopics": [
      {
        "id": "mercy_universal",
        "title": "الرحمة الشاملة بالبشر والحيوان وسائر الخلق",
        "objective": "إبراز أن رسالة النبي ﷺ قائمة على الرحمة العامة، وأن الإحسان للحيوان والضعيف سبب لمغفرة الله."
      },
      {
        "id": "mercy_gentleness",
        "title": "الرفق ونبذ العنف والغلظة",
        "objective": "بيان فضل الرفق والتأني في معالجة الأمور، وأن ما كان الرفق في شيء إلا زانه."
      },
      {
        "id": "mercy_character",
        "title": "بشاشة الوجه وطيب الكلام والتواضع",
        "objective": "تبيان أن التبسم والكلمة الطيبة والصفح من صميم الدين ومراتب الفضل عند الله."
      }
    ],
    "mappingStatus": "semantic_pack_derived",
    "reviewStatus": "needs_review",
    "sourceVerified": true,
    "scholarlyApproved": false,
    "modelId": "hadith-islam-guide",
    "unifiedModelId": "bayan-unified-pilot",
    "primarySkillId": "hadith-islam-guide"
  },
  {
    "id": "topic-worship",
    "title": "العبادة والحياة",
    "titleEn": "Worship and Life",
    "question": "ما الصلة بين العبادة والحياة اليومية؟",
    "questionEn": "What is the connection between Islamic worship and everyday life?",
    "seedQueries": [
      "الصلاة",
      "الصيام"
    ],
    "chapterTitles": [
      "كتاب الصوم",
      "كتاب الصلاة",
      "كتاب الزكاة",
      "كتاب العمل فى الصلاة",
      "كتاب الزكاة عن رسول الله صلى الله عليه وسلم"
    ],
    "chapterCount": 16,
    "collections": [
      "abudawud",
      "bukhari",
      "ibnmajah",
      "muslim",
      "nasai",
      "tirmidhi"
    ],
    "subtopics": [
      {
        "id": "worship_prayer",
        "title": "الصلاة: معراج الروح ومحطة السكينة اليومية",
        "objective": "إدراك الصلاة كصلة مستمرة بالله تريح القلب وتنهى عن الفحشاء والمنكر وتضبط إيقاع اليوم."
      },
      {
        "id": "worship_fasting",
        "title": "الصوم: تدريب الإرادة ومواساة المحتاجين",
        "objective": "فهم الصيام كوسيلة للتحكم في الشهوات والشعور الفعلي بجوع الفقراء وتزكية النفس."
      },
      {
        "id": "worship_solidarity",
        "title": "الزكاة والصدقة: النماء والتكافل المجتمعي",
        "objective": "بيان أن التصدق ليس مجرد ضريبة مالية بل تطهير للمال وشعور بالمسؤولية التكافلية تجاه المحتاجين."
      }
    ],
    "mappingStatus": "semantic_pack_derived",
    "reviewStatus": "needs_review",
    "sourceVerified": true,
    "scholarlyApproved": false,
    "modelId": "hadith-islam-guide",
    "unifiedModelId": "bayan-unified-pilot",
    "primarySkillId": "hadith-islam-guide"
  },
  {
    "id": "topic-family",
    "title": "الأسرة والجوار",
    "titleEn": "Family and Neighbors",
    "question": "كيف يحفظ الإسلام حقوق الأسرة والجار؟",
    "questionEn": "How does Islam safeguard family bonds and neighborly rights?",
    "seedQueries": [
      "الجار",
      "الوالدين"
    ],
    "chapterTitles": [
      "كتاب النكاح",
      "كتاب الأدب",
      "كتاب النفقات",
      "كتاب البر والصلة والآداب",
      "كتاب النكاح عن رسول الله صلى الله عليه وسلم"
    ],
    "chapterCount": 13,
    "collections": [
      "abudawud",
      "bukhari",
      "ibnmajah",
      "muslim",
      "nasai",
      "tirmidhi"
    ],
    "subtopics": [
      {
        "id": "family_parents",
        "title": "بر الوالدين وصلة الأرحام",
        "objective": "إظهار منزلة الأم والأب في الإسلام كأعظم الواجبات الاجتماعية بعد التوحيد."
      },
      {
        "id": "family_neighbors",
        "title": "حقوق الجار وحرمة إيذائه وإكرامه",
        "objective": "بيان الوصية النبوية المتكررة بالجار مسلماً كان أو غير مسلم، وحرمة ترويعه أو بخسه."
      },
      {
        "id": "family_spouses",
        "title": "المودة والرحمة وحسن العشرة الزوجية",
        "objective": "فهم المعيار النبوي للرجولة والخيرية: «خيركم خيركم لأهله وأنا خيركم لأهلي»."
      }
    ],
    "mappingStatus": "semantic_pack_derived",
    "reviewStatus": "needs_review",
    "sourceVerified": true,
    "scholarlyApproved": false,
    "modelId": "hadith-islam-guide",
    "unifiedModelId": "bayan-unified-pilot",
    "primarySkillId": "hadith-islam-guide"
  },
  {
    "id": "topic-fairness",
    "title": "العدل والأمانة",
    "titleEn": "Justice and Trustworthiness",
    "question": "كيف تحضر الأمانة والعدل في التعاملات؟",
    "questionEn": "How are justice, honesty, and trust manifested in trade and daily interactions?",
    "seedQueries": [
      "غش",
      "الأمانة"
    ],
    "chapterTitles": [
      "كتاب البيوع",
      "كتاب الإجارة",
      "كتاب المظالم",
      "كتاب الشهادات",
      "كتاب الصلح"
    ],
    "chapterCount": 11,
    "collections": [
      "abudawud",
      "bukhari",
      "muslim",
      "nasai",
      "tirmidhi"
    ],
    "subtopics": [
      {
        "id": "fairness_trade",
        "title": "الصدق في البيع والشراء والتحذير من الغش",
        "objective": "إدراك مكانة التاجر الصدوق الأمين، وحرمة التطفيف والغش والخداع."
      },
      {
        "id": "fairness_justice",
        "title": "حرمة الظلم وأداء الحقوق إلى أهلها",
        "objective": "بيان تحريم الظلم حتى مع المخالف، وإيفاء الأجير حقه قبل أن يجف عرقه."
      },
      {
        "id": "fairness_trust",
        "title": "رعاية الأمانة والوفاء بالعهود",
        "objective": "ترسيخ أن خيانة الأمانة ونقض العهد من سمات النفاق المنافية لجوهر الإسلام."
      }
    ],
    "mappingStatus": "semantic_pack_derived",
    "reviewStatus": "needs_review",
    "sourceVerified": true,
    "scholarlyApproved": false,
    "modelId": "hadith-islam-guide",
    "unifiedModelId": "bayan-unified-pilot",
    "primarySkillId": "hadith-islam-guide"
  },
  {
    "id": "topic-knowledge",
    "title": "العلم والحوار",
    "titleEn": "Knowledge and Civil Dialogue",
    "question": "كيف يدعو الحديث إلى التعلم وحسن الحوار؟",
    "questionEn": "How does Hadith encourage the pursuit of knowledge and gracious dialogue?",
    "seedQueries": [
      "العلم",
      "فليقل خيرا"
    ],
    "chapterTitles": [
      "كتاب العلم",
      "كتاب الأدب",
      "كتاب الاعتصام بالكتاب والسنة",
      "كتاب العلم عن رسول الله صلى الله عليه وسلم",
      "كتاب الأدب عن رسول الله صلى الله عليه وسلم"
    ],
    "chapterCount": 9,
    "collections": [
      "abudawud",
      "bukhari",
      "ibnmajah",
      "muslim",
      "tirmidhi"
    ],
    "subtopics": [
      {
        "id": "knowledge_seeking",
        "title": "فضل طلب العلم ونشره وتيسيره للناس",
        "objective": "بيان أن طلب العلم عبادة وفريضة، وتيسير التعلم منهج نبوي: «يسروا ولا تعسروا»."
      },
      {
        "id": "knowledge_dialogue",
        "title": "أدب الحديث والكلمة الطيبة والصمت عن الشر",
        "objective": "ترسيخ قاعدة «فليقل خيراً أو ليصمت» والابتعاد عن السباب والفحش والمراء."
      },
      {
        "id": "knowledge_humility",
        "title": "التثبت في النقل والتواضع وعدم ادعاء العلم",
        "objective": "تعليم التثبت من صحة الأخبار ونبذ التقول والافتراء والتواضع مع المعلم والمتعلم."
      }
    ],
    "mappingStatus": "semantic_pack_derived",
    "reviewStatus": "needs_review",
    "sourceVerified": true,
    "scholarlyApproved": false,
    "modelId": "hadith-islam-guide",
    "unifiedModelId": "bayan-unified-pilot",
    "primarySkillId": "hadith-islam-guide"
  }
];
