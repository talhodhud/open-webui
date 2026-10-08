import { TOPICS } from './topics.ts';
import { TOPIC_EVIDENCE, type TopicEvidence } from './topicEvidence.ts';

export type AudienceCode = 'newcomer' | 'new_muslim' | 'educator';
export type FormatCode = 'card' | 'qa' | 'two_minute';
export type TrackKind = 'islam' | 'explore' | 'research' | 'evidence';

export const AUDIENCE_MAP: Record<string, { code: AudienceCode; label: string }> = {
  'newcomer': { code: 'newcomer', label: 'مهتم يتعرف على الإسلام' },
  'مهتم يتعرف على الإسلام': { code: 'newcomer', label: 'مهتم يتعرف على الإسلام' },
  'new_muslim': { code: 'new_muslim', label: 'حديث العهد بالإسلام' },
  'حديث العهد بالإسلام': { code: 'new_muslim', label: 'حديث العهد بالإسلام' },
  'educator': { code: 'educator', label: 'معرّف بالإسلام' },
  'معرّف بالإسلام': { code: 'educator', label: 'معرّف بالإسلام' }
};

export const FORMAT_MAP: Record<string, { code: FormatCode; label: string }> = {
  'card': { code: 'card', label: 'بطاقة تعريفية قصيرة' },
  'بطاقة تعريفية قصيرة': { code: 'card', label: 'بطاقة تعريفية قصيرة' },
  'qa': { code: 'qa', label: 'حوار سؤال وجواب' },
  'حوار سؤال وجواب': { code: 'qa', label: 'حوار سؤال وجواب' },
  'two_minute': { code: 'two_minute', label: 'كلمة تعريفية من دقيقتين' },
  'كلمة تعريفية من دقيقتين': { code: 'two_minute', label: 'كلمة تعريفية من دقيقتين' }
};

export function normalizeAudience(val: string): { code: AudienceCode; label: string } {
  const match = AUDIENCE_MAP[val?.trim()];
  if (!match) throw new Error(`Invalid audience: ${val}`);
  return match;
}

export function normalizeFormat(val: string): { code: FormatCode; label: string } {
  const match = FORMAT_MAP[val?.trim()];
  if (!match) throw new Error(`Invalid format: ${val}`);
  return match;
}

export interface JourneyContract {
  version: 1;
  modelId: string;
  track: TrackKind;
  originTrack?: TrackKind;
  routeKind?: 'all_paths' | 'specific_path';
  selectedPathId?: string;
  mentionId?: string;
  anchorName?: string;
  caseId?: string;
  topicId?: string;
  task: string;
  primarySkillId: string;
  optionalSkillIds?: string[];
  audience?: AudienceCode;
  format?: FormatCode;
  language: string;
  occurrenceIds: string[];
  evidenceIds: string[];
  reviewStatus: 'needs_review' | 'reviewed';
  submit: boolean;
}

export type Journey = {
  id: string;
  modelId: string;
  unifiedModelId: string;
  primarySkillId: string;
  track: TrackKind;
  task: string;
  title: string;
  category: string;
  icon: string;
  learn: string;
  research: string;
  question: string;
  outputs: { title: string; description: string }[];
  followups: { label: string; prompt: string; modelId?: string; unifiedSkillId?: string; task?: string }[];
  topic?: typeof TOPICS[number];
};

export const BRAND = { name: 'بيان السُّنّة', subtitle: 'الحديث النبوي للمعرّفين بالإسلام' };

