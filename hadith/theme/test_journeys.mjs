import test from 'node:test';
import assert from 'node:assert/strict';
import {
  JOURNEYS,
  TOPIC_JOURNEYS,
  topicQuestion,
  buildJourneyURL,
  buildFollowupURL,
  buildEvidenceURL,
  buildJourneyContract,
  buildFollowupContract,
  normalizeAudience,
  normalizeFormat,
  getJourney,
  AUDIENCE_MAP,
  FORMAT_MAP
} from './src/journeys.ts';
import { TOPIC_EVIDENCE } from './src/topicEvidence.ts';

test('three demonstrations route to legacy baseline presets by default and support unified mode', () => {
  // Legacy baseline models
  assert.deepEqual(
    new Set(JOURNEYS.map(j => j.modelId)),
    new Set(['hadith-model-1', 'hadith-modular-agent', 'hadith-rijal-agent'])
  );

  for (const item of JOURNEYS) {
    // Legacy route verification
    const urlLegacy = new URL(buildJourneyURL('http://localhost:8080/c/existing', item.id));
    assert.equal(urlLegacy.pathname, '/');
    assert.equal(urlLegacy.searchParams.get('model'), item.modelId);
    assert.equal(urlLegacy.searchParams.get('q'), item.question);
    assert.equal(urlLegacy.searchParams.get('submit'), 'false');
    assert.equal(urlLegacy.searchParams.get('case'), item.id);
    assert.equal(urlLegacy.searchParams.get('athar'), 'chat');

    // Unified contract verification
    const contract = buildJourneyContract(item.id, { mode: 'unified' });
    assert.equal(contract.version, 1);
    assert.equal(contract.modelId, 'bayan-unified-pilot');
    assert.equal(contract.caseId, item.id);
    assert.equal(contract.submit, false);
    assert.equal(contract.reviewStatus, 'needs_review');
    assert.ok(contract.primarySkillId.startsWith('hadith-'));

    // Unified URL verification
    const urlUnified = new URL(buildJourneyURL('http://localhost:8080', item.id, false, undefined, { mode: 'unified' }));
    assert.equal(urlUnified.searchParams.get('model'), 'bayan-unified-pilot');
  }
});

test('candidate evidence opens only a known stable ID in legacy and unified models', () => {
  for (const r of Object.values(TOPIC_EVIDENCE).flat()) {
    // Legacy URL uses hadith-phrase-poc and open_hadith_record
    const urlLegacy = new URL(buildEvidenceURL('http://localhost:8080', r.id));
    assert.equal(urlLegacy.searchParams.get('model'), 'hadith-phrase-poc');
    assert.equal(urlLegacy.searchParams.get('submit'), 'false');
    assert.ok(urlLegacy.searchParams.get('q').includes(r.id));
    assert.ok(urlLegacy.searchParams.get('q').includes('open_hadith_record'));

    // Unified URL uses bayan-unified-pilot and get_hadith_by_number(occurrence_id=...)
    const urlUnified = new URL(buildEvidenceURL('http://localhost:8080', r.id, { mode: 'unified' }));
    assert.equal(urlUnified.searchParams.get('model'), 'bayan-unified-pilot');
    assert.equal(urlUnified.searchParams.get('submit'), 'false');
    assert.ok(urlUnified.searchParams.get('q').includes(r.id));
    assert.ok(urlUnified.searchParams.get('q').includes('get_hadith_by_number'));
  }
  assert.throws(() => buildEvidenceURL('http://localhost:8080', 'invented-record'));
});

test('only explicit live-demo action requests native auto-submit', () => {
  assert.equal(new URL(buildJourneyURL('http://localhost:8080', JOURNEYS[0].id, true)).searchParams.get('submit'), 'true');
  assert.equal(new URL(buildJourneyURL('http://localhost:8080', JOURNEYS[0].id, false)).searchParams.get('submit'), 'false');
  assert.equal(new URL(buildJourneyURL('http://localhost:8080', JOURNEYS[0].id)).searchParams.get('submit'), 'false');
});

test('unknown case and executable origin rejected', () => {
  assert.equal(getJourney('invented'), undefined);
  assert.throws(() => buildJourneyURL('http://localhost:8080', 'invented'));
  assert.throws(() => buildJourneyURL('javascript:alert(1)', JOURNEYS[0].id));
  assert.throws(() => buildJourneyURL('data:text/html,bad', JOURNEYS[0].id));
});

test('all six subject cards are derived from semantic packs with negative exclusion', () => {
  assert.equal(TOPIC_JOURNEYS.length, 6);

  for (const item of TOPIC_JOURNEYS) {
    assert.equal(item.topic.mappingStatus, 'semantic_pack_derived');
    assert.equal(item.topic.reviewStatus, 'needs_review');
    assert.equal(item.topic.sourceVerified, true);
    assert.equal(item.topic.scholarlyApproved, false);
    assert.ok(item.topic.chapterTitles.length > 0);

    // Negative exclusion rule check for faith topic
    if (item.id === 'topic-faith') {
      const hasClash = item.topic.chapterTitles.some(t => t.includes('الأيمان والنذور'));
      assert.equal(hasClash, false, 'topic-faith must exclude كتاب الأيمان والنذور');
    }
  }
});

