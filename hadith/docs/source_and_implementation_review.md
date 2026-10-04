# Review of source guides and current implementation

Checked 4 October 2026. Read-only review of existing code and data, plus bounded live API requests. No claim of a complete scholarly corpus audit or running Open WebUI integration test.

## Summary

Both AI-written Markdown files are useful discovery notes. They should not yet function as a production specification. The existing implementation is more advanced than the guide in some places, but exact identification and isnad integrity need correction before graphs are presented as verified.

## What was checked

- Both Markdown documents in full.
- Extracted text and available speaker notes from the 12-slide proposal and 31-slide template.
- The 44-page official PDF, with visual inspection of key requirements, deadlines, and evaluation pages.
- Current `hadith_engine_openwebui_tool.py` and relevant database-builder sections.
- SQLite schema, record counts, repeated identifiers, and representative records in read-only mode.
- Itqan aggregate graph structure, source documentation, and known limitations.
- Open WebUI local package version, MCP client, delegation code, and Mermaid rendering code.
- Live HadeethEnc, Dorar, and Hadith CDN requests. Results are saved in `sources/api-probe-results.json`.

## Guide corrections

| Topic | Finding | Required correction |
|---|---|---|
| HadeethEnc language count | `/languages` returned 72 entries in this probe | Replace fixed 17-language claim with discovery; verify availability per Hadith and field |
| HadeethEnc search schema | Search returned a JSON list of four results for the tested phrase | The guide's `.get('data')` assumption is wrong for this response; the newer tool already handles lists |
| Explanation selection | Both examples select the first search result | Use a verified mapping or a candidate-selection step; first result may be another narration |
| MCP transport | Local client imports `streamablehttp_client`; official docs specify native Streamable HTTP | Replace direct SSE configuration; use translation proxy only where needed |
| MCP example scope | Guide's sample server implements only `ping_server` | This proves connectivity, not Hadith integration |
| SQLite setup | Guide's setup script creates tables only | It does not download/import or validate the promised data; actual builder does more |
| Sunnah API identity | Guide equates a third-party CDN with Sunnah.com's official API | Keep separate provider names, rights, editions, and identifier crosswalks |
| Canonical numbering | “Universal” numbering is assumed | Every reference needs an explicit scheme/edition; internal identifiers are not portable |
| Itqan authority | Large counts and availability are treated as a scientific guarantee | Treat derived mappings as candidates; validate quotations and identities against approved sources |
| Graph completeness | Aggregate network is described as a complete per-Hadith chain resource | Its inspected edges contain source/target/value, without a per-Hadith evidence trail |
| Grade prompt | Guide instructs the agent to give a final Hadith grade | Report named scholarly assessments with exact scope; do not calculate a novel grade |
| “Unknown” records | Missing coverage is conflated with a scholarly unknown classification | Preserve missing data separately from an attributed judgment of جهالة |
| Licensing | “Open JSON” is presented as unrestricted use | Track code, corpus, translations, editions, and third-party rights separately |

Itqan's own local README describes incomplete grading and a derived grading engine with limitations. Its figures are maintainer claims, not independently reproduced validation. Its code-license statement does not establish redistribution rights for every upstream text and translation.

## Current implementation: blockers

### A. Identifier collision can select or modify the wrong record

In the current database, `bukhari` plus `id_in_book=1` matches **97 rows** in different chapter files. Example chapters 1, 10, and 11 have different Arabic texts but the same `hadith_id=1` and `id_in_book=1`.

Both `get_hadith_by_number` and `get_hadith_isnad_tree` query only `book` and `id_in_book`, then use `LIMIT 1`. This can return the wrong narration for the displayed number.

The CDN cache path is more serious: its `UPDATE ... WHERE book = ? AND id_in_book = ?` can update multiple unrelated rows when it executes. Existing corruption was not established; the code path is a demonstrated risk. Separate immutable imported records from provider-specific caches, and resolve the numbering crosswalk before enabling cache writes.

Do not fix this by assuming `hadith_id` is globally unique: the inspected examples show that it repeats too. Validate a composite key using source/edition/collection/chapter/entry, then map display references.

### B. Tree generation makes unsupported identity and endpoint assumptions

The code currently:

- Searches names with `LIKE` and prefers candidates graded ثقة or صدوق.
- Takes the first candidate rather than preserving identity alternatives.
- Uses a 250-character split when the matn boundary is not found.
- Processes only the first eight extracted segments.
- Forces the final segment's grade to صحابي.
- Always appends the Prophet as the endpoint.
- Returns wording suggesting the generated chain is verified.