// Baseline journeys with dual routing: legacy baseline + unified target pilot
export const JOURNEYS: Journey[] = [
  {
    id: 'prayer-call',
    modelId: 'hadith-model-1',
    unifiedModelId: 'bayan-unified-pilot',
    primarySkillId: 'hadith-search-record',
    track: 'explore',
    task: 'phrase_search',
    title: 'الصلاة جامعة',
    category: 'النص ومصادره',
    icon: 'layers',
    learn: 'تعرّف على مواضع الحديث وسياقه قبل الاستشهاد به.',
    research: 'قارن مواضع اللفظ في الكتب الستة، ثم توسّع في الأسانيد.',
    question: 'ابحث لي عن أحاديث (الصلاة جامعة) في الكتب الستة واذكر أرقامها وأسانيدها',
    outputs: [
      { title: 'مواضع الحديث', description: 'استعرض النصوص والمراجع التي يعيدها النموذج، وافتح توثيق كل رواية.' },
      { title: 'السياق والاختلاف', description: 'قارن بين مواضع اللفظ، وانتبه إلى اختلاف الواقعة والسياق قبل جمع الروايات.' },
      { title: 'مسارات الإسناد', description: 'تابع بطلب الشجرة لعرض الرواة ومسارات الروايات بصيغة Mermaid.' }
    ],
    followups: [
      {
        label: 'اعرض شجرة الأسانيد',
        prompt: 'ارسم شجرة Mermaid للأحاديث المذكورة أعلاه، مع الرواة ومراجع الروايات. اجعل النبي ﷺ في أعلى الرسم عندما تدعمه الرواية، وافصل المسارات، وأظهر أي جزء غير متاح بدل استكماله بالافتراض.',
        modelId: 'hadith-mermaid-agent',
        unifiedSkillId: 'hadith-mermaid-architect',
        task: 'isnad_graph'
      },
      {
        label: 'بسّط لي المعنى',
        prompt: 'اشرح معنى الحديث وسياقه بلغة مناسبة للتعريف بالإسلام، مع مصادر الشرح، وميّز النص المنقول عن التلخيص.',
        modelId: 'hadith-sharh-agent',
        unifiedSkillId: 'hadith-sharh-scholar',
        task: 'explanation'
      }
    ]
  },
  {
    id: 'hajj-arafah',
    modelId: 'hadith-modular-agent',
    unifiedModelId: 'bayan-unified-pilot',
    primarySkillId: 'hadith-takhrij-compare',
    track: 'research',
    task: 'compare_and_graph',
    title: 'الحج عرفة',
    category: 'الروايات وطرقها',
    icon: 'branch',
    learn: 'من سؤال عن الحج إلى رواياته ومصادره في عرض واحد.',
    research: 'استعرض التخريج المقارن وشجرة الطرق التي يعيدها النموذج.',
    question: 'حديث الحج عرفة من الكتب الستة مع رسم شجرة إسناد شاملة للجميع',
    outputs: [
      { title: 'التخريج المقارن', description: 'شاهد النص ومواضعه التي عثر عليها النموذج في نطاق الكتب الستة.' },
      { title: 'شجرة الرواية', description: 'افتح مخطط Mermaid لتتبّع المسارات والأسماء المعروضة في الإجابة.' },
      { title: 'المصدر مع المعنى', description: 'افحص عزو النصوص والأحكام، ثم تابع بسؤال عن المعنى أو ألفاظ الحديث.' }
    ],
    followups: [
      {
        label: 'قارن ألفاظ الروايات',
        prompt: 'قارن ألفاظ الروايات التي استرجعتها لهذا الحديث في جدول، مع مصدر كل لفظ، وميّز اختلاف الألفاظ عن النسخ المتكررة.',
        modelId: 'hadith-modular-agent',
        unifiedSkillId: 'hadith-takhrij-compare',
        task: 'compare'
      },
      {
        label: 'هيّئ بطاقة للتعريف',
        prompt: 'هيّئ بطاقة قصيرة للتعريف بالإسلام من هذا الحديث: النص المختار، مصدره، ومعناه المبسط من شرح موثق. لا تضف سياقًا أو حكمًا لا يدعمه المصدر.',
        modelId: 'hadith-islam-guide',
        unifiedSkillId: 'hadith-islam-guide',
        task: 'introductory_material'
      }
    ]
  },
  {
    id: 'abu-hurairah',
    modelId: 'hadith-rijal-agent',
    unifiedModelId: 'bayan-unified-pilot',
    primarySkillId: 'hadith-rijal-critic',
    track: 'research',
    task: 'narrator_network',
    title: 'رواة أبي هريرة',
    category: 'الرواة وتراجمهم',
    icon: 'person',
    learn: 'تعرّف على ناقلي الحديث، وتواريخهم، ومصادر تراجمهم.',
    research: 'افحص الرواة عن أبي هريرة في صحيح البخاري وتوسّع في أقوال النقاد.',
    question: 'من هم الرواة عن أبو هريرة في صحيح البخاري؟ اذكرهم جميعًا مع تواريخ وفاتهم',
    outputs: [
      { title: 'الرواة في الكتاب', description: 'اعرض قائمة الرواة التي تعيدها الأداة ضمن الكتاب المطلوب.' },
      { title: 'تواريخ وتراجم', description: 'راجع بيانات الترجمة وتواريخ الوفاة، وما يذكره المصدر من معلومات غير متاحة.' },
      { title: 'أقوال النقاد', description: 'توسّع بطلب الرتبة الحديثية مع نسبة الأقوال إلى أصحابها ومصادرها.' }
    ],
    followups: [
      {
        label: 'أضف الرتب ومصادرها',
        prompt: 'هل يمكنك إضافة تواريخ الوفاة والرتبة الحديثية لكل راوٍ في الجدول؟ انسب كل قول إلى صاحبه ومصدره، وأبقِ ما لا يتوفر له توثيق غير متاح.',
        modelId: 'hadith-rijal-agent',
        unifiedSkillId: 'hadith-rijal-critic',
        task: 'narrator_grades'
      },
      {
        label: 'ارسم شبكة مختصرة',
        prompt: 'اعرض شجرة إسنادية مختصرة لأبرز الرواة المذكورين، مع مصادر العلاقات، ووضّح أنها شبكة رواة في الكتاب وليست إسنادًا لحديث واحد.',
        modelId: 'hadith-rijal-agent',
        unifiedSkillId: 'hadith-rijal-critic',
        task: 'narrator_network'
      }
    ]
  }
];

