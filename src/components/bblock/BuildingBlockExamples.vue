<template>
  <div>
    <v-alert v-if="bblock.semanticUplift?.additionalSteps?.length" type="info" variant="tonal" class="my-2">
      The RDF version of some or all of these examples may have require additional
      steps other than simply using a JSON-LD context.
      View <a href="#" @click.prevent="emit('switch-tab', 'semantic-uplift')" class="text-primary">Semantic uplift</a> for more information.
    </v-alert>
    <v-expansion-panels multiple v-model="expandedExamples">
      <template
        v-for="(example, exampleIdx) in bblock.examples"
        :key="exampleIdx"
      >
        <v-expansion-panel
          :value="exampleIdx"
          v-if="example.content?.length || example.snippets?.length"
          :id="`example-panel-${exampleIdx}`"
        >
          <v-expansion-panel-title>
            <a
              class="example-copy-link"
              :href="getExampleLink(exampleIdx)"
              title="Copy link to this example"
              @click.stop.prevent="copyExampleLink(exampleIdx)"
            ><v-icon>mdi-link-variant</v-icon></a>
            {{ example.title }}
            <v-spacer></v-spacer>
            <language-tabs
              v-if="$vuetify.display.mdAndUp"
              @click.stop
              :variant="($vuetify.display.lgAndUp && languageTabs[exampleIdx]?.length < 5) ? 'buttons' : 'dropdown'"
              v-model="selectedLanguageTabs[exampleIdx]"
              :languages="languageTabs[exampleIdx]"
            />
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <example-viewer
              :bblock="bblock"
              :example="example"
              :language="languageTabs[exampleIdx]?.find(l => l.id === selectedLanguageTabs[exampleIdx])"
              :source-files-url="bblock.sourceFiles"
            >
              <template #before-code v-if="!$vuetify.display.mdAndUp">
                <language-tabs v-model="selectedLanguageTabs[exampleIdx]"
                               :languages="languageTabs[exampleIdx]"
                               variant="dropdown"
                />
              </template>
            </example-viewer>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </template>
    </v-expansion-panels>
  </div>
</template>

