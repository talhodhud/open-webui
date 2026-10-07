"""
hadith.isnad.graph
==================
Builds the canonical Directed Acyclic Graph (DAG) and enumerates complete transmission routes.
Rules:
1. Every path in 'paths' contains ONLY the nodes and edges belonging to that transmission route.
2. The overall 'nodes' and 'edges' contain the deduplicated union DAG.
3. Every mention node retains authentic source spans.
4. Compiler/Collection node has kind='collection' and source_span=None.
5. Accurately discovers all complete routes (e.g. 3 routes for Muslim 32:8 due to co-teachers).
"""

from dataclasses import dataclass, field
from typing import List, Dict, Tuple, Optional, Any
from collections import defaultdict

from .parser import ParsedIsnad, ParsedBranch, ExtractedMention, IsnadParser
from .resolver import NarratorResolver, ResolvedMention

BOOK_TITLES = {
    "bukhari": "صحيح البخاري",
    "muslim": "صحيح مسلم",
    "abudawud": "سنن أبي داود",
    "tirmidhi": "جامع الترمذي",
    "nasai": "سنن النسائي",
    "ibnmajah": "سنن ابن ماجه"
}

@dataclass
class TransmissionRoute:
    path_id: str
    description: str
    endpoint_type: str
    has_prophetic_endpoint: bool
    nodes_count: int
    edges_count: int
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

    def to_dict(self) -> Dict[str, Any]:
        return {
            "path_id": self.path_id,
            "description": self.description,
            "endpoint_type": self.endpoint_type,
            "has_prophetic_endpoint": self.has_prophetic_endpoint,
            "nodes_count": self.nodes_count,
            "edges_count": self.edges_count,
            "nodes": self.nodes,
            "edges": self.edges
        }

@dataclass
class IsnadGraph:
    book: str
    hadith_number: int
    occurrence_id: str
    chapter_title: str
    paths: List[TransmissionRoute] = field(default_factory=list)
    nodes: List[Dict[str, Any]] = field(default_factory=list)
    edges: List[Dict[str, Any]] = field(default_factory=list)
    referral_note: Optional[str] = None
    variant_notes: List[str] = field(default_factory=list)
    is_branched: bool = False

    def to_dict(self) -> Dict[str, Any]:
        return {
            "book": self.book,
            "hadith_number": self.hadith_number,
            "occurrence_id": self.occurrence_id,
            "chapter_title": self.chapter_title,
            "paths": [p.to_dict() for p in self.paths],
            "nodes": self.nodes,
            "edges": self.edges,
            "referral_note": self.referral_note,
            "variant_notes": self.variant_notes,
            "is_branched": self.is_branched
        }


