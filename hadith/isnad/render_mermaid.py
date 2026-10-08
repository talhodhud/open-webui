"""
hadith.isnad.render_mermaid
===========================
Deterministic Mermaid flowchart renderer for Isnad Graphs.
Rules:
1. Renders raw mention names with authentic labels.
2. Annotates resolved relatives and kunyas with evidence-based titles.
3. Renders ambiguous/unresolved mentions honestly without fabricated titles.
4. Escapes quotes and brackets to ensure syntax-safe Mermaid flowcharts without raw HTML.
"""

import re
from typing import List, Dict, Any

CLASS_DEFINITIONS = [
    "    classDef prophet fill:#18181b,stroke:#f59e0b,stroke-width:2px,color:#fef3c7,rx:10px,ry:10px;",
    "    classDef sahabi fill:#064e3b,stroke:#10a37f,stroke-width:2px,color:#ecfdf5,rx:8px,ry:8px;",
    "    classDef reliable fill:#1e293b,stroke:#3b82f6,stroke-width:1.5px,color:#f8fafc,rx:6px,ry:6px;",
    "    classDef acceptable fill:#27272a,stroke:#71717a,stroke-width:1.5px,color:#f4f4f5,rx:6px,ry:6px;",
    "    classDef weak fill:#450a0a,stroke:#f43f5e,stroke-width:1.5px,color:#fff1f2,rx:6px,ry:6px;",
    "    classDef compiler fill:#09090b,stroke:#0ea5e9,stroke-width:2px,color:#f0f9ff,rx:8px,ry:8px;",
    "    classDef ambiguous fill:#27272a,stroke:#71717a,stroke-width:1.5px,color:#f4f4f5,rx:6px,ry:6px;",
    "    classDef unknown fill:#27272a,stroke:#52525b,stroke-width:1.5px,color:#e4e4e7,rx:6px,ry:6px;"
]

def sanitize_label(text: str) -> str:
    if not text:
        return ""
    clean = re.sub(r'<[^>]+>', ' ', text)
    clean = clean.replace('"', '#quot;').replace('[', '&#91;').replace(']', '&#93;')
    return re.sub(r'\s+', ' ', clean).strip()

class MermaidRenderer:
    @classmethod
    def render(cls, graph: Any) -> str:
        lines = ["graph TD"]

        nodes = graph.nodes if hasattr(graph, "nodes") else graph.get("nodes", [])
        edges = graph.edges if hasattr(graph, "edges") else graph.get("edges", [])
        h_num = getattr(graph, "hadith_number", None) or (graph.get("hadith_number") if isinstance(graph, dict) else "")

        # Render Nodes
        for node in nodes:
            nid = node["id"]
            kind = node.get("kind", "mention")
            raw_text = sanitize_label(node.get("raw_text") or node.get("name", ""))
            canonical_name = sanitize_label(node.get("canonical_name") or "")
            grade = sanitize_label(node.get("grade", "غير محدد"))
            status = node.get("status", "unknown")

            if kind == "prophet":
                lines.append(f'    {nid}(["{raw_text} (خاتم الأنبياء والمرسلين)"]):::{status}')
            elif kind == "collection":
                h_desc = f" (حديث {h_num})" if h_num else ""
                lines.append(f'    {nid}["{raw_text}{h_desc}"]:::{status}')
            elif raw_text in ("أبيه", "ابيه", "أبوه", "ابوه", "جده", "عمه", "خالته"):
                # Relative mention
                if node.get("identity_status") == "resolved" and canonical_name:
                    lines.append(f'    {nid}["{raw_text} ({canonical_name} · {grade})"]:::{status}')
                else:
                    lines.append(f'    {nid}["{raw_text} (مبهم · الهوية تحتاج دليلاً)"]:::unknown')
            elif status == "sahabi":
                lines.append(f'    {nid}["{raw_text} رضي الله عنه ({grade})"]:::sahabi')
            elif status == "ambiguous":
                lines.append(f'    {nid}["{raw_text} (متعدد المرشحين يحتاج تمييزاً)"]:::ambiguous')
            elif status == "unknown":
                lines.append(f'    {nid}["{raw_text} ({grade})"]:::unknown')
            else:
                lines.append(f'    {nid}["{raw_text} ({grade})"]:::{status}')

        # Render Edges
        for edge in edges:
            src = edge["source"]
            tgt = edge["target"]
            term = edge.get("transmission_term")
            if term and term != "أخرجه في مصنفه":
                clean_term = sanitize_label(term)
                lines.append(f'    {src} -->|{clean_term}| {tgt}')
            else:
                lines.append(f'    {src} --> {tgt}')

        # Append classes
        lines.extend(CLASS_DEFINITIONS)
        return "\n".join(lines)


def render_mermaid(graph: Any) -> str:
    return MermaidRenderer.render(graph)