<script setup>
import {defineAsyncComponent, nextTick, ref, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {knownLanguages, geoJsonLanguageIds} from "@/models/mime-types";
import {isSnippetOversized, MAX_FETCH_SIZE, MAX_VISUALIZATION_SIZE} from "@/utils/content-size";
import {useNavigationStore} from "@/stores/navigation";
import {copyToClipboard, debounce} from "@/lib/utils";
import LanguageTabs from "@/components/bblock/LanguageTabs.vue";
import {useViewPlugins, exampleSnippetToCandidate} from "@/composables/view-plugins";
import bblockService from "@/services/bblock.service";

const {matchPlugins} = useViewPlugins();

const ExampleViewer = defineAsyncComponent(() => import("@/components/bblock/ExampleViewer.vue"));

const props = defineProps({
  bblock: Object,
  active: Boolean,
});

const emit = defineEmits(['switch-tab']);

const navigationStore = useNavigationStore();
const route = useRoute();
const router = useRouter();

const languageTabs = ref([]);
const selectedLanguageTabs = ref([]);
const expandedExamples = ref([]);

function defaultLanguageId(exampleLanguageTabs) {
  return exampleLanguageTabs.find(e => !e.isViewPlugin)?.id;
}

async function processExamples() {
  const bblockAtStart = props.bblock;
  if (!props.bblock?.examples?.length) {
    languageTabs.value = [];
    selectedLanguageTabs.value = [];
    expandedExamples.value = [];
    return;
  }

  const newLanguageTabs = [];
  const pluginMatchPromises = [];
  const fetchPromises = [];

  // Pass 1: normalize snippet.language for every example/snippet, and eagerly fetch (under the
  // same size guards used elsewhere) any non-inlined snippet that could plausibly grow an extra
  // tab (map/3D/plugin view) — i.e. one of the geoJson-ish languages, or one carrying a canonical
  // MIME type a view plugin might match. This intentionally fetches more than the old
  // build-only-saw-inlined-content behavior, trading some extra (cached, size-guarded) network
  // requests for map/3D/plugin detection actually working on non-inlined snippets — see
  // .claude/view-plugins-design.md "Content resolution". Snippets with no plausible view (plain
  // code languages with no mimeType) are left for ExampleViewer's existing on-selection fetch.
  props.bblock.examples.forEach((example) => {
    example.snippets?.forEach(snippet => {
      let lang;
      if (typeof snippet.language === 'object') {
        lang = snippet.language;
      } else {
        if (!snippet.language) {
          snippet.language = 'plaintext';
        }
        lang = knownLanguages[snippet.language];
        if (typeof lang === 'string') {
          lang = knownLanguages[lang];
        }
        if (!lang) {
          lang = {
            id: snippet.language,
            order: 999,
            label: snippet.language,
          };
        }
        snippet.language = lang;
      }

      // Also fetch languages we don't recognize at all: `lang.id` is then the raw value the
      // register supplied verbatim, which might itself already be a real (if unlisted) MIME
      // type — see exampleSnippetToCandidate's fallback in composables/view-plugins.js.
      const isPluggableType = geoJsonLanguageIds.has(lang.id) || !!lang.mimeType || !knownLanguages[lang.id];
      if (isPluggableType && snippet.code == null && snippet.url && !isSnippetOversized(snippet, MAX_VISUALIZATION_SIZE)) {
        fetchPromises.push(
          bblockService.fetchDocumentByUrl(props.bblock, snippet.url, {maxSize: MAX_FETCH_SIZE})
            .then(text => { snippet.code = text; })
            .catch(() => { /* leave code null — falls back to ExampleViewer's on-selection fetch */ })
        );
      }
    });
  });

  await Promise.all(fetchPromises);
  if (props.bblock !== bblockAtStart) return; // bblock changed while fetching — discard

  // Pass 2: build the actual tab list, now that plausible snippets have real content to inspect.
  props.bblock.examples.forEach((example, exampleIdx) => {
    const exampleLanguageTabs = example.snippets?.map(s => s.language) ?? [];

    if (props.bblock.transforms?.length) {
      const transformEntries = [];
      props.bblock.transforms.forEach(transform => {
        example.snippets?.forEach((snippet, snippetIdx) => {
          const result = snippet.transformResults?.[transform.id];
          if (result != null) {
            const isLegacy = typeof result === 'string';
            transformEntries.push({
              transform,
              snippet,
              snippetIdx,
              url: isLegacy ? result : (result.url || null),
              success: isLegacy ? true : (result.success ?? true),
              stderr: isLegacy ? null : (result.stderr || null),
              profilesValidation: isLegacy ? null : (result.profilesValidation || null),
            });
          }
        });
      });
      const snippetsPerTransform = {};
      transformEntries.forEach(e => {
        snippetsPerTransform[e.transform.id] = (snippetsPerTransform[e.transform.id] || 0) + 1;
      });
      transformEntries.sort((a, b) => {
        const idCmp = a.transform.id.localeCompare(b.transform.id);
        return idCmp !== 0 ? idCmp : a.snippetIdx - b.snippetIdx;
      });
      transformEntries.forEach(e => {
        const needsDisambiguation = snippetsPerTransform[e.transform.id] > 1;
        const label = needsDisambiguation
          ? `${e.transform.id} (${e.snippet.language?.label || e.snippetIdx + 1})`
          : e.transform.id;
        exampleLanguageTabs.push({
          id: `transform:${e.snippetIdx}-${e.transform.id}`,
          order: 9999,
          label,
          icon: 'mdi-file-swap',
          hasError: !e.success,
          isTransform: true,
          transform: e.transform,
          transformEntry: e,
        });
      });
    }

    // View plugins: candidates now carry real content for every "pluggable-type" snippet fetched
    // in pass 1 above, not just build-inlined ones. A snippet with no plausible MIME type (plain
    // code languages) is still only fetched lazily, on tab selection, by ExampleViewer.
    const candidates = (example.snippets ?? []).map(s => exampleSnippetToCandidate(s));
    pluginMatchPromises.push(
      matchPlugins(candidates, {bblock: props.bblock}).then(matched => {
        matched.forEach(({instance, weight, PluginClass}, i) => {
          exampleLanguageTabs.push({
            id: `plugin:${exampleIdx}:${PluginClass.name || 'plugin'}:${i}`,
            // Sits before code tabs (order >= 0); higher weight sorts earlier. Built-in plugins
            // (map/3D/web) carry weight: Infinity (see composables/view-plugins.js), so they
            // always sort first, same implicit priority they had before being migrated onto the
            // plugin mechanism.
            order: -0.5 - (weight ?? 0) / 1e6,
            label: PluginClass.viewName ?? PluginClass.name ?? 'Custom view',
            icon: PluginClass.icon ?? 'mdi-puzzle-outline',
            isViewPlugin: true,
            pluginInstance: instance,
          });
        });
      })
    );

    newLanguageTabs[exampleIdx] = exampleLanguageTabs;
  });

  await Promise.all(pluginMatchPromises);
  if (props.bblock !== bblockAtStart) return; // bblock changed while matching plugins — discard

  const newSelectedLanguageTabs = [];
  const newExpandedExamples = [];
  newLanguageTabs.forEach((exampleLanguageTabs, exampleIdx) => {
    exampleLanguageTabs.sort((a, b) =>
      a.order === b.order ? a.label.localeCompare(b.label) : a.order - b.order
    );
    newExpandedExamples.push(exampleIdx);
    newSelectedLanguageTabs[exampleIdx] = defaultLanguageId(exampleLanguageTabs);
  });

  languageTabs.value = newLanguageTabs;
  selectedLanguageTabs.value = newSelectedLanguageTabs;
  expandedExamples.value = newExpandedExamples;

  updateNavigation();
  processRouteTarget();
}

function scrollToExample(example) {
  const panel = document.getElementById(`example-panel-${example.idx}`);
  if (!panel) {
    console.warn(`scrollToExample: no panel found for example index ${example.idx}`);
    return;
  }
  const top = panel.getBoundingClientRect().top;
  const headerHeight = document.querySelector('header').offsetHeight;
  const targetY = window.scrollY + top - headerHeight;
  if (Math.abs(targetY - window.scrollY) < 2) {
    return;
  }
  window.scrollTo(0, targetY);
}

function parseRouteRest(rest) {
  const match = /^example-(\d+)$/.exec(rest?.[0] ?? '');
  if (!match) {
    return null;
  }
  return {idx: parseInt(match[1], 10) - 1, language: rest[1] || null};
}

function exampleRouteLocation(exampleIdx, language) {
  const rest = [`example-${exampleIdx + 1}`];
  if (language) {
    rest.push(language);
  }
  return {
    name: 'BuildingBlock',
    params: {id: props.bblock.itemIdentifier, section: 'examples', rest},
  };
}

async function processRouteTarget() {
  if (!props.active) {
    return;
  }
  const target = parseRouteRest(route.params.rest);
  if (!target || !props.bblock?.examples?.[target.idx]) {
    return;
  }
  const {idx, language} = target;
  if (!expandedExamples.value.includes(idx)) {
    expandedExamples.value.push(idx);
  }
  if (language && languageTabs.value[idx]?.some(l => l.id === language)) {
    selectedLanguageTabs.value[idx] = language;
  } else {
    // Sidebar links carry no language segment — fall back to this example's default tab.
    selectedLanguageTabs.value[idx] = defaultLanguageId(languageTabs.value[idx] ?? []);
  }
  await nextTick();
  settleScrollToExample(idx);
}

// On a fresh page load, the layout above this panel keeps shifting for a while after our
// first scroll — async component chunks, the register/bblock fetch, per-snippet lazy content
// fetches, etc. all still resolving. There's no single "everything is loaded" event to wait
// for, so instead we re-scroll whenever the page's height changes, stopping once things have
// been quiet for a bit (with a generous absolute cap for pathological cases), and back off
// immediately if the user starts scrolling/interacting themselves.
const QUIET_PERIOD = 1500;
const HARD_CEILING = 15000;
let activeSettle = null;

function settleScrollToExample(idx) {
  activeSettle?.cleanup();

  let quietTimer;
  const cleanup = () => {
    observer.disconnect();
    clearTimeout(quietTimer);
    clearTimeout(ceilingTimer);
    window.removeEventListener('wheel', cleanup);
    window.removeEventListener('touchmove', cleanup);
    window.removeEventListener('keydown', cleanup);
    activeSettle = null;
  };
  window.addEventListener('wheel', cleanup, {passive: true});
  window.addEventListener('touchmove', cleanup, {passive: true});
  window.addEventListener('keydown', cleanup);

  const debouncedScroll = debounce(() => scrollToExample({idx}), 50);
  const observer = new ResizeObserver(() => {
    debouncedScroll();
    clearTimeout(quietTimer);
    quietTimer = setTimeout(cleanup, QUIET_PERIOD);
  });
  observer.observe(document.body);
  quietTimer = setTimeout(cleanup, QUIET_PERIOD);
  const ceilingTimer = setTimeout(cleanup, HARD_CEILING);

  activeSettle = {cleanup};
  scrollToExample({idx});
}

watch(() => route.params.rest, processRouteTarget);

function getExampleLink(exampleIdx) {
  const resolved = router.resolve(exampleRouteLocation(exampleIdx, selectedLanguageTabs.value[exampleIdx]));
  return window.location.origin + resolved.href;
}

function copyExampleLink(exampleIdx) {
  copyToClipboard(getExampleLink(exampleIdx));
}

function updateNavigation() {
  if (props.active && props.bblock?.examples?.length) {
    navigationStore.setItems(
      props.bblock.examples.map((e, idx) => ({
        title: e.title,
        idx,
        to: exampleRouteLocation(idx, null),
      })),
      scrollToExample,
    );
  } else {
    navigationStore.clearItems();
  }
}

watch(() => props.bblock, processExamples, {immediate: true});
watch(() => props.active, (v) => {
  updateNavigation();
  if (v) {
    processRouteTarget();
  }
});
</script>
<style scoped lang="scss">
.example-copy-link {
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  max-width: 0;
  opacity: 0;
  transition: max-width 0.2s ease, opacity 0.2s ease, margin-right 0.2s ease;
  text-decoration: none;
  color: inherit;
}

.v-expansion-panel-title:hover .example-copy-link,
.example-copy-link:focus {
  max-width: 1.5em;
  opacity: 1;
  margin-right: 0.25em;
}
</style>
