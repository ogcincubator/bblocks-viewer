import {markRaw} from 'vue';
import bblockService from '@/services/bblock.service';
import configService from '@/services/config.service';
import {mimeTypeMatches} from '@/utils/mime-type-match';
import {GeoJsonMapPlugin, ThreeDPlugin, WebViewPlugin} from '@ogc/bblocks-viewer-base-plugins';

// The former hardcoded map/3D/web views, now implemented against the same plugin class contract
// as any register-declared plugin (see .claude/view-plugins-design.md "Migration path") and
// statically bundled here rather than fetched over the network. `weight: Infinity` keeps them
// sorting before any network-declared plugin regardless of that plugin's own weight, preserving
// their previous implicit "always first" tab placement without a separate order tier.
const builtinPlugins = [GeoJsonMapPlugin, ThreeDPlugin, WebViewPlugin]
  .map(PluginClass => ({PluginClass, weight: Infinity}));

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
          // `export` may be a single name (default export if unset/null/empty) or an array of
          // names, so one config entry / one url can pull in several plugin classes from a single
          // bundle (e.g. this viewer's own base-plugins package, which ships GeoJsonMapPlugin,
          // ThreeDPlugin and WebViewPlugin as named exports of one file) — the browser's module
          // cache dedupes the actual fetch regardless.
          const exportNames = Array.isArray(entry.export) && entry.export.length
            ? entry.export
            : [entry.export || null];
          return exportNames.map((name) => {
            const PluginClass = name ? mod[name] : mod.default;
            if (!PluginClass) {
              console.warn(`View plugin has no export named "${name ?? 'default'}": ${entry.url}`);
              return null;
            }
            return {PluginClass, weight: entry.weight ?? 0};
          });
        } catch (e) {
          console.warn(`View plugin failed to load: ${entry.url}`, e);
          return [];
        }
      }));
      return [...builtinPlugins, ...loaded.flat().filter(Boolean)];
    });
  }
  return pluginsPromise;
}

export function useViewPlugins() {
  // `context` is caller-supplied host information beyond the candidates themselves — currently
  // just `{ bblock }`, the bblock this candidate set belongs to. Callers only need to pass that;
  // this composable always enriches it with `viewerConfig` (configService.config, for the
  // fallback Rainbow/SPARQL endpoints GeoJsonMapPlugin's semantic popups need) before constructing
  // plugin instances, so individual call sites don't need to know configService exists. Every
  // plugin instance is therefore always constructed with a `{ bblock, viewerConfig }` context —
  // it's a plugin's own *use* of that second constructor argument that's optional, not whether the
  // host supplies it: a plugin that doesn't care simply doesn't declare the parameter, and JS
  // ignores the extra call arg.
  async function matchPlugins(candidates, context = {}) {
    if (!candidates?.length) return [];
    const fullContext = {...context, viewerConfig: configService.config};
    const plugins = await loadPlugins();
    const matched = [];
    for (const {PluginClass, weight} of plugins) {
      const types = PluginClass.supportedTypes ?? [];
      if (!candidates.some(c => c.type && types.some(t => mimeTypeMatches(t, c.type)))) continue;
      let instance;
      try {
        // markRaw: matched instances end up stored inside Vue ref()/reactive() state
        // (BuildingBlockExamples.vue's languageTabs, ExampleViewer.vue's
        // transformViewPluginMatches), which would otherwise deep-wrap the instance — including
        // any Three.js objects a plugin holds internally — in reactive Proxies. Three.js defines
        // some of its own properties (e.g. Object3D's `modelViewMatrix`) as non-configurable,
        // which a Proxy wrapper cannot legally do, throwing at the first read through the proxy.
        // markRaw prevents Vue from ever wrapping this specific object, however it's later stored.
        instance = markRaw(new PluginClass(candidates, fullContext));
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
