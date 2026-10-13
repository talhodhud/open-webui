/** Read graphs from Open WebUI's recorded tool calls, never from model prose. */
export function nativeMermaidNodeId(id: string): string | null {
  return id.match(/(?:^|-)flowchart-([a-zA-Z0-9_]+)(?:-\d+)?$/)?.[1] || null;
}

export function graphFromNativeChat(response: any, visibleMessageIds: string[] = []): any | null {
  const chat = response?.chat || response;
  const history = chat?.history;
  if (!history?.messages || !history.currentId) return null;
  const visible = new Set(visibleMessageIds);
  const branch: any[] = [];
  const seen = new Set<string>();
  let id = history.currentId;
  while (id && !seen.has(id)) {
    seen.add(id);
    const message = history.messages[id];
    if (!message) break;
    branch.push(message);
    id = message.parentId;
  }
  for (const message of branch) {
    if (message.role !== 'assistant' || (visible.size && !visible.has(message.id))) continue;
    const output = Array.isArray(message.output) ? message.output : [];
    const calls = new Set(output.filter((item: any) =>
      item.type === 'function_call' && /(?:^|[._])get_hadith_isnad_tree$/.test(item.name || '')
    ).map((item: any) => item.call_id));
    for (const item of [...output].reverse()) {
      if (item.type !== 'function_call_output' || !calls.has(item.call_id)) continue;
      const blocks = typeof item.output === 'string' ? [{ text: item.output }] : item.output;
      if (!Array.isArray(blocks)) continue;
      for (const block of blocks) {
        if (typeof block?.text !== 'string' || block.text.length > 2_000_000) continue;
        try {
          const payload = JSON.parse(block.text);
          const data = payload?.data;
          if (!['ok', 'partial'].includes(payload.status) || !data?.occurrence_id ||
              !Array.isArray(data.paths) || !data.paths.length || !Array.isArray(data.nodes)) continue;
          return { ...payload, message_id: message.id };
        } catch { /* Non-JSON outputs and failed calls contain no usable graph. */ }
      }
    }
  }
  return null;
}