export const TOPIC_JOURNEYS: Journey[] = TOPICS.map(topic => ({
  id: topic.id,
  modelId: topic.modelId,
  unifiedModelId: topic.unifiedModelId || 'bayan-unified-pilot',
  primarySkillId: topic.primarySkillId || 'hadith-islam-guide',
  track: 'islam' as TrackKind,
  task: 'introductory_material',
  title: topic.title,
  category: 'التعريف بالإسلام',
  icon: 'book',
  topic,
  learn: topic.question,
  research: topic.question,
  question: topic.question,
  outputs: [
    { title: 'الدليل', description: 'استرجع شواهد من نطاق الكتب الستة مع بيانات الكتاب والباب، وبيّن ما عُثر عليه فعليًا.' },
    { title: 'المعنى', description: 'افصل النص المنقول عن التلخيص التعريفي، وأظهر ما يحتاج إلى شرح معتمد أو مراجعة.' },
    { title: 'مادة للتعريف', description: 'حوّل الأدلة إلى مسودة تناسب جمهورك، ثم راجع مصادرها قبل مشاركتها.' }
  ],
  followups: [
    {
      label: 'بسّط المصطلحات',
      prompt: 'بسّط المصطلحات في الإجابة لقارئ يتعرف على الإسلام لأول مرة، دون إضافة نصوص أو مصادر غير مسترجعة.',
      modelId: 'hadith-islam-guide',
      unifiedSkillId: 'hadith-islam-guide',
      task: 'simplify_terms'
    },
    {
      label: 'جهّز بطاقة بالمصادر',
      prompt: 'جهّز من المادة المسترجعة بطاقة تعريفية قصيرة، وافصل النص النبوي عن التلخيص الأولي وأبقِ المصادر وحدود المراجعة ظاهرة.',
      modelId: 'hadith-islam-guide',
      unifiedSkillId: 'hadith-islam-guide',
      task: 'introductory_material'
    }
  ]
}));

export function getJourney(id: string | null | undefined): Journey | undefined {
  return [...JOURNEYS, ...TOPIC_JOURNEYS].find(item => item.id === id);
}

const FOLLOWUP_MODELS: Record<string, string[]> = {
  'prayer-call': ['hadith-mermaid-agent', 'hadith-sharh-agent'],
  'hajj-arafah': ['hadith-modular-agent', 'hadith-islam-guide'],
  'abu-hurairah': ['hadith-rijal-agent', 'hadith-rijal-agent']
};

export interface RouteOptions {
  mode?: 'legacy' | 'unified';
  submit?: boolean;
  audience?: string;
  format?: string;
  occurrenceIds?: string[];
  evidenceIds?: string[];
  routeKind?: 'all_paths' | 'specific_path';
  selectedPathId?: string;
  mentionId?: string;
  anchorName?: string;
}

