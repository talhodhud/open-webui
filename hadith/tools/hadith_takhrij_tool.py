"""
title: Hadith Takhrij & Scholar Verification Tool
author: Hadith Project
author_url: https://github.com/hadith-ksa
version: 1.0.0
description: Takhrij al-Hadith engine retrieving multi-scholar authenticity gradings, ruling degrees, source citations, and primary narrator chains via Dorar al-Sunniyyah API.
"""

import urllib.request
import urllib.parse
import urllib.error
import json
import re
from typing import Dict, Any, List, Optional
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
        REQUEST_TIMEOUT: int = Field(
            default=15,
            description="Network request timeout in seconds."
        )

    def __init__(self):
        self.valves = self.Valves()

    SYSTEM_INSTRUCTIONS = """
    # HADITH TAKHRIJ & SCHOLAR EVALUATION GUIDELINES:
    1. Primary Goal: Provide authoritative multi-scholar takhrij (تخريج الحديث) for any matn or fragment.
    2. Multi-Scholar Perspective:
       - Hadith rulings are scholarly judgments (ijtihad). Present evaluations from both classical masters (al-Bukhari, Ahmad, al-Tirmidhi, Ibn Hajar, al-Dhahabi) and contemporary verifiers (al-Albani, al-Arna'ut).
       - When scholars disagree on a hadith's authenticity (e.g. one grades it Da'if and another Hasan), clearly explain the basis of difference.
    3. Output Formatting:
       - Include: Matn fragment, Sahabi, Source Book, Muhaddith, Degree/Ruling, and Volume/Page reference.
    """

    def search_dorar_hadith(self, query: str, page: int = 1) -> str:
        """
        Search Dorar al-Sunniyyah hadith database to verify hadith authenticity, multi-scholar gradings, and takhrij.
        
        :param query: Part of the hadith matn (Arabic text) to search for.
        :param page: Page number for paginated results (default: 1).
        :return: Standardized JSON envelope with scholars, rulings, books, and narrators.
        """
        clean_q = query.strip()
        if not clean_q:
            return to_json_str(build_response(status="invalid_reference", warnings=["Search query cannot be empty."]))

        url = f"https://dorar.net/dorar_api.json?skey={urllib.parse.quote(clean_q)}&page={page}"
        try:
            req = urllib.request.Request(
                url,
                headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
            )
            with urllib.request.urlopen(req, timeout=self.valves.REQUEST_TIMEOUT) as resp:
                raw_json = json.loads(resp.read().decode("utf-8"))
                html_content = raw_json.get("ahadith", {}).get("result", "")

                hadith_blocks = html_content.split('<div class="hadith-info">')
                results = []

                for block in hadith_blocks:
                    text_match = re.search(r'class="hadith"[^>]*>(.*?)</div>', block, re.DOTALL)
                    raw_text = text_match.group(1) if text_match else ""
                    clean_text = re.sub(r'<[^>]+>', '', raw_text).strip()
                    clean_text = re.sub(r'\s+', ' ', clean_text)

                    def get_field(lbl):
                        m = re.search(r'<span class="info-subtitle">\s*' + lbl + r':?\s*</span>\s*([^<]+)', block)
                        return m.group(1).strip() if m else ""

                    rawi = get_field('الراوي')
                    muhaddith = get_field('المحدث')
                    book = get_field('المصدر')
                    page_num = get_field('الصفحة أو الرقم')
                    hukm = get_field('خلاصة حكم المحدث')

                    if clean_text or rawi or muhaddith:
                        results.append({
                            "text": clean_text,
                            "rawi": rawi,
                            "muhaddith": muhaddith,
                            "book": book,
                            "number_or_page": page_num,
                            "ruling": hukm
                        })

                if not results:
                    return to_json_str(build_response(
                        status="no_match",
                        data={"query": query, "page": page, "count": 0, "results": []},
                        warnings=["لم يعثر على نتائج مطابقة في موسوعة الدرر السنية لهذا النص."]
                    ))

                return to_json_str(build_response(
                    status="ok",
                    data={
                        "query": query,
                        "page": page,
                        "count": len(results),
                        "results": results
                    },
                    evidence={
                        "source_name": "Dorar al-Sunniyyah Hadith Encyclopedia",
                        "locator": f"https://dorar.net/hadith/search?q={urllib.parse.quote(clean_q)}",
                        "review_status": "external_multi_scholar_index"
                    }
                ))

        except Exception as e:
            return to_json_str(build_response(
                status="unavailable",
                warnings=[f"Dorar API request failed: {str(e)}. تنبيه منهجي: تعذر الاتصال بمزود الخدمة تقني، ولا يعني ضعف الحديث أو انقطاعه أو وضعه."]
            ))

    def get_hadith_takhrij_summary(self, query: str) -> str:
        """
        Synthesizes multi-scholar takhrij from Dorar, categorizing scholar rulings into consensus, primary narrators, and book sources.
        
        :param query: Arabic text fragment to takhrij.
        :return: Standardized JSON envelope with consensus verdict, scholar breakdown, and primary sources.
        """
        res_json = self.search_dorar_hadith(query, page=1)
        resp = json.loads(res_json)
        if resp.get("status") != "ok":
            return res_json

        results = resp.get("data", {}).get("results", [])
        if not results:
            return to_json_str(build_response(
                status="no_match",
                data={"query": query},
                warnings=[f"No takhrij results found for '{query}'."]
            ))

        rulings_summary = {}
        sahaba = set()
        books = set()

        for item in results:
            muhaddith = item.get("muhaddith", "Unknown")
            ruling = item.get("ruling", "Unspecified")
            book = item.get("book", "")
            rawi = item.get("rawi", "")

            if rawi:
                sahaba.add(rawi)
            if book:
                books.add(book)

            if muhaddith not in rulings_summary:
                rulings_summary[muhaddith] = []
            rulings_summary[muhaddith].append({
                "book": book,
                "ruling": ruling,
                "ref": item.get("number_or_page", "")
            })

        return to_json_str(build_response(
            status="ok",
            data={
                "query": query,
                "total_records": len(results),
                "primary_narrators": list(sahaba),
                "canonical_sources": list(books)[:10],
                "scholar_evaluations": rulings_summary
            },
            evidence={
                "source_name": "Dorar al-Sunniyyah Synthesized Rulings",
                "locator": f"https://dorar.net/hadith/search?q={urllib.parse.quote(query.strip())}"
            }
        ))
