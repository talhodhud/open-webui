import test from 'node:test';
import assert from 'node:assert/strict';
import { graphFromNativeChat, nativeMermaidNodeId } from './src/nativeGraph.ts';

const graph = { status: 'partial', data: { occurrence_id: 'itqan:muslim:32:8:example', paths: [{ path_id: 'p1' }, { path_id: 'p2' }], nodes: [] } };
const calls = (payload = graph, name = 'get_hadith_isnad_tree') => [
  { type: 'function_call', name, call_id: 'call1' },
  { type: 'function_call_output', call_id: 'call1', output: [{ type: 'text', text: JSON.stringify(payload) }] }
];
const response = (output = calls()) => ({ chat: { history: { currentId: 'assistant1', messages: {
  user1: { id: 'user1', role: 'user', parentId: null },
  assistant1: { id: 'assistant1', role: 'assistant', parentId: 'user1', output }
} } } });

test('reads native recorded tool output with its originating message', () => {
  const result = graphFromNativeChat(response(), ['assistant1']);
  assert.equal(result.message_id, 'assistant1');
  assert.equal(result.data.paths.length, 2);
});
test('model prose or another tool cannot impersonate graph evidence', () => {
  assert.equal(graphFromNativeChat(response(calls(graph, 'search_hadith_corpus'))), null);
  assert.equal(graphFromNativeChat(response([{ type: 'message', content: JSON.stringify(graph) }])), null);
  assert.equal(graphFromNativeChat(response(calls({ ...graph, status: 'unavailable' }))), null);
});
test('ignores alternate generated branches and invisible messages', () => {
  const r = response([]);
  r.chat.history.messages.alternate = { id: 'alternate', role: 'assistant', parentId: 'user1', output: calls() };
  assert.equal(graphFromNativeChat(r), null);
  assert.equal(graphFromNativeChat(response(), ['another-visible-message']), null);
});
test('rejects mismatched tool call IDs and tolerates corrupt history', () => {
  const output = calls(); output[1].call_id = 'other';
  assert.equal(graphFromNativeChat(response(output)), null);
  const r = response([]); r.chat.history.messages.user1.parentId = 'assistant1';
  assert.equal(graphFromNativeChat(r), null);
  assert.equal(graphFromNativeChat({}), null);
});
test('recognizes real Open WebUI Mermaid prefixes without mixing node IDs', () => {
  assert.equal(nativeMermaidNodeId('mermaid-a353553d-flowchart-NS_2-3'), 'NS_2');
  assert.equal(nativeMermaidNodeId('flowchart-N2_4_A-11'), 'N2_4_A');
  assert.equal(nativeMermaidNodeId('mermaid-a353553d-flowchart-N2_4_B-12'), 'N2_4_B');
  assert.equal(nativeMermaidNodeId('unrelated-icon'), null);
});