export function buildJourneyContract(id: string, options: RouteOptions = {}): JourneyContract {
  const journey = getJourney(id);
  if (!journey) throw new Error(`Unknown demonstration: ${id}`);

  const isUnified = options.mode === 'unified';
  const normAud = options.audience ? normalizeAudience(options.audience).code : (journey.track === 'islam' ? 'newcomer' : undefined);
  const normFmt = options.format ? normalizeFormat(options.format).code : (journey.track === 'islam' ? 'card' : undefined);

  // Validate occurrence IDs if provided
  const occurrences = options.occurrenceIds || [];
  if (occurrences.length > 0 && journey.topic) {
    const known = (TOPIC_EVIDENCE[journey.id] || []).map(r => r.id);
    for (const occId of occurrences) {
      if (!known.includes(occId)) {
        throw new Error(`Unknown occurrence ID: ${occId} for topic ${journey.id}`);
      }
    }
  }

  return {
    version: 1,
    modelId: isUnified ? journey.unifiedModelId : journey.modelId,
    track: journey.track,
    originTrack: journey.track,
    routeKind: options.routeKind || 'all_paths',
    selectedPathId: options.selectedPathId,
    mentionId: options.mentionId,
    anchorName: options.anchorName,
    caseId: journey.id,
    topicId: journey.topic ? journey.id : undefined,
    task: journey.task,
    primarySkillId: journey.primarySkillId,
    audience: normAud,
    format: normFmt,
    language: 'ar',
    occurrenceIds: occurrences,
    evidenceIds: options.evidenceIds || [],
    reviewStatus: 'needs_review',
    submit: options.submit ?? false
  };
}

export function buildFollowupContract(id: string, index: number, options: RouteOptions = {}): JourneyContract {
  const journey = getJourney(id);
  const action = journey?.followups[index];
  if (!journey || !action) throw new Error('Unknown follow-up');

  const isUnified = options.mode === 'unified';
  const targetModel = isUnified ? 'bayan-unified-pilot' : (action.modelId || FOLLOWUP_MODELS[id]?.[index] || journey.modelId);
  const primarySkill = isUnified ? (action.unifiedSkillId || 'hadith-search-record') : (action.modelId || 'hadith-model-1');
  const followTrack: TrackKind = (action.task === 'isnad_graph' || action.task === 'compare' || action.task === 'narrator_network' || action.task === 'narrator_grades')
    ? 'research'
    : (journey.track === 'islam' ? 'islam' : journey.track);

  return {
    version: 1,
    modelId: targetModel,
    track: followTrack,
    originTrack: journey.track,
    routeKind: options.routeKind || (options.selectedPathId ? 'specific_path' : 'all_paths'),
    selectedPathId: options.selectedPathId,
    mentionId: options.mentionId,
    anchorName: options.anchorName,
    caseId: journey.id,
    topicId: journey.topic ? journey.id : undefined,
    task: action.task || 'followup',
    primarySkillId: primarySkill,
    audience: options.audience ? normalizeAudience(options.audience).code : undefined,
    format: options.format ? normalizeFormat(options.format).code : undefined,
    language: 'ar',
    occurrenceIds: options.occurrenceIds || [],
    evidenceIds: options.evidenceIds || [],
    reviewStatus: 'needs_review',
    submit: options.submit ?? false
  };
}

export function buildFollowupURL(origin: string, id: string, index: number, options: RouteOptions = {}): string {
  const journey = getJourney(id);
  const action = journey?.followups[index];
  if (!journey || !action) throw new Error('Unknown follow-up');

  const isUnified = options.mode === 'unified';
  const modelId = isUnified ? 'bayan-unified-pilot' : (action.modelId || FOLLOWUP_MODELS[id]?.[index] || journey.modelId);
  const skillTag = isUnified && action.unifiedSkillId ? `<$${action.unifiedSkillId}> ` : '';
  const occText = options.occurrenceIds && options.occurrenceIds.length > 0 ? `\nالسجل المحدد: ${options.occurrenceIds.join(', ')}` : '';
  const pathText = options.selectedPathId ? `\nمسار الإسناد المحدد: ${options.selectedPathId}` : '';
  const anchorText = options.anchorName ? `\nالراوي المستهدف للتحقيق (صاحب الضمير): ${options.anchorName}` : (options.mentionId ? `\nالراوي المستهدف: ${options.mentionId}` : '');
  const prompt = `${skillTag}الموضوع: ${journey.title}. سؤال الحالة الأصلي: ${journey.question}\nالمطلوب الآن: ${action.prompt}${occText}${pathText}${anchorText}\nهذه مسودة مستقلة ولا تتضمن نتائج المحادثة السابقة. استرجع النصوص بالأدوات وحدد occurrence_id قبل الشرح أو الرسم. إذا لم يتحدد النص المقصود فاعرض المرشحين للاختيار. اعرض ما استرجعته فقط، وأبقِ الفجوات والالتباس وحالة المراجعة ظاهرة، ولا تفترض منتهى نبويًا لكل أثر.`;
  
  const url = new URL(buildJourneyURL(origin, id, options.submit ?? false, prompt, options));
  url.searchParams.set('model', modelId);
  return url.toString();
}

