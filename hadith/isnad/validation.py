"""
hadith.isnad.validation
=======================
Graph invariant validator for Isnad Graphs:
1. Directed Acyclic Graph (DAG) cycle detection.
2. Path connectivity from root to sink (strictly connected walks).
3. Authentic source span boundaries for textual nodes.
4. Non-empty graph enforcement when representing isnads.
"""

from typing import Dict, Any, List, Tuple
from collections import defaultdict

def validate_isnad_graph(graph_dict: Dict[str, Any], original_text: str = "") -> Tuple[bool, List[str]]:
    errors = []

    nodes = graph_dict.get("nodes", [])
    edges = graph_dict.get("edges", [])
    paths = graph_dict.get("paths", [])

    # 1. Non-empty graph check
    if not nodes:
        errors.append("Graph contains no nodes.")
    if not paths:
        errors.append("Graph contains no transmission paths.")

    if not nodes or not paths:
        return False, errors

    node_ids = {n["id"] for n in nodes}

    # 2. Edge references
    for e in edges:
        if e["source"] not in node_ids:
            errors.append(f"Edge {e.get('edge_id')} references missing source node: {e['source']}")
        if e["target"] not in node_ids:
            errors.append(f"Edge {e.get('edge_id')} references missing target node: {e['target']}")

    # 3. Cycle detection (DFS)
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

    # 4. Source span verification
    text_len = len(original_text) if original_text else None
    for n in nodes:
        span = n.get("source_span")
        kind = n.get("kind", "mention")
        is_metadata = n.get("metadata_only", False)
        if kind == "collection" or is_metadata:
            continue
        if span is not None:
            if not (isinstance(span, (list, tuple)) and len(span) == 2):
                errors.append(f"Node {n['id']} has invalid source_span format: {span}")
            else:
                s, e = span
                if s == 0 and e == 0 and text_len and text_len > 0:
                    errors.append(f"Node {n['id']} has empty source_span [0, 0] for non-empty text")
                elif text_len is not None and not (0 <= s <= e <= text_len):
                    errors.append(f"Node {n['id']} source_span [{s}, {e}] out of bounds for text length {text_len}")

    # 5. Path connectivity and sequential walk
    for p in paths:
        p_nodes = p.get("nodes", [])
        p_edges = p.get("edges", [])
        p_id = p.get("path_id", "unknown_path")
        if len(p_nodes) < 2:
            errors.append(f"Path {p_id} has fewer than 2 nodes ({len(p_nodes)})")
            continue
        if len(p_edges) != len(p_nodes) - 1:
            errors.append(f"Path {p_id} edges count ({len(p_edges)}) != nodes count - 1 ({len(p_nodes) - 1})")

        # Check sequential connectivity between consecutive nodes in the path
        edge_pairs = set()
        for e in p_edges:
            edge_pairs.add((e["source"], e["target"]))
            edge_pairs.add((e["target"], e["source"]))

        for i in range(len(p_nodes) - 1):
            u_id = p_nodes[i]["id"]
            v_id = p_nodes[i + 1]["id"]
            if (u_id, v_id) not in edge_pairs:
                errors.append(f"Path {p_id} is disconnected: no edge connects consecutive nodes {u_id} and {v_id}")
                break

    return (len(errors) == 0), errors
