<template>
  <v-container v-if="example.content || example.snippets?.length" class="px-0 mx-0" fluid>

    <!-- Transform view -->
    <template v-if="isTransformView">
      <div class="transform-header mb-1">
        <div class="transform-type-chip">
          <v-icon v-if="!language.transformEntry.success" color="error" class="mr-1">mdi-alert-circle</v-icon>
          <v-tooltip v-if="language.transform.type" text="Type of this transform">
            <template #activator="{ props: tooltipProps }">
              <v-chip v-bind="tooltipProps" size="small" variant="flat"
                      :color="getTypeColor(language.transform.type)">
                {{ language.transform.type }}
              </v-chip>
            </template>
          </v-tooltip>
        </div>
        <span v-if="language.transform.description" class="text-body-2">{{ language.transform.description }}</span>
      </div>
      <div class="mb-2">
        <v-btn size="small" variant="text" class="px-1"
               :append-icon="showTransformDetails ? 'mdi-chevron-up' : 'mdi-chevron-down'"
               @click="showTransformDetails = !showTransformDetails">
          {{ showTransformDetails ? 'Show less' : 'Show more' }}
        </v-btn>
      </div>
      <v-expand-transition>
        <transform-info v-if="showTransformDetails"
                        :transform="language.transform"
                        :show-description="false"
                        :show-type="false"
                        class="mb-3"
        />
      </v-expand-transition>
      <v-row>
        <v-col cols="12" md="6" class="d-flex flex-column">
          <p class="text-subtitle-1 font-weight-medium">Original ({{ language.transformEntry.snippet.language?.label || 'unknown' }})</p>
          <div class="flex-grow-1" style="max-height: 30em; overflow-y: auto; font-size: 90%">
            <code-viewer
              :code="language.transformEntry.snippet.code"
              :language="language.transformEntry.snippet.language?.id"
            />
          </div>
          <div class="d-flex justify-end mt-1">
            <copy-to-clipboard-button :text="language.transformEntry.snippet.code" color="primary" variant="flat">Copy to clipboard</copy-to-clipboard-button>
          </div>
        </v-col>
        <v-col cols="12" md="6" class="d-flex flex-column">
          <p class="text-subtitle-1 font-weight-medium">Transformed ({{ getMediaTypeLabel(language.transform.outputs?.mediaTypes) }})</p>
          <div class="flex-grow-1" style="max-height: 30em; overflow-y: auto; font-size: 90%">
            <template v-if="!language.transformEntry.success">
              <v-alert type="error" class="mb-2">An error occurred running this transform</v-alert>
              <pre v-if="language.transformEntry.stderr" class="text-caption text-error pa-2"
                   style="overflow-x: auto; white-space: pre-wrap">{{ language.transformEntry.stderr }}</pre>
            </template>
            <template v-else>
              <div class="text-center" v-if="transformOutputStatus.loading">
                <v-progress-circular indeterminate color="primary" size="64" />
              </div>
              <code-viewer
                v-else-if="!transformOutputStatus.error && transformOutputStatus.contents"
                :code="transformOutputStatus.contents"
                :language="language.transform.outputs?.mediaTypes?.[0]?.id"
              />
              <v-alert v-else-if="transformOutputStatus.error" type="error">
                Error loading transform output
              </v-alert>
            </template>
          </div>
          <div class="d-flex justify-end mt-1" v-if="language.transformEntry.success && transformOutputStatus.contents">
            <copy-to-clipboard-button :text="transformOutputStatus.contents" color="primary" variant="flat">Copy to clipboard</copy-to-clipboard-button>
          </div>
        </v-col>
      </v-row>
    </template>

    <!-- Normal snippet / map view -->
    <v-row v-else>
      <v-col cols="12" :md="example.snippets?.length ? 6 : 12" v-if="showContentSidebar">
        <MarkdownText class="example-content" :content="example.content" :base-url="sourceFilesUrl"></MarkdownText>
        <div v-if="currentSnippetRemote">
          This snippet was retrieved from <a :href="currentSnippet.ref" target="_blank">{{ currentSnippet.ref }}</a>.
        </div>
      </v-col>
      <v-col cols="12" :md="showContentSidebar ? 6 : 12" v-if="example.snippets?.length">
        <template v-if="isMapView && geoJsonData">
          <geo-json-map-viewer :geojson="geoJsonData" :ld-context="bblock.ldContext"></geo-json-map-viewer>
        </template>
        <template v-else-if="currentSnippet">
          <slot name="before-code"></slot>
          <div style="max-height: 30em; overflow-y: auto">
            <code-viewer
              :code="currentSnippet.highlighted || currentSnippet.code"
              :raw-code="currentSnippet.highlighted"
              :language="currentSnippet.language.highlight || currentSnippet.language.id"
              @highlight="currentSnippet.highlighted = $event"
            >
            </code-viewer>
          </div>
          <div class="d-flex mt-2">
            <v-spacer></v-spacer>
            <v-btn
              v-if="currentSnippet"
              @click="fullscreen = true"
              prepend-icon="mdi-fullscreen"
              class="ml-1"
              color="primary"
              variant="flat"
            >
              Full screen
            </v-btn>
            <v-btn
              v-if="currentSnippet.url"
              :href="currentSnippet.url"
              target="_blank"
              prepend-icon="mdi-open-in-new"
              class="ml-1"
              color="primary"
              variant="flat"
            >
              Open in new window
            </v-btn>
            <v-btn
              v-if="currentSnippet.url && currentSnippet.language?.id === 'jsonld'"
              :href="`https://json-ld.org/playground/#startTab=tab-expanded&json-ld=${encodeURIComponent(currentSnippet.url)}`"
              target="_blank"
              class="ml-1"
              color="primary"
              variant="flat"
            >
              <template #prepend>
                <json-ld-icon width="18" height="18"></json-ld-icon>
              </template>
              JSON-LD Playground
            </v-btn>
          </div>
        </template>
        <v-card
          variant="outlined"
          style="opacity: 0.7"
          v-else
        >
          <v-card-text>
            This example has no code in
            <span v-if="language.label">{{language.label}}</span>
            <span v-else>this</span>
            format.
          </v-card-text>
        </v-card>
      </v-col>
      <v-dialog fullscreen v-model="fullscreen" v-if="currentSnippet">
        <v-card>
          <v-toolbar color="primary">
            <v-toolbar-title class="flex-grow-1">{{ fullscreenTitle }}</v-toolbar-title>
            <v-btn icon @click="fullscreen = false"><v-icon>mdi-close</v-icon></v-btn>
          </v-toolbar>
          <v-card-text style="overflow: scroll">
            <code-viewer
                :code="currentSnippet.highlighted || currentSnippet.code"
                :language="currentSnippet.language.highlight || currentSnippet.language.id"
                :highlight="!currentSnippet.highlighted"
              >
              </code-viewer>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>

  </v-container>
