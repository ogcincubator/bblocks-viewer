import bblockService from '@/services/bblock.service';
import {mimeTypeMatches} from '@/utils/mime-type-match';

// Module-level, not inside useViewPlugins(): the import() step must survive individual component
// unmounts and only happen once per session, mirroring how bblock.service.js keeps its own
// singleton state (registerPalette, _pluginByTypePromise) at module scope.
let pluginsPromise = null;

function loadPlugins() {
  if (!pluginsPromise) {
    pluginsPromise = bblockService.registerPromises.local.promise.then(async (register) => {
      const declared = register?.viewer?.viewPlugins ?? [];
      const loaded = await Promise.all(declared.map(async (entry) => {
        try {
          const mod = await import(/* @vite-ignore */ entry.url);
          const PluginClass = entry.export ? mod[entry.export] : mod.default;
          if (!PluginClass) {
            console.warn(`View plugin has no export named "${entry.export ?? 'default'}": ${entry.url}`);
            return null;
          }
          return {PluginClass, weight: entry.weight ?? 0};
        } catch (e) {
          console.warn(`View plugin failed to load: ${entry.url}`, e);
          return null;
        }
      }));
      return loaded.filter(Boolean);
    });
  }
  return pluginsPromise;
}

export function useViewPlugins() {
  async function matchPlugins(candidates) {
    if (!candidates?.length) return [];
    const plugins = await loadPlugins();
    const matched = [];
    for (const {PluginClass, weight} of plugins) {
      const types = PluginClass.supportedTypes ?? [];
      if (!candidates.some(c => c.type && types.some(t => mimeTypeMatches(t, c.type)))) continue;
      let instance;
      try {
        instance = new PluginClass(candidates);
        if (!(instance.matches?.() ?? true)) continue;
      } catch (e) {
        console.warn(`View plugin threw while matching: ${PluginClass.name}`, e);
        continue;
      }
      matched.push({instance, weight, PluginClass});
    }
    return matched;
  }

  return {matchPlugins};
}

// Real data shapes, mapped into the { type, content, url, label } shape plugins receive.
// See .claude/view-plugins-design.md "Candidate normalization".
//
// Note on the *Status params below: useFetchDocumentByUrl's returned reactive object
// ({ contents, loading, error, tooLarge }, see composables/bblock.js) carries no `url` field of
// its own to match against — its `contents` is only ever for whichever url its owning component
// is currently fetching (the composable nulls it out immediately on url change), so callers must
// only pass the status object that's actually fetching this exact snippet/output, not some
// unrelated one.

// One candidate per snippet; fed together as the full `candidates` array for an example.
// `currentSnippetStatus` is optional — pass it only when `snippet` is the one it's currently
// fetching (ExampleViewer's currentSnippetStatus, for the selected, non-inlined snippet); omit it
// (e.g. from BuildingBlockExamples' eager tab-list pass) to only see already-inlined content.
//
// Falls back to `snippet.language.id` verbatim when it's not one of our known slugs — for a
// language processExamples() didn't recognize, `id` is the exact raw value the register supplied
// (see BuildingBlockExamples.vue's normalization), which may itself already be a real MIME type
// for some custom format the viewer doesn't know about. This lets a register's own custom media
// types reach a view plugin without needing an entry in models/mime-types.js first. Harmless for
// recognized-but-MIME-less slugs too (plaintext, jq): a bare slug like 'plaintext' just won't
// match any real MIME pattern in a plugin's supportedTypes.
export function exampleSnippetToCandidate(snippet, currentSnippetStatus = null) {
  return {
    type: snippet.language?.mimeType ?? snippet.language?.id ?? null,
    content: snippet.code ?? currentSnippetStatus?.contents ?? null,
    url: snippet.url ?? null,
    label: snippet.language?.label ?? snippet.language?.id ?? 'unknown',
  };
}

// Single-element array — one candidate for the executed transform output. `transformEntry` is
// the entry built from `example.transformResults[transform.id]` (see BuildingBlockExamples.vue /
// ExampleViewer.vue): `{ url, success, stderr, profilesValidation }` — outputs are always fetched
// by url, never inlined, so `transformOutputStatus` (ExampleViewer's useFetchDocumentByUrl state
// for this same transformEntry.url) is the only source of `content`. Callers should skip failed
// entries (`!transformEntry.success`) entirely rather than pass them in here.
export function transformOutputToCandidate(transform, transformEntry, transformOutputStatus = null) {
  return {
    type: transform.outputs?.mediaTypes?.[0]?.mimeType ?? null,
    content: transformOutputStatus?.contents ?? null,
    url: transformEntry?.url ?? null,
    label: transform.id,
  };
}