class IsnadGraphBuilder:
    def __init__(self, resolver: NarratorResolver):
        self.resolver = resolver

    def build_graph(
        self,
        parsed: ParsedIsnad,
        book: str,
        hadith_number: int,
        occurrence_id: str,
        chapter_title: str = ""
    ) -> IsnadGraph:
        book_slug = (book or "").lower().strip()
        book_display = BOOK_TITLES.get(book_slug, f"كتاب {book}")

        graph = IsnadGraph(
            book=book_slug,
            hadith_number=hadith_number,
            occurrence_id=occurrence_id,
            chapter_title=chapter_title,
            referral_note=parsed.referral_note,
            variant_notes=parsed.variant_notes,
            is_branched=parsed.is_branched
        )

        all_nodes_dict: Dict[str, Dict[str, Any]] = {}
        all_edges_list: List[Dict[str, Any]] = []

        # 1. Compiler Node (Collection root/sink)
        comp_id = "COMP"
        comp_node = {
            "id": comp_id,
            "name": book_display,
            "canonical_name": book_display,
            "grade": "المصنف الإمام",
            "status": "compiler",
            "source_span": None,
            "identity_status": "resolved",
            "kind": "collection",
            "metadata_only": True,
            "occurrence_id": occurrence_id
        }
        all_nodes_dict[comp_id] = comp_node

        # 2. Prophet Node
        has_prophet = parsed.has_prophetic_endpoint
        prophet_id = "P"
        if has_prophet:
            p_node = {
                "id": prophet_id,
                "name": "رسول الله ﷺ",
                "canonical_name": "رسول الله ﷺ",
                "grade": "نبي معصوم",
                "status": "prophet",
                "source_span": list(parsed.prophetic_span) if parsed.prophetic_span else [0, 0],
                "identity_status": "resolved",
                "kind": "prophet",
                "metadata_only": parsed.prophetic_span is None,
                "occurrence_id": occurrence_id
            }
            all_nodes_dict[prophet_id] = p_node

        if parsed.is_branched:
            self._build_branched_graph(
                parsed=parsed,
                comp_node=comp_node,
                has_prophet=has_prophet,
                occurrence_id=occurrence_id,
                all_nodes_dict=all_nodes_dict,
                all_edges_list=all_edges_list,
                graph=graph
            )
        else:
            self._build_single_chain_graph(
                parsed=parsed,
                comp_node=comp_node,
                has_prophet=has_prophet,
                occurrence_id=occurrence_id,
                all_nodes_dict=all_nodes_dict,
                all_edges_list=all_edges_list,
                graph=graph
            )

        graph.nodes = list(all_nodes_dict.values())
        graph.edges = all_edges_list
        return graph

    def _build_branched_graph(
        self,
        parsed: ParsedIsnad,
        comp_node: Dict[str, Any],
        has_prophet: bool,
        occurrence_id: str,
        all_nodes_dict: Dict[str, Dict[str, Any]],
        all_edges_list: List[Dict[str, Any]],
        graph: IsnadGraph
    ):
        # Resolve stem stages in transmission order from common link upwards:
        # parsed.stem_stages[0] -> 'أبيه' (anchor is common link)
        # parsed.stem_stages[1] -> 'جده' (anchor is resolved 'أبيه')
        resolved_stages_transmission = []
        current_anchor = parsed.common_link
        for stage in parsed.stem_stages:
            if not stage:
                continue
            m = stage[0]
            r = self.resolver.resolve_mention(m, anchor_mention=current_anchor)
            resolved_stages_transmission.append((m, r))
            # The anchor for the next generation is this resolved mention
            father_name = r.canonical_name or m.raw_text
            current_anchor = ExtractedMention(
                mention_id=m.mention_id,
                raw_text=father_name,
                norm_text=IsnadParser.normalize_arabic(father_name),
                source_span=m.source_span,
                transmission_term=m.transmission_term,
                transmission_span=m.transmission_span
            )

        # In descending order (origin -> common link):
        # Prophet -> جده (NS_1) -> أبيه (NS_2) -> سعيد بن أبي بردة (common link)
        resolved_stem_nodes = []
        for idx, (m, r) in enumerate(reversed(resolved_stages_transmission)):
            nid = f"NS_{idx+1}"
            node_dict = self._create_mention_node(nid, r, occurrence_id)
            all_nodes_dict[nid] = node_dict
            resolved_stem_nodes.append(node_dict)

        # Resolve Common Link (e.g. سعيد بن أبي بردة)
        madar_id = "N_MADAR"
        r_madar = self.resolver.resolve_mention(parsed.common_link) if parsed.common_link else None
        if r_madar:
            madar_node = self._create_mention_node(madar_id, r_madar, occurrence_id)
            all_nodes_dict[madar_id] = madar_node
        else:
            madar_node = {
                "id": madar_id, "name": "مدار الإسناد", "grade": "غير محدد",
                "status": "unknown", "source_span": None, "identity_status": "unresolved",
                "kind": "mention", "occurrence_id": occurrence_id
            }
            all_nodes_dict[madar_id] = madar_node

        # Stem edges in top-down direction:
        # P -> NS_1 -> NS_2 -> N_MADAR
        stem_edges = []
        prev_id = "P" if has_prophet else None
        for s_node in resolved_stem_nodes:
            if prev_id:
                e = {
                    "edge_id": f"e_{prev_id}_{s_node['id']}",
                    "source": prev_id,
                    "target": s_node["id"],
                    "transmission_term": "عن",
                    "source_span": s_node["source_span"],
                    "occurrence_id": occurrence_id
                }
                stem_edges.append(e)
                all_edges_list.append(e)
            prev_id = s_node["id"]

        if prev_id and prev_id != madar_id:
            e = {
                "edge_id": f"e_{prev_id}_{madar_id}",
                "source": prev_id,
                "target": madar_id,
                "transmission_term": "عن",
                "source_span": madar_node["source_span"],
                "occurrence_id": occurrence_id
            }
            stem_edges.append(e)
            all_edges_list.append(e)

        # Build Branches downwards from MADAR to Compiler:
        # Each branch has stages in text order (compiler teacher -> ... -> common link teacher).
        # Top-down transmission flows: MADAR -> stage[-1] -> stage[-2] -> ... -> stage[0] -> COMP.
        branch_routes_info = []

        for b_idx, branch in enumerate(parsed.branches):
            b_label = f"b{b_idx+1}"
            # Reverse stages so they descend: common link teacher -> ... -> compiler teacher
            descending_stages = list(reversed(branch.stages))

            # Sub-paths through co-narrator combinations
            # Start from MADAR
            current_paths = [([madar_node], [])]  # list of (node_sequence, edge_sequence)

            stage_node_ids = []
            for st_idx, stage_mentions in enumerate(descending_stages):
                stage_resolved = []
                for co_idx, m in enumerate(stage_mentions):
                    nid = f"N{b_idx+1}_{st_idx+1}_{chr(65+co_idx) if len(stage_mentions) > 1 else '1'}"
                    r = self.resolver.resolve_mention(m)
                    n_dict = self._create_mention_node(nid, r, occurrence_id)
                    all_nodes_dict[nid] = n_dict
                    stage_resolved.append((nid, n_dict, m))

                # Fork current_paths across stage_resolved
                next_paths = []
                for path_nodes, path_edges in current_paths:
                    last_node = path_nodes[-1]
                    for nid, n_dict, m in stage_resolved:
                        term = "كلاهما عن" if (st_idx == 0 and last_node["id"] == madar_id) else m.transmission_term
                        e = {
                            "edge_id": f"e_{last_node['id']}_{nid}",
                            "source": last_node["id"],
                            "target": nid,
                            "transmission_term": term,
                            "source_span": list(m.transmission_span) if m.transmission_span else n_dict["source_span"],
                            "occurrence_id": occurrence_id,
                            "branch_id": b_label
                        }
                        if e not in all_edges_list:
                            all_edges_list.append(e)
                        next_paths.append((path_nodes + [n_dict], path_edges + [e]))
                current_paths = next_paths

            # Connect bottom nodes to COMP
            for path_nodes, path_edges in current_paths:
                bottom_node = path_nodes[-1]
                e_comp = {
                    "edge_id": f"e_{bottom_node['id']}_{comp_node['id']}",
                    "source": bottom_node["id"],
                    "target": comp_node["id"],
                    "transmission_term": "أخرجه في مصنفه",
                    "source_span": None,
                    "occurrence_id": occurrence_id,
                    "branch_id": b_label
                }
                if e_comp not in all_edges_list:
                    all_edges_list.append(e_comp)
                branch_routes_info.append((b_label, path_nodes[1:], path_edges + [e_comp]))

        # Enumerate Complete Transmission Routes:
        # Route = (Prophet + Stem Nodes + Branch Subpath Nodes + COMP)
        route_counter = 1
        for b_label, b_nodes, b_edges in branch_routes_info:
            route_id = f"path_{route_counter}"
            full_route_nodes = []
            if has_prophet:
                full_route_nodes.append(all_nodes_dict["P"])
            full_route_nodes.extend(resolved_stem_nodes)
            full_route_nodes.append(all_nodes_dict[madar_id])
            full_route_nodes.extend(b_nodes)
            full_route_nodes.append(comp_node)

            full_route_edges = list(stem_edges) + list(b_edges)

            # Concise description of the route
            first_teacher = b_nodes[-1]["name"] if b_nodes else ""
            desc = f"طريق {first_teacher} عن {all_nodes_dict[madar_id]['name']}"

            # Endpoint classification
            top_stem_node = resolved_stem_nodes[0] if resolved_stem_nodes else all_nodes_dict[madar_id]
            is_sahabi = top_stem_node.get("status") == "sahabi"
            if has_prophet:
                endpoint_type = "marfu" if is_sahabi else "mursal"
            else:
                endpoint_type = "mawquf" if is_sahabi else "maqtu"

            route = TransmissionRoute(
                path_id=route_id,
                description=desc,
                endpoint_type=endpoint_type,
                has_prophetic_endpoint=has_prophet,
                nodes_count=len(full_route_nodes),
                edges_count=len(full_route_edges),
                nodes=full_route_nodes,
                edges=full_route_edges
            )
            graph.paths.append(route)
            route_counter += 1

    def _build_single_chain_graph(
        self,
        parsed: ParsedIsnad,
        comp_node: Dict[str, Any],
        has_prophet: bool,
        occurrence_id: str,
        all_nodes_dict: Dict[str, Dict[str, Any]],
        all_edges_list: List[Dict[str, Any]],
        graph: IsnadGraph
    ):
        branch = parsed.branches[0] if parsed.branches else ParsedBranch("primary")
        descending_stages = list(reversed(branch.stages))

        # Flatten mentions descending: Sahabi -> ... -> Compiler teacher
        descending_mentions = []
        for stage in descending_stages:
            for m in stage:
                descending_mentions.append(m)

        route_nodes = []
        route_edges = []
        if has_prophet:
            route_nodes.append(all_nodes_dict["P"])

        prev_id = "P" if has_prophet else None
        prev_mention = None

        for idx, m in enumerate(descending_mentions):
            nid = f"N{idx+1}"
            r = self.resolver.resolve_mention(m, anchor_mention=prev_mention)
            n_dict = self._create_mention_node(nid, r, occurrence_id)
            all_nodes_dict[nid] = n_dict
            route_nodes.append(n_dict)

            if prev_id:
                e = {
                    "edge_id": f"e_{prev_id}_{nid}",
                    "source": prev_id,
                    "target": nid,
                    "transmission_term": m.transmission_term or "عن",
                    "source_span": list(m.transmission_span) if m.transmission_span else n_dict["source_span"],
                    "occurrence_id": occurrence_id
                }
                all_edges_list.append(e)
                route_edges.append(e)

            prev_id = nid
            prev_mention = m

        # Connect to COMP
        if prev_id:
            e_comp = {
                "edge_id": f"e_{prev_id}_{comp_node['id']}",
                "source": prev_id,
                "target": comp_node["id"],
                "transmission_term": "أخرجه في مصنفه",
                "source_span": None,
                "occurrence_id": occurrence_id
            }
            all_edges_list.append(e_comp)
            route_edges.append(e_comp)
            route_nodes.append(comp_node)

        # Single path route
        top_node = route_nodes[1] if (has_prophet and len(route_nodes) > 1) else (route_nodes[0] if route_nodes else comp_node)
        is_sahabi = top_node.get("status") == "sahabi"
        endpoint_type = "marfu" if (has_prophet and is_sahabi) else ("mursal" if has_prophet else ("mawquf" if is_sahabi else "maqtu"))

        single_route = TransmissionRoute(
            path_id="path_primary",
            description="سلسلة الإسناد المتصلة المباشرة",
            endpoint_type=endpoint_type,
            has_prophetic_endpoint=has_prophet,
            nodes_count=len(route_nodes),
            edges_count=len(route_edges),
            nodes=route_nodes,
            edges=route_edges
        )
        graph.paths.append(single_route)

    @staticmethod
    def _create_mention_node(nid: str, r: ResolvedMention, occurrence_id: str) -> Dict[str, Any]:
        return {
            "id": nid,
            "mention_id": r.mention.mention_id,
            "raw_text": r.mention.raw_text,
            "name": r.mention.raw_text,
            "canonical_name": r.canonical_name,
            "narrator_id": r.narrator_id,
            "grade": r.grade,
            "status": r.status,
            "identity_status": r.identity_status,
            "evidence_source": r.evidence_source,
            "resolution_rule": r.resolution_rule,
            "candidates": r.candidates,
            "source_span": list(r.mention.source_span),
            "kind": "mention",
            "occurrence_id": occurrence_id
        }
