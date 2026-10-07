"""
hadith.isnad package
====================
Modular Isnad extraction, resolution, DAG construction, and Mermaid rendering.
Designed for general handling of:
- Tahweel [ح] (single or multiple)
- Convergence (كلاهما عن, جميعا عن, قالا عن...)
- Parallel teacher coordination (عطف الواو)
- Evidence-based relative and kunya resolution
- Separation of referral notes (نحو حديث شعبة) and exception notes (وليس في حديث...)
- Exact character offsets on authentic diacritized text
"""

from .parser import IsnadParser, ExtractedMention, ParsedIsnad
from .resolver import NarratorResolver, ResolvedMention
from .graph import IsnadGraphBuilder, IsnadGraph, TransmissionRoute
from .render_mermaid import MermaidRenderer, render_mermaid
from .validation import validate_isnad_graph

__all__ = [
    "IsnadParser",
    "ExtractedMention",
    "ParsedIsnad",
    "NarratorResolver",
    "ResolvedMention",
    "IsnadGraphBuilder",
    "IsnadGraph",
    "TransmissionRoute",
    "MermaidRenderer",
    "render_mermaid",
    "validate_isnad_graph",
]

