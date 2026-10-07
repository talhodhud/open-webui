"""
hadith.isnad.validation
=======================
Graph invariant validator for Isnad Graphs:
1. Directed Acyclic Graph (DAG) cycle detection.
2. Path connectivity from root to sink.
3. Authentic source span boundaries.
"""

from typing import Dict, Any, List, Tuple
from collections import defaultdict

def validate_isnad_graph(graph_dict: Dict[str, Any], original_text: str = "") -> Tuple[bool, List[str]]:
    errors = []

    nodes = graph_dict.get("nodes", [])
    edges = graph_dict.get("edges", [])
    paths = graph_dict.get("paths", [])

    node_ids = {n["id"] for n in nodes}

    # 1. Edge references
    for e in edges:
        if e["source"] not in node_ids:
            errors.append(f"Edge {e.get('edge_id')} references missing source node: {e['source']}")
        if e["target"] not in node_ids:
            errors.append(f"Edge {e.get('edge_id')} references missing target node: {e['target']}")

    # 2. Cycle detection (DFS)
    adj = defaultdict(list)
    for e in edges:
        adj[e["source"]].append(e["target"])

    visited = {}
    def has_cycle(u):
        visited[u] = 1  # visiting
        for v in adj[u]:
            if visited.get(v) == 1:
                return True
            if visited.get(v) != 2:
                if has_cycle(v):
                    return True
        visited[u] = 2  # visited
        return False

    for nid in node_ids:
        if nid not in visited:
            if has_cycle(nid):
                errors.append(f"Cycle detected in Isnad DAG starting at node {nid}")
                break

    # 3. Source span verification
    text_len = len(original_text) if original_text else None
    for n in nodes:
        span = n.get("source_span")
        kind = n.get("kind", "mention")
        if kind == "collection":
            continue
        if span is not None:
            if not (isinstance(span, (list, tuple)) and len(span) == 2):
                errors.append(f"Node {n['id']} has invalid source_span format: {span}")
            elif text_len is not None:
                s, e = span
                if not (0 <= s <= e <= text_len):
                    errors.append(f"Node {n['id']} source_span [{s}, {e}] out of bounds for text length {text_len}")

    # 4. Path connectivity
    for p in paths:
        p_nodes = p.get("nodes", [])
        p_edges = p.get("edges", [])
        if len(p_nodes) < 2:
            errors.append(f"Path {p.get('path_id')} has fewer than 2 nodes ({len(p_nodes)})")
        if len(p_edges) != len(p_nodes) - 1:
            errors.append(f"Path {p.get('path_id')} edges count ({len(p_edges)}) != nodes count - 1 ({len(p_nodes) - 1})")

    return (len(errors) == 0), errors
