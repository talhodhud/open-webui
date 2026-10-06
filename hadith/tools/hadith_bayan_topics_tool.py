"""
title: Bayan al-Sunnah: Islamic Topics & Introductory Evidence Tool
author: Hadith Project
version: 1.1.0
description: Read-only access to six reviewed introductory Islamic topics, scriptural evidence occurrences, and audience-tailored lesson formats with strict contract validation.
"""

import os
import json
from typing import Dict, Any, List, Optional
from pathlib import Path
from pydantic import BaseModel, Field

try:
    from tools.hadith_contract_helper import build_response, to_json_str
except ImportError:
    try:
        from hadith_contract_helper import build_response, to_json_str
    except ImportError:
        from datetime import datetime, timezone
        def build_response(status, data=None, evidence=None, coverage=None, warnings=None, dataset_version="2026-10-06-v1.1", retrieved_at=None):
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
        TAXONOMY_PATH: str = Field(
            default=r"c:\Users\mhdal\OneDrive\AI\Hadith KSA\planning\islam_topic_taxonomy_v1.json",
            description="Absolute path to the topic taxonomy JSON."
        )
        LESSON_PACKS_PATH: str = Field(
            default=r"c:\Users\mhdal\OneDrive\AI\Hadith KSA\planning\bayan_lesson_packs_v1.json",
            description="Absolute path to the reviewed lesson packs JSON."
        )

    def __init__(self):
        self.valves = self.Valves()
        self._taxonomy_cache = None
        self._lesson_packs_cache = None

    def _load_data(self):
        if not self._taxonomy_cache and os.path.exists(self.valves.TAXONOMY_PATH):
            try:
                with open(self.valves.TAXONOMY_PATH, "r", encoding="utf-8") as f:
                    self._taxonomy_cache = json.load(f)
            except Exception:
                pass

        if not self._lesson_packs_cache and os.path.exists(self.valves.LESSON_PACKS_PATH):
            try:
                with open(self.valves.LESSON_PACKS_PATH, "r", encoding="utf-8") as f:
                    self._lesson_packs_cache = json.load(f)
            except Exception:
                pass

    def list_islam_topics(self) -> str:
        """
        List the six introductory topics for introducing Islam with core questions and coverage.
        
        :return: Standardized JSON envelope containing topic metadata, questions, and subtopics.
        """
        self._load_data()
        if not self._taxonomy_cache:
            return to_json_str(build_response(
                status="unavailable",
                warnings=["Taxonomy database file not found or inaccessible."]
            ))

        topics_summary = []
        for t in self._taxonomy_cache.get("topics", []):
            topics_summary.append({
                "topic_id": t["id"],
                "title_ar": t["title_ar"],
                "title_en": t["title_en"],
                "initial_question_ar": t["initial_question_ar"],
                "subtopics_count": len(t.get("subtopics", [])),
                "subtopics": [st["title_ar"] for st in t.get("subtopics", [])]
            })

        return to_json_str(build_response(
            status="ok",
            data={
                "track": "Bayan al-Sunnah — Introduction to Islam",
                "topics_count": len(topics_summary),
                "topics": topics_summary
            },
            coverage={
                "curated_topics_count": len(topics_summary),
                "status": "curated_taxonomy_draft",
                "review_state": "pending_external_scholarly_signoff"
            }
        ))

    def get_topic_evidence(self, topic_id: str, audience: str = "newcomer", language: str = "ar") -> str:
        """
        Retrieve vetted scriptural Hadith evidence occurrences, attributed rulings, and vocabulary for a topic.
        
        :param topic_id: Unique topic ID: 'topic-faith', 'topic-mercy', 'topic-worship', 'topic-family', 'topic-fairness', 'topic-knowledge'.
        :param audience: Target audience: 'newcomer' (interested seeker), 'new_muslim' (newly practicing), 'educator' (teacher/mentor).
        :param language: Output language ('ar'). Other languages return status: unavailable until reviewed.
        :return: Standardized JSON envelope with verified occurrences, learning objectives, vocabulary, and sources.
        """
        # Validate language availability
        clean_lang = language.lower().strip()
        if clean_lang != "ar":
            return to_json_str(build_response(
                status="unavailable",
                data={"requested_language": language, "available_languages": ["ar"]},
                warnings=[f"اللغة '{language}' غير متاحة حالياً؛ الترجمات المعتمدة قيد الإعداد والمراجعة. المحتوى متوفر بالعربية فقط."]
            ))

        self._load_data()
        if not self._lesson_packs_cache:
            return to_json_str(build_response(
                status="unavailable",
                warnings=["Lesson packs data file not found or inaccessible."]
            ))

        clean_topic_id = topic_id.lower().strip()
        matched_topic = None
        for t in self._lesson_packs_cache.get("topics", []):
            if t["topic_id"] == clean_topic_id:
                matched_topic = t
                break

        if not matched_topic:
            valid_ids = [t["topic_id"] for t in self._lesson_packs_cache.get("topics", [])]
            return to_json_str(build_response(
                status="invalid_reference",
                data={"requested_topic_id": topic_id, "valid_topic_ids": valid_ids},
                warnings=[f"المعرف المطلوب '{topic_id}' غير صالح. المعرفات المعتمدة هي: {', '.join(valid_ids)}"]
            ))

        clean_audience = audience.lower().strip()
        if clean_audience not in ["newcomer", "new_muslim", "educator"]:
            clean_audience = "newcomer"

        learning_objective = matched_topic["learning_objectives"].get(clean_audience, matched_topic["learning_objectives"]["newcomer"])

        evidence_occurrences = []
        occurrence_ids = []
        explanation_ids = []
        claim_evidence = []
        collections_found = set()

        for occ in matched_topic.get("occurrences", []):
            occ_id = occ["occurrence_id"]
            occurrence_ids.append(occ_id)
            collections_found.add(occ["collection"])
            exp_id = occ.get("explanation_reference", {}).get("provider_id")
            if exp_id:
                explanation_ids.append(exp_id)

            claim_evidence.append({
                "passage_id": occ.get("passage_id"),
                "occurrence_id": occ_id,
                "established_principle": occ.get("selection_rationale", ""),
                "attributed_judgment": occ.get("attributed_judgment", "")
            })

            evidence_occurrences.append({
                "occurrence_id": occ_id,
                "passage_id": occ.get("passage_id"),
                "collection": occ["collection"],
                "chapter_title": occ["chapter_title"],
                "arabic_text": occ["arabic_text"],
                "text_sha256": occ["text_sha256"],
                "source_url": occ["source_url"],
                "attributed_judgment": occ["attributed_judgment"],
                "exact_quote": occ.get("exact_quote", {}),
                "explanation_reference": occ.get("explanation_reference", {}),
                "vocabulary": occ.get("vocabulary", []),
                "selection_rationale": occ.get("selection_rationale", "")
            })

        return to_json_str(build_response(
            status="ok",
            data={
                "topic_id": matched_topic["topic_id"],
                "title_ar": matched_topic["title_ar"],
                "title_en": matched_topic["title_en"],
                "initial_question": matched_topic["initial_question"],
                "audience": clean_audience,
                "learning_objective": learning_objective,
                "occurrence_ids": occurrence_ids,
                "explanation_ids": explanation_ids,
                "occurrences": evidence_occurrences,
                "claim_evidence": claim_evidence,
                "review_status": "needs_review",
                "source_verified": True,
                "scholarly_approved": False,
                "reviewer": None,
                "limitations": "مسودة أدلة منتقاة برمجياً قيد المراجعة والاعتماد العلمي المتخصص."
            },
            coverage={
                "actual_collections_in_pack": sorted(list(collections_found)),
                "occurrences_retrieved": len(evidence_occurrences),
                "honest_coverage_note": f"الشواهد مستخرجة من مجموعات: {', '.join(sorted(list(collections_found)))}; ولا يُزعم استيعاب الكتب الستة بأكملها."
            }
        ))

    def get_reviewed_lesson(self, topic_id: str, audience: str = "newcomer", format: str = "card", language: str = "ar") -> str:
        """
        Retrieve audience-tailored educational lesson content: 'card' (short card), 'qa' (Q&A), or 'two_minute' (narrative).
        
        :param topic_id: Unique topic ID: 'topic-faith', 'topic-mercy', 'topic-worship', 'topic-family', 'topic-fairness', 'topic-knowledge'.
        :param audience: Target audience: 'newcomer', 'new_muslim', or 'educator'. Default: 'newcomer'.
        :param format: Output format: 'card', 'qa', or 'two_minute'. Default: 'card'.
        :param language: Output language ('ar'). Other languages return status: unavailable until reviewed.
        :return: Standardized JSON envelope with discrete quotes, takeaway, citations, and review status.
        """
        # Validate language availability
        clean_lang = language.lower().strip()
        if clean_lang != "ar":
            return to_json_str(build_response(
                status="unavailable",
                data={"requested_language": language, "available_languages": ["ar"]},
                warnings=[f"اللغة '{language}' غير متاحة حالياً؛ الترجمات المعتمدة قيد الإعداد والمراجعة. المحتوى متوفر بالعربية فقط."]
            ))

        self._load_data()
        if not self._lesson_packs_cache:
            return to_json_str(build_response(
                status="unavailable",
                warnings=["Lesson packs data file not found or inaccessible."]
            ))

        clean_topic_id = topic_id.lower().strip()
        matched_topic = None
        for t in self._lesson_packs_cache.get("topics", []):
            if t["topic_id"] == clean_topic_id:
                matched_topic = t
                break

        if not matched_topic:
            valid_ids = [t["topic_id"] for t in self._lesson_packs_cache.get("topics", [])]
            return to_json_str(build_response(
                status="invalid_reference",
                data={"requested_topic_id": topic_id, "valid_topic_ids": valid_ids},
                warnings=[f"المعرف المطلوب '{topic_id}' غير صالح. المعرفات المعتمدة هي: {', '.join(valid_ids)}"]
            ))

        clean_audience = (audience or "").lower().strip()
        clean_format = (format or "").lower().strip()
        valid_audiences = ["newcomer", "new_muslim", "educator"]
        valid_formats = ["card", "qa", "two_minute"]

        if clean_audience not in valid_audiences or clean_format not in valid_formats:
            return to_json_str(build_response(
                status="invalid_reference",
                data={
                    "topic_id": topic_id,
                    "audience": audience,
                    "format": format,
                    "valid_audiences": valid_audiences,
                    "valid_formats": valid_formats
                },
                warnings=[f"الجمهور '{audience}' أو القالب '{format}' غير مدعوم. القيم المعتمدة للجمهور: {valid_audiences}، وللقوالب: {valid_formats}."]
            ))

        learning_objective = matched_topic["learning_objectives"].get(clean_audience, matched_topic["learning_objectives"].get("newcomer", ""))
        lesson_formats = matched_topic.get("lesson_formats", {})
        format_dict = lesson_formats.get(clean_format, {})
        if isinstance(format_dict, dict) and clean_audience in format_dict:
            format_content = format_dict[clean_audience]
        else:
            format_content = format_dict

        occurrence_ids = [occ["occurrence_id"] for occ in matched_topic.get("occurrences", [])]
        citations = [
            f"{occ['collection'].title()} — {occ['chapter_title']} ({occ['occurrence_id']})"
            for occ in matched_topic.get("occurrences", [])
        ]

        quotes = []
        if clean_format == "card":
            quotes = format_content.get("quotes", [])
        else:
            for occ in matched_topic.get("occurrences", []):
                quotes.append({
                    "occurrence_id": occ["occurrence_id"],
                    "passage_id": occ.get("passage_id"),
                    "text": f"«{occ.get('exact_quote', {}).get('arabic', '')}»",
                    "source_span": occ.get("exact_quote", {}).get("source_span", [0, 0]),
                    "citation": f"{occ['collection'].title()} — {occ['chapter_title']}"
                })

        collections_found = set(occ["collection"] for occ in matched_topic.get("occurrences", []))

        return to_json_str(build_response(
            status="needs_review",
            data={
                "topic_id": matched_topic["topic_id"],
                "lesson_id": f"lesson-{matched_topic['topic_id']}-{clean_audience}-{clean_format}",
                "title_ar": matched_topic["title_ar"],
                "audience": clean_audience,
                "learning_objective": learning_objective,
                "format": clean_format,
                "lesson_content": format_content,
                "quotes": quotes,
                "occurrence_ids": occurrence_ids,
                "citations": citations,
                "negative_exclusion_note": matched_topic.get("negative_exclusion_record", {}).get("reason", ""),
                "review_status": "needs_review",
                "source_verified": True,
                "scholarly_approved": False,
                "reviewer": None,
                "limitations": "مسودة تعليمية منتقاة مخصصة للاسترشاد؛ تتطلب مراجعة واعتماداً علمياً قبل النشر النهائي."
            },
            coverage={
                "actual_collections_in_pack": sorted(list(collections_found)),
                "occurrences_referenced": len(occurrence_ids),
                "review_state": "pedagogical_draft_pending_signoff"
            }
        ))
