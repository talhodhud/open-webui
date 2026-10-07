"""
hadith.isnad.render_mermaid
===========================
Deterministic Mermaid flowchart renderer for Isnad Graphs.
Rules:
1. Renders raw mention names with authentic labels.
2. Annotates resolved relatives and kunyas with evidence-based titles.
3. Renders ambiguous/unresolved mentions honestly without fabricated titles.
4. Outputs clean Mermaid syntax with standard class definitions.
"""

from typing import List, Dict, Any
from .graph import IsnadGraph

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
            raw_text = node.get("raw_text") or node.get("name", "")
            canonical_name = node.get("canonical_name")
            grade = node.get("grade", "غير محدد")
            status = node.get("status", "unknown")

            if kind == "prophet":
                lines.append(f'    {nid}(["{raw_text}<br/><small>خاتم الأنبياء والمرسلين</small>"]):::{status}')
            elif kind == "collection":
                lines.append(f'    {nid}["{raw_text}<br/><small>حديث {h_num}</small>"]:::{status}')
            elif raw_text in ("أبيه", "ابيه", "أبوه", "ابوه", "جده", "عمه", "خالته"):
                # Relative mention
                if node.get("identity_status") == "resolved" and canonical_name:
                    lines.append(f'    {nid}["<b>{raw_text}</b><br/><small>({canonical_name} · {grade})</small>"]:::{status}')
                else:
                    lines.append(f'    {nid}["{raw_text}<br/><small>(مبهم · الهوية تحتاج دليلاً)</small>"]:::{status}')
            elif status == "sahabi":
                lines.append(f'    {nid}["<b>{raw_text} رضي الله عنه</b><br/><small>{grade}</small>"]:::sahabi')
            elif status == "ambiguous":
                lines.append(f'    {nid}["{raw_text}<br/><small>(متعدد المرشحين يحتاج تمييزاً)</small>"]:::ambiguous')
            elif status == "unknown":
                lines.append(f'    {nid}["{raw_text}<br/><small>({grade})</small>"]:::unknown')
            else:
                lines.append(f'    {nid}["{raw_text}<br/><small>({grade})</small>"]:::{status}')

        # Render Edges
        for edge in edges:
            src = edge["source"]
            tgt = edge["target"]
            term = edge.get("transmission_term")
            if term and term != "أخرجه في مصنفه":
                lines.append(f'    {src} -->|{term}| {tgt}')
            else:
                lines.append(f'    {src} --> {tgt}')

        # Append classes
        lines.extend(CLASS_DEFINITIONS)
        return "\n".join(lines)


def render_mermaid(graph: Any) -> str:
    return MermaidRenderer.render(graph)

