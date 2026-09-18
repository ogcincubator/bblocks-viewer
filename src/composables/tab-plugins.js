import {markRaw} from 'vue';
import bblockService from '@/services/bblock.service';
import configService from '@/services/config.service';
import {DependencyResolver} from '@/utils/dependency-resolver';

// See .claude/tab-plugins-design.md for the full design/rationale. The typed contract this file
// implements (TabPluginClass, TabPluginContext) lives alongside ViewPluginClass in the standalone
// https://github.com/ogcincubator/bblocks-viewer-plugin-types repo, not in this repo.

// Built-in tab ids a plugin-declared tabId must not silently shadow — see "tabId collision
// handling" in the design doc.
const BUILTIN_TAB_IDS = new Set([
  'about', 'examples', 'data-structure', 'json-schema', 'openapi',
  'dependency-list', 'ontology', 'semantic-uplift', 'validation', 'transforms',
]);

// Module-level, not inside useTabPlugins(): mirrors composables/view-plugins.js's pluginsPromise —
// the import() step must survive individual component unmounts and only happen once per session.
let pluginsPromise = null;

// One instance per session, shared with view plugins' own instance in composables/view-plugins.js
// only conceptually (each mechanism keeps its own DependencyResolver instance, since they're
// deliberately separate mechanisms — see "Relationship to view plugins" in the design doc). See
// .claude/shared-dependency-resolver-design.md.
const depResolver = new DependencyResolver();

function loadPlugins() {
  if (!pluginsPromise) {
    pluginsPromise = bblockService.registerPromises.local.promise.then(async (register) => {
      const declared = register?.viewer?.tabPlugins ?? [];
      const loaded = await Promise.all(declared.map(async (entry) => {
        try {
          const mod = await import(/* @vite-ignore */ entry.url);
          // Same array-export support as view plugins — one module can export several plugin
          // classes, each declared as its own register.json entry.
          const exportNames = Array.isArray(entry.export) && entry.export.length
            ? entry.export
            : [entry.export || null];
          return exportNames.map((name) => {
            const PluginClass = name ? mod[name] : mod.default;
            if (!PluginClass) {
              console.warn(`Tab plugin has no export named "${name ?? 'default'}": ${entry.url}`);
              return null;
            }
            return {
              PluginClass,
              weight: entry.weight ?? PluginClass.weight ?? 0,
              exportName: name || PluginClass.name,
            };
          });
        } catch (e) {
          console.warn(`Tab plugin failed to load: ${entry.url}`, e);
          return [];
        }
      }));
      return loaded.flat().filter(Boolean);
    });
  }
  return pluginsPromise;
}

// Kicks off plugin-module loading as soon as the register is available, without waiting for a
// component to ask for a match — see "Pre-load flash" in the design doc. Callers don't need the
// result; useTabPlugins().matchTabPlugins() awaits the same promise later.
export function preloadTabPlugins() {
  loadPlugins();
}

function slugify(label) {
  return label.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'tab';
}

// Deterministic collision handling: colliding plugin's export name as a suffix, then a counter if
// that still collides. See "tabId collision handling" in the design doc.
function uniqueTabId(tabId, usedIds, exportName) {
  if (!usedIds.has(tabId)) return tabId;
  const withExport = `${tabId}--${exportName}`;
  if (!usedIds.has(withExport)) return withExport;
  let i = 2;
  while (usedIds.has(`${withExport}-${i}`)) i++;
  return `${withExport}-${i}`;
}

export function useTabPlugins() {
  // context: caller-supplied host information beyond the bblock itself — currently just
  // `{ register }`. This composable enriches it with everything else the design doc's context
  // shape requires (viewerConfig, depResolver, the curated document-fetching facade) so call
  // sites only need to know about the bblock/register.
  async function matchTabPlugins(bblock, context = {}) {
    const fullContext = {
      ...context,
      bblock,
      viewerConfig: configService.config,
      depResolver,
      fetchDocument: (b, property) => bblockService.fetchDocument(b, property),
      fetchDocumentByUrl: (b, url, options) => bblockService.fetchDocumentByUrl(b, url, options),
      getBBlock: async (id) => (await bblockService.getBBlocks(true))[id],
      getBBlocks: (includeRemote) => bblockService.getBBlocks(includeRemote),
    };

    const plugins = await loadPlugins();
    const usedIds = new Set(BUILTIN_TAB_IDS);
    const matched = [];

    for (const {PluginClass, weight, exportName} of plugins) {
      if (typeof PluginClass.tabLabel !== 'string' || !PluginClass.tabLabel.trim()) {
        console.warn(`Tab plugin has no static tabLabel, skipping: ${exportName}`);
        continue;
      }

      let instance, isMatch;
      try {
        instance = markRaw(new PluginClass(fullContext));
        isMatch = await (instance.matches?.() ?? true);
      } catch (e) {
        console.warn(`Tab plugin threw while matching: ${exportName}`, e);
        continue;
      }
      if (!isMatch) continue;

      const declaredTabId = typeof PluginClass.tabId === 'string' && PluginClass.tabId.trim()
        ? PluginClass.tabId
        : slugify(PluginClass.tabLabel);
      const tabId = uniqueTabId(declaredTabId, usedIds, exportName);
      usedIds.add(tabId);

      matched.push({
        tabId,
        tabLabel: PluginClass.tabLabel,
        icon: PluginClass.icon || 'mdi-puzzle-outline',
        weight,
        cacheable: PluginClass.cacheable ?? true,
        instance,
      });
    }

    // Higher weight sorts first, matching BuildingBlockExamples.vue's view-plugin order formula.
    matched.sort((a, b) => b.weight - a.weight || a.tabLabel.localeCompare(b.tabLabel));
    return matched;
  }

  return {matchTabPlugins};
}
