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
       - When scholars disagree on a hadith's authenticity (e.g. one grades it Da'if and another Hasan), clearly explain the basis of difference (e.g. presence of a contested narrator, or elevated vs. stopped chain / marfu' vs. mawquf).
    3. Output Formatting:
       - Include: Matn fragment, Sahabi (Primary Narrator), Source Book, Muhaddith (Evaluating Scholar), Degree/Ruling (Hukm), and Volume/Page reference.
       - Present the results in a clean Markdown comparison table.
    """

    def search_dorar_hadith(self, query: str, page: int = 1) -> str:
        """
        Search Dorar al-Sunniyyah hadith database to verify hadith authenticity, multi-scholar gradings, and takhrij.
        
        :param query: Part of the hadith matn (Arabic text) to search for.
        :param page: Page number for paginated results (default: 1).
        :return: JSON formatted list of hadith entries with scholars, rulings, books, and narrators.
        """
        url = f"https://dorar.net/dorar_api.json?skey={urllib.parse.quote(query)}&page={page}"
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

                return json.dumps({
                    "query": query,
                    "count": len(results),
                    "results": results
                }, ensure_ascii=False, indent=2)

        except Exception as e:
            return json.dumps({"error": f"Dorar API request failed: {str(e)}"}, ensure_ascii=False)

    def get_hadith_takhrij_summary(self, query: str) -> str:
        """
        Synthesizes multi-scholar takhrij from Dorar, categorizing scholar rulings into consensus, primary narrators, and book sources.
        
        :param query: Arabic text fragment to takhrij.
        :return: JSON formatted synthesis with consensus verdict, scholar breakdown, and primary sources.
        """
        res_json = self.search_dorar_hadith(query, page=1)
        data = json.loads(res_json)
        if "error" in data:
            return res_json

        results = data.get("results", [])
        if not results:
            return json.dumps({"message": f"No takhrij results found for '{query}'."}, ensure_ascii=False)

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

        return json.dumps({
            "query": query,
            "total_records": len(results),
            "primary_narrators": list(sahaba),
            "canonical_sources": list(books)[:10],
            "scholar_evaluations": rulings_summary
        }, ensure_ascii=False, indent=2)
