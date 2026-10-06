"""
Shared response contract helper for Hadith domain tools (Version 1).
Provides standardized envelope creation ensuring evidence-honest status reporting.
"""

from datetime import datetime, timezone
import json
from typing import Any, Dict, List, Optional

SCHEMA_VERSION = "1"
DATASET_VERSION = "2026-10-05-v1"

ALLOWED_STATUSES = {
    "ok",
    "no_match",
    "ambiguous",
    "unavailable",
    "invalid_reference",
    "needs_review"
}


def build_response(
    status: str,
    data: Optional[Dict[str, Any]] = None,
    evidence: Optional[Dict[str, Any]] = None,
    coverage: Optional[Dict[str, Any]] = None,
    warnings: Optional[List[str]] = None,
    dataset_version: str = DATASET_VERSION,
    retrieved_at: Optional[str] = None
) -> Dict[str, Any]:
    """
    Builds a standardized envelope conforming to Response Contract v1.
    """
    if status not in ALLOWED_STATUSES:
        raise ValueError(f"Invalid status '{status}'. Must be one of: {sorted(ALLOWED_STATUSES)}")

    return {
        "schema_version": SCHEMA_VERSION,
        "status": status,
        "data": data if data is not None else {},
        "evidence": evidence if evidence is not None else {},
        "coverage": coverage if coverage is not None else {},
        "warnings": warnings if warnings is not None else [],
        "dataset_version": dataset_version,
        "retrieved_at": retrieved_at or datetime.now(timezone.utc).isoformat()
    }


def to_json_str(payload: Dict[str, Any], indent: Optional[int] = 2) -> str:
    """Helper to dump contract response ensuring Arabic characters are preserved."""
    return json.dumps(payload, ensure_ascii=False, indent=indent)