export function topicQuestion(
  journey: Journey,
  audience: string = 'newcomer',
  format: string = 'card'
): string {
  const normAudience = normalizeAudience(audience);
  const normFormat = normalizeFormat(format);
  const seeds = journey.topic?.seedQueries?.join('، ') || '';

  let formatInstruction = '';
  if (normFormat.code === 'card') {
    formatInstruction = 'المطلوب: بطاقة تعريفية قصيرة: النص المختار، مصدره في كتب السنة، ومعناه الإنساني والروحي المبسط؛ دون استطراد بحثي طويل.';
  } else if (normFormat.code === 'qa') {
    formatInstruction = 'المطلوب: حوار هادئ بصيغة سؤال وجواب يوضح الإشكال أو المفهوم بلغة عصرية مستندة إلى الشاهد، دون تعقيد مصطلحي.';
  } else if (normFormat.code === 'two_minute') {
    formatInstruction = 'المطلوب: كلمة تعريفية مركزة من دقيقتين (نحو 200 كلمة) يلقيها المعرّف، تنطلق من الشاهد النبوي إلى أثره في حياة الإنسان.';
  }

  return `أريد إعداد ${normFormat.label} لجمهور: ${normAudience.label}. الموضوع: ${journey.title}. السؤال: ${journey.question}
ابدأ بجمع شاهدين مناسبين من نطاق الكتب الستة بأداة البحث. كلمات بداية مقترحة: ${seeds}. اختر شاهدين يدلان على الموضوع في سياقهما؛ استبعد المصادفة اللفظية والدعاء العارض، وبيّن سبب اختيار كل شاهد. اعرض النصوص المسترجعة ومصادرها، ثم تلخيصًا تعريفيًا واضحًا منفصلًا عنها.
${formatInstruction}
بيّن حدود البحث وما يحتاج إلى مراجعة (needs_review)، ولا تفترض وجود الموضوع في جميع الكتب أو صحة كل نتيجة.`;
}

export function buildJourneyURL(
  origin: string,
  id: string,
  submit = false,
  question?: string,
  options: RouteOptions = {}
): string {
  const journey = getJourney(id);
  if (!journey) throw new Error('Unknown demonstration');
  const url = new URL('/', origin);
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Invalid application origin');

  const model = options.mode === 'unified' ? journey.unifiedModelId : journey.modelId;
  const q = question || (journey.topic && (options.audience || options.format)
    ? topicQuestion(journey, options.audience || 'newcomer', options.format || 'card')
    : journey.question);

  const searchParams = new URLSearchParams({
    model,
    q,
    submit: String(submit),
    athar: 'chat',
    case: journey.id
  });
  if (options.audience) searchParams.set('audience', options.audience);
  if (options.format) searchParams.set('format', options.format);
  if (options.occurrenceIds && options.occurrenceIds.length > 0) {
    searchParams.set('occurrenceIds', options.occurrenceIds.join(','));
  }
  if (options.routeKind) searchParams.set('routeKind', options.routeKind);
  if (options.selectedPathId) searchParams.set('selectedPathId', options.selectedPathId);
  if (options.mentionId) searchParams.set('mentionId', options.mentionId);
  if (options.anchorName) searchParams.set('anchorName', options.anchorName);
  url.search = searchParams.toString();
  return url.toString();
}

export function buildEvidenceURL(origin: string, recordId: string, options: RouteOptions = {}): string {
  if (!Object.values(TOPIC_EVIDENCE).flat().some(r => r.id === recordId)) {
    throw new Error('Unknown evidence record');
  }
  const url = new URL('/', origin);
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Invalid application origin');

  const isUnified = options.mode === 'unified';
  const model = isUnified ? 'bayan-unified-pilot' : 'hadith-phrase-poc';
  const prompt = isUnified
    ? `افتح السجل ${recordId} باستخدام get_hadith_by_number(occurrence_id="${recordId}") واعرض نصه ومصدره وحالة المراجعة.`
    : `افتح السجل ${recordId} باستخدام open_hadith_record واعرض نصه ومصدره وحالة المراجعة.`;

  url.search = new URLSearchParams({
    model,
    q: prompt,
    submit: 'false',
    athar: 'chat'
  }).toString();
  return url.toString();
}