</template>
<script setup>
import { computed, reactive, ref, watch } from 'vue';
import CodeViewer from "@/components/CodeViewer.vue";
import JsonLdIcon from '@/assets/json-ld-data-white.svg';
import MarkdownText from "@/components/MarkdownText.vue";
import GeoJsonMapViewer from "@/components/bblock/GeoJsonMapViewer.vue";
import TransformInfo from "@/components/bblock/TransformInfo.vue";
import { geoJsonLanguageIds } from "@/models/mime-types";
import { getTypeColor } from "@/models/transforms";
import { useFetchDocumentByUrl } from "@/composables/bblock";
import CopyToClipboardButton from "@/components/CopyToClipboardButton.vue";

const props = defineProps({
  bblock: { type: Object, required: true },
  example: Object,
  language: Object,
  sourceFilesUrl: String,
});

const fullscreen = ref(false);
const showTransformDetails = ref(false);

watch(() => props.language, () => { showTransformDetails.value = false; });

const isMapView = computed(() => props.language?.id === 'map-view');
const isTransformView = computed(() => props.language?.isTransform === true);

const currentSnippet = computed(() => {
  if (isTransformView.value) return null;
  return (props.language && props.example?.snippets?.find(s => !s.language || s.language.id === props.language.id))
    || props.example?.snippets?.[0];
});

const fullscreenTitle = computed(() => {
  if (currentSnippet.value?.language) {
    return `${props.example.title} (${currentSnippet.value.language.label})`;
  }
  return props.example.title;
});

const currentSnippetRemote = computed(() =>
  currentSnippet.value?.ref && /^https?:\/\//.test(currentSnippet.value.ref)
);

const showContentSidebar = computed(() =>
  props.example.content?.trim() || currentSnippetRemote.value
);

const geoJsonData = computed(() => {
  if (!isMapView.value) return null;
  const snippet = props.example?.snippets?.find(s => {
    const langId = s.language?.id;
    if (!geoJsonLanguageIds.has(langId)) return false;
    try {
      const parsed = JSON.parse(s.code);
      return (parsed.type === 'Feature' && parsed.geometry)
        || (parsed.type === 'FeatureCollection' && Array.isArray(parsed.features)
          && parsed.features.some(f => f.geometry != null));
    } catch { return false; }
  });
  if (!snippet) return null;
  try { return JSON.parse(snippet.code); }
  catch { return null; }
});

const transformOutputStatus = reactive(useFetchDocumentByUrl(
  computed(() => props.bblock),
  computed(() => props.language?.transformEntry?.url ?? null)
));

const getMediaTypeLabel = (mt) => {
  if (!mt) return '';
  if (Array.isArray(mt)) mt = mt[0];
  if (typeof mt === 'string') return mt;
  return mt.label ?? mt.mimeType ?? mt.defaultExtension ?? '';
};
</script>
<style scoped lang="scss">
.transform-header {
  &::after {
    content: '';
    display: table;
    clear: both;
  }
}

.transform-type-chip {
  margin-bottom: 0.25rem;

  @media (min-width: 960px) {
    float: right;
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
}
</style>
<style lang="scss">
.example-content {
  * {
    max-width: 100%;
  }

  p {
    margin-bottom: 0.4rem;
  }

  img {
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
  }
}
</style>