test('54 combinations of topic x audience x format satisfy the typed contract without forced tahqiq reports', () => {
  const audiences = ['newcomer', 'new_muslim', 'educator'];
  const formats = ['card', 'qa', 'two_minute'];
  let count = 0;

  for (const item of TOPIC_JOURNEYS) {
    for (const aud of audiences) {
      for (const fmt of formats) {
        count++;
        // Contract test
        const contract = buildJourneyContract(item.id, {
          mode: 'unified',
          audience: aud,
          format: fmt
        });

        assert.equal(contract.version, 1);
        assert.equal(contract.modelId, 'bayan-unified-pilot');
        assert.equal(contract.track, 'islam');
        assert.equal(contract.topicId, item.id);
        assert.equal(contract.task, 'introductory_material');
        assert.equal(contract.primarySkillId, 'hadith-islam-guide');
        assert.equal(contract.audience, aud);
        assert.equal(contract.format, fmt);
        assert.equal(contract.language, 'ar');
        assert.equal(contract.reviewStatus, 'needs_review');
        assert.equal(contract.submit, false);

        // Prompt test
        const qPrompt = topicQuestion(item, aud, fmt);
        assert.ok(qPrompt.includes(item.title));
        assert.ok(qPrompt.includes(item.question));
        assert.ok(qPrompt.includes(AUDIENCE_MAP[aud].label));
        assert.ok(qPrompt.includes(FORMAT_MAP[fmt].label));
        assert.ok(qPrompt.includes('needs_review'));

        // Format variation check (U06): no forced tree or 7-section report
        assert.equal(qPrompt.includes('شجرة أسانيد شاملة للجميع'), false);
        assert.equal(qPrompt.includes('تقرير التحقيق المطول'), false);

        if (fmt === 'card') {
          assert.ok(qPrompt.includes('بطاقة تعريفية قصيرة'));
        } else if (fmt === 'qa') {
          assert.ok(qPrompt.includes('حوار هادئ بصيغة سؤال وجواب'));
        } else if (fmt === 'two_minute') {
          assert.ok(qPrompt.includes('كلمة تعريفية مركزة من دقيقتين'));
        }
      }
    }
  }

  assert.equal(count, 54, 'Exactly 54 combinations tested');
});

test('specialist follow-ups preserve occurrence identity and route explicitly', () => {
  // Test baseline routing
  for (const [id, index, legacyModel, unifiedSkill] of [
    ['prayer-call', 0, 'hadith-mermaid-agent', 'hadith-mermaid-architect'],
    ['prayer-call', 1, 'hadith-sharh-agent', 'hadith-sharh-scholar'],
    ['hajj-arafah', 0, 'hadith-modular-agent', 'hadith-takhrij-compare'],
    ['hajj-arafah', 1, 'hadith-islam-guide', 'hadith-islam-guide'],
    ['abu-hurairah', 0, 'hadith-rijal-agent', 'hadith-rijal-critic'],
    ['abu-hurairah', 1, 'hadith-rijal-agent', 'hadith-rijal-critic']
  ]) {
    // Legacy follow-up URL
    const urlLegacy = new URL(buildFollowupURL('http://localhost:8080', id, index));
    assert.equal(urlLegacy.searchParams.get('model'), legacyModel);
    assert.equal(urlLegacy.searchParams.get('submit'), 'false');
    assert.ok(urlLegacy.searchParams.get('q').includes('لا تتضمن نتائج المحادثة السابقة'));

    // Unified follow-up contract
    const contract = buildFollowupContract(id, index, { mode: 'unified' });
    assert.equal(contract.version, 1);
    assert.equal(contract.modelId, 'bayan-unified-pilot');
    assert.equal(contract.primarySkillId, unifiedSkill);
    assert.equal(contract.submit, false);
  }

  assert.throws(() => buildFollowupURL('http://localhost:8080', 'prayer-call', 9));
});

test('validation rejects invalid audience, format, or invented occurrence ID', () => {
  assert.throws(() => normalizeAudience('invented_audience'), /Invalid audience/);
  assert.throws(() => normalizeFormat('invented_format'), /Invalid format/);
  assert.throws(
    () => buildJourneyContract('topic-faith', { occurrenceIds: ['invented:bukhari:999:999:0000'] }),
    /Unknown occurrence ID/
  );
});

test('evidence records retain source verification without asserting scholarly approval', () => {
  for (const [topicId, records] of Object.entries(TOPIC_EVIDENCE)) {
    assert.ok(records.length > 0, `Topic ${topicId} has evidence records`);
    for (const r of records) {
      assert.equal(r.review_status, 'needs_review');
      assert.equal(r.source_verified, true);
      assert.equal(r.scholarly_approved, false);
      assert.ok(r.text.length > 0);
      assert.ok(r.sha256.length === 64);
    }
  }
});
