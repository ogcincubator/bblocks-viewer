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
import {defineAsyncComponent, onMounted, ref, watch} from 'vue';
import {knownLanguages, geoJsonLanguageIds, htmlLanguageIds} from "@/models/mime-types";
import {useNavigationStore} from "@/stores/navigation";
import LanguageTabs from "@/components/bblock/LanguageTabs.vue";

const ExampleViewer = defineAsyncComponent(() => import("@/components/bblock/ExampleViewer.vue"));

const props = defineProps({
  bblock: Object,
  active: Boolean,
});

const emit = defineEmits(['switch-tab']);

const navigationStore = useNavigationStore();

const languageTabs = ref([]);
const selectedLanguageTabs = ref([]);
const expandedExamples = ref([]);

function processExamples() {
  if (!props.bblock?.examples?.length) {
    languageTabs.value = [];
    selectedLanguageTabs.value = [];
    expandedExamples.value = [];
    return;
  }

  const newLanguageTabs = [];
  const newSelectedLanguageTabs = [];
  const newExpandedExamples = [];

  props.bblock.examples.forEach((example, exampleIdx) => {
    const exampleLanguageTabs = [];
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
      exampleLanguageTabs.push(lang);
    });

    const geoJsonSnippet = example.snippets?.find(snippet => {
      const langId = snippet.language?.id;
      if (!geoJsonLanguageIds.has(langId)) return false;
      try {
        const parsed = JSON.parse(snippet.code);
        return (parsed.type === 'Feature' && parsed.geometry)
          || (parsed.type === 'FeatureCollection' && Array.isArray(parsed.features)
            && parsed.features.some(f => f.geometry != null));
      } catch {
        return false;
      }
    });
    if (geoJsonSnippet) {
      exampleLanguageTabs.push({id: 'map-view', order: -1, label: 'Map view'});
    }

    const htmlSnippet = example.snippets?.find(snippet =>
      htmlLanguageIds.has(snippet.language?.id) && /^https?:\/\//.test(snippet.url)
    );
    if (htmlSnippet) {
      exampleLanguageTabs.push({id: 'web-view', order: -1, label: 'Web view'});
    }

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

    exampleLanguageTabs.sort((a, b) =>
      a.order === b.order ? a.label.localeCompare(b.label) : a.order - b.order
    );
    newExpandedExamples.push(exampleIdx);
    newSelectedLanguageTabs[exampleIdx] = exampleLanguageTabs.find(e => e.id !== 'map-view' && e.id !== 'web-view')?.id;
    newLanguageTabs[exampleIdx] = exampleLanguageTabs;
  });

  languageTabs.value = newLanguageTabs;
  selectedLanguageTabs.value = newSelectedLanguageTabs;
  expandedExamples.value = newExpandedExamples;

  updateNavigation();
}

function scrollToExample(example) {
  const top = document.getElementById(`example-panel-${example.idx}`).getBoundingClientRect().top;
  const headerHeight = document.querySelector('header').offsetHeight;
  window.scrollTo(0, window.scrollY + top - headerHeight);
}

function updateNavigation() {
  if (props.active && props.bblock?.examples?.length) {
    navigationStore.setItems(
      props.bblock.examples.map((e, idx) => ({title: e.title, idx})),
      scrollToExample,
    );
  } else {
    navigationStore.clearItems();
  }
}

watch(() => props.bblock, processExamples, {immediate: true});
watch(() => props.active, updateNavigation);
</script>