These behaviors can misidentify narrators, truncate paths, and create unsupported connections. Missing or ambiguous data must remain visible. Source-specific extraction, path membership, and contextual identity evidence are prerequisites for a verified display.

### C. Corpus search does not rank by relevance

The current search normalizes Arabic during SQL execution and combines substring predicates with `AND`, followed by `LIMIT`. It has no relevance ordering. It returns the first 250 text characters, which may contain the chain without the matched matn.

`book='all'` searches all imported collections, not only the six books advertised in the description. Enforce an explicit collection allowlist. Add a separate indexed normalized field, exact/fuzzy/topic modes, ranking, pagination, and match-centered snippets while preserving full source text.

### D. Aggregate narrator graph is not a report-family graph

The existing `isnad_links` table records collection, source name, target name, and weight. It does not retain an occurrence/path ID or source span. The imported graph can support network exploration but cannot establish which edges form one selected Hadith's path. New occurrence-level records are needed.

### E. Explanation and scholarly judgment matching is too weak

The newer HadeethEnc tool correctly accepts list responses, but it still selects the first result. It does not prove that the explanation belongs to the selected narration.

Dorar results may discuss similar wording with different routes and judgments. The sample in the dataset guide itself contains a weak/error judgment for a particular attribution alongside other judgments. Do not collapse those into a verdict on every narration containing the same phrase.

### F. Engineering issues to address in implementation

- Blocking network/SQLite calls inside async methods can block the event loop; use an async client or explicit worker offload where appropriate.
- Use bounded timeouts, limited retries, and structured provider-error responses.
- Return source records and structured evidence, retaining original provider payloads/version information as permitted.
- Sanitize rendered labels and URLs; build interactive content from trusted templates.
- Rebuild imports into a separate versioned database and validate before switching. The current builder deletes the existing database at startup; it was not run in this review.

## Local inventory

| Table | Rows |
|---|---:|
| Hadith records | 112,979 |
| Narrator records | 115,735 |
| Aggregate isnad nodes | 660 |
| Aggregate isnad links | 2,844 |

There are 18 imported collection slugs. The six-book subset totals 34,241 rows: Bukhari 7,278; Muslim 7,408; Abu Dawud 5,276; Tirmidhi 4,053; Nasa'i 5,905; Ibn Majah 4,321. These are local row counts, not certified counts of unique Hadiths, complete editions, or verified chains.

Open WebUI's local package reports 0.11.4. The running application version, model configuration, enabled features, and live installed tool revision were not verified.

## API observations

| Request | Result |
|---|---|
| HadeethEnc `/languages` | HTTP 200, list with 72 entries |
| HadeethEnc Arabic categories | HTTP 200, list with 493 entries |
| HadeethEnc detail ID 2962 | HTTP 200, includes text, grade, attribution, explanation, hints, vocabulary, reference |
| HadeethEnc phrase search | HTTP 200, list with four items for the tested phrase |
| Dorar phrase search | HTTP 200, JSON containing `ahadith.result` HTML |
| Hadith CDN Arabic Bukhari entry 1 | HTTP 200, metadata and Hadith list |

These checks establish endpoint reachability and sample response shapes, not complete reliability, permissions, source approval, or full data correctness. The test client identified itself as `HadithResearch/0.1`; it did not require browser impersonation for the tested Dorar request. That does not guarantee other deployments will avoid rate limits or access restrictions.

The user provided the correct HadeethEnc documentation URL, `https://hadeethenc.com/api-docs/`. It returned a Postman documentation shell titled `HadeethEnc.com/API/v1`. The detailed interactive specification was not extracted. The guessed `/en/api` route returned 404 and should not be used as a documentation link.

## Recommended order of work

1. Fix record identity and disable unsafe cache behavior.
2. Preserve source provenance and judgment scope.
3. Remove unsupported graph assumptions and establish occurrence-level paths.
4. Build the declared reviewed set and test it with a specialist.
5. Add ranked retrieval and exact explanation mappings.
6. Build interactive evidence views and the two user experiences.
7. Add subagent delegation only where evaluation shows a useful benefit.

The original Markdown guides, presentations, Python implementation, and database were preserved. The product blueprint is a new planning artifact, not a silent replacement of those materials.
