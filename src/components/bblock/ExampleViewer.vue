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
          <div class="d-flex align-center mb-1 gap-2">
            <p class="text-subtitle-1 font-weight-medium mb-0">Transformed ({{ getMediaTypeLabel(language.transform.outputs?.mediaTypes) }})</p>
            <v-tooltip
              v-if="profilesValidation"
              :text="profilesValidationPassed ? 'Profile validation passed' : 'Profile validation failed'"
              location="bottom"
            >
              <template #activator="{ props: tooltipProps }">
                <v-menu v-model="profilesMenuVisible" :close-on-content-click="false">
                  <template #activator="{ props: menuProps }">
                    <v-icon
                      v-bind="{ ...tooltipProps, ...menuProps }"
                      :color="profilesValidationPassed ? 'success' : 'error'"
                      class="ml-2"
                      style="cursor: pointer"
                    >
                      {{ profilesValidationPassed ? 'mdi-check-circle' : 'mdi-close-circle' }}
                    </v-icon>
                  </template>
                  <v-card min-width="320">
                    <v-card-title class="text-subtitle-2 pb-1">Profiles validation</v-card-title>
                    <v-divider />
                    <v-list density="compact">
                      <v-list-item
                        v-for="(validation, profileId) in profilesValidation"
                        :key="profileId"
                      >
                        <template #prepend>
                          <v-icon :color="validation.result ? 'success' : 'error'">
                            {{ validation.result ? 'mdi-check-circle' : 'mdi-close-circle' }}
                          </v-icon>
                        </template>
                        <v-list-item-title>
                          <code style="font-size: 0.8em; word-break: break-all">{{ profileId }}</code>
                        </v-list-item-title>
                        <v-list-item-subtitle v-if="profileBBlocks[profileId]?.name">
                          {{ profileBBlocks[profileId].name }}
                        </v-list-item-subtitle>
                        <template #append>
                          <v-btn
                            v-if="canOpenProfile(profileId)"
                            size="small"
                            variant="text"
                            prepend-icon="mdi-open-in-new"
                            :href="getProfileUrl(profileId)"
                            @click.prevent="openProfile(profileId)"
                          >View</v-btn>
                        </template>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-menu>
              </template>
            </v-tooltip>
            <profiles-validation-report-dialog
              :profiles-validation="profilesValidation"
              :profile-b-blocks="profileBBlocks"
            />
          </div>
          <div class="flex-grow-1" style="font-size: 90%">
            <template v-if="!language.transformEntry.success">
              <v-alert type="error" class="mb-2">An error occurred running this transform</v-alert>
              <pre v-if="language.transformEntry.stderr" class="text-caption text-error pa-2"
                   style="overflow-x: auto; white-space: pre-wrap">{{ language.transformEntry.stderr }}</pre>
            </template>
            <template v-else-if="transformOutputMediaClass === 'image'">
              <div class="text-center">
                <img :src="language.transformEntry.url" style="max-width: 100%; max-height: 30em;" alt="Transform output" />
              </div>
            </template>
            <template v-else-if="transformOutputMediaClass === 'video'">
              <video :src="language.transformEntry.url" controls style="max-width: 100%; max-height: 30em;"></video>
            </template>
            <template v-else-if="transformOutputMediaClass === 'audio'">
              <audio :src="language.transformEntry.url" controls style="width: 100%;"></audio>
            </template>
            <!-- Unknown output type confirmed binary, or declared/confirmed oversized, or still loading (safe default) -->
            <template v-else-if="resolvedTransformOutputMediaClass === 'download'">
              <div class="text-center py-4">
                <p v-if="transformOutputDeclaredOversized || transformOutputStatus.tooLarge" class="text-body-2 mb-2">
                  This output is too large to preview.
                </p>
                <v-btn :href="language.transformEntry.url" target="_blank" prepend-icon="mdi-download" color="primary" variant="flat">
                  Download output
                </v-btn>
              </div>
            </template>
            <!-- Known code type, or unknown type that sniffed as text -->
            <template v-else>
              <div class="text-center" v-if="transformOutputStatus.loading">
                <v-progress-circular indeterminate color="primary" size="64" />
              </div>
              <template v-else-if="!transformOutputStatus.error && transformOutputStatus.contents">
                <ViewPluginRenderer
                  v-if="selectedTransformPluginMatch"
                  :instance="selectedTransformPluginMatch.instance"
                  :label="getMediaTypeLabel(language.transform.outputs?.mediaTypes)"
                />
                <div v-else>
                  <v-alert v-if="transformOutputDisplay.truncated" type="warning" variant="tonal" density="compact" class="mb-2">
                    This output is too large to display in full and has been truncated.
                    <a :href="language.transformEntry.url" target="_blank">Download the full output</a> to see all of its content.
                  </v-alert>
                  <div style="max-height: 30em; overflow-y: auto">
                    <code-viewer
                      :code="transformOutputDisplay.text"
                      :language="transformOutputDisplay.truncated ? 'text' : language.transform.outputs?.mediaTypes?.[0]?.mimeType"
                    />
                  </div>
                </div>
              </template>
              <v-alert v-else-if="transformOutputStatus.error" type="error">
                Error loading transform output
              </v-alert>
            </template>
          </div>
          <div class="d-flex align-center mt-1" v-if="language.transformEntry.success">
            <template v-if="resolvedTransformOutputMediaClass === 'code' && transformOutputStatus.contents">
              <v-btn-toggle
                v-if="transformViewPluginMatches.length"
                v-model="transformOutputView"
                mandatory
                density="compact"
                rounded="1"
              >
                <v-btn
                  v-for="(match, i) in transformViewPluginMatches"
                  :key="i"
                  :value="`plugin:${i}`"
                  size="small"
                  :prepend-icon="match.PluginClass.icon ?? 'mdi-puzzle-outline'"
                >{{ match.PluginClass.viewName ?? match.PluginClass.name ?? 'Custom' }}</v-btn>
                <v-btn value="code" size="small" prepend-icon="mdi-code-tags">Code</v-btn>
              </v-btn-toggle>
              <v-spacer />
              <copy-to-clipboard-button :text="transformOutputStatus.contents" color="primary" variant="flat">Copy to clipboard</copy-to-clipboard-button>
            </template>
            <template v-else-if="(transformOutputMediaClass === 'image' || transformOutputMediaClass === 'video' || transformOutputMediaClass === 'audio') && language.transformEntry.url">
              <v-spacer />
              <v-btn :href="language.transformEntry.url" target="_blank" prepend-icon="mdi-download" color="primary" variant="flat" size="small">Download</v-btn>
            </template>
          </div>
        </v-col>
      </v-row>
    </template>

    <!-- Normal snippet / map view -->
    <v-row v-else>
      <v-col cols="12" :md="example.snippets?.length ? 6 : 12" v-if="showContentSidebar">
        <MarkdownText class="example-content" :content="example.content" :base-url="sourceFilesUrl"></MarkdownText>
        <div v-if="currentSnippetRemote">
          <template v-if="currentSnippet['json-path']">
            This snippet was extracted from <a :href="currentSnippet.ref" target="_blank">{{ currentSnippet.ref }}</a>
            using the <a href="https://pypi.org/project/jsonpath-ng/" target="_blank">JSONPath</a>
            expression <code>{{ currentSnippet['json-path'] }}</code>.
          </template>
          <template v-else>
            This snippet was retrieved from <a :href="currentSnippet.ref" target="_blank">{{ currentSnippet.ref }}</a>.
          </template>
          <template v-if="refBBlock && refBBlock.itemIdentifier !== bblock.itemIdentifier">
            <span v-if="canOpenBBlock(refBBlock)">
              (from <a :href="getBBlockUrl(refBBlock)" @click.prevent="openBBlock(refBBlock)"><code>{{ refBBlock.itemIdentifier }}</code> - {{ refBBlock.name }}</a>)
            </span>
            <span v-else>(from <code>{{ refBBlock.itemIdentifier }}</code> - {{ refBBlock.name }})</span>
          </template>
        </div>
      </v-col>
      <v-col cols="12" :md="showContentSidebar ? 6 : 12" v-if="example.snippets?.length">
        <slot name="before-code"></slot>
        <template v-if="isViewPlugin && language.pluginInstance">
          <ViewPluginRenderer :instance="language.pluginInstance" :label="language.label" />
        </template>
        <template v-else-if="currentSnippet">
          <template v-if="snippetMediaClass === 'image' && currentSnippet.url">
            <div class="text-center">
              <img :src="currentSnippet.url" style="max-width: 100%; max-height: 30em;" :alt="currentSnippet.language?.label || 'image'" />
            </div>
          </template>
          <template v-else-if="snippetMediaClass === 'video' && currentSnippet.url">
            <video :src="currentSnippet.url" controls style="max-width: 100%; max-height: 30em;"></video>
          </template>
          <template v-else-if="snippetMediaClass === 'audio' && currentSnippet.url">
            <audio :src="currentSnippet.url" controls style="width: 100%;"></audio>
          </template>
          <template v-else-if="resolvedSnippetMediaClass === 'download' && currentSnippet.url">
            <div class="text-center py-4">
              <p v-if="currentSnippetDeclaredOversized || currentSnippetStatus.tooLarge" class="text-body-2 mb-2">
                This file is too large to preview.
              </p>
              <v-btn :href="currentSnippet.url" target="_blank" prepend-icon="mdi-download" color="primary" variant="flat">
                Download {{ currentSnippet.language?.label || 'file' }}
              </v-btn>
            </div>
          </template>
          <template v-else-if="currentSnippet.code == null && currentSnippetStatus.loading">
            <div class="text-center py-4">
              <v-progress-circular indeterminate color="primary" size="64" />
            </div>
          </template>
          <template v-else-if="currentSnippet.code == null && currentSnippetStatus.error">
            <v-alert type="error">Error loading snippet content</v-alert>
          </template>
          <template v-else>
            <v-alert v-if="snippetDisplay.truncated" type="warning" variant="tonal" density="compact" class="mb-2">
              This file is too large to display in full and has been truncated.
              <a v-if="currentSnippet.url" :href="currentSnippet.url" target="_blank">Download the full file</a> to see all of its content.
            </v-alert>
            <div style="max-height: 30em; overflow-y: auto">
              <code-viewer
                :code="snippetDisplay.text"
                :raw-code="snippetDisplay.truncated ? undefined : currentSnippet.highlighted"
                :language="snippetDisplay.truncated ? 'text' : (currentSnippet.language.highlight || currentSnippet.language.id)"
                @highlight="currentSnippet.highlighted = $event"
              />
            </div>
          </template>
          <div class="d-flex mt-2">
            <v-spacer></v-spacer>
            <v-btn
              v-if="resolvedSnippetMediaClass === 'code' && snippetDisplay.text"
              @click="fullscreen = true"
              prepend-icon="mdi-fullscreen"
              class="ml-1"
              color="primary"
              variant="flat"
            >
              Full screen
            </v-btn>
            <v-btn
              v-if="currentSnippet.url && resolvedSnippetMediaClass !== 'download'"
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
              v-if="currentSnippet.url && (snippetMediaClass === 'image' || snippetMediaClass === 'video' || snippetMediaClass === 'audio')"
              :href="currentSnippet.url"
              :download="true"
              prepend-icon="mdi-download"
              class="ml-1"
              color="primary"
              variant="flat"
            >
              Download
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
            <v-alert v-if="snippetDisplay.truncated" type="warning" variant="tonal" density="compact" class="mb-2">
              This file is too large to display in full and has been truncated.
              <a v-if="currentSnippet.url" :href="currentSnippet.url" target="_blank">Download the full file</a> to see all of its content.
            </v-alert>
            <code-viewer
                :code="snippetDisplay.text"
                :raw-code="snippetDisplay.truncated ? undefined : currentSnippet.highlighted"
                :language="snippetDisplay.truncated ? 'text' : (currentSnippet.language.highlight || currentSnippet.language.id)"
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
import TransformInfo from "@/components/bblock/TransformInfo.vue";
import { classifyMimeType, isLikelyBinary } from "@/models/mime-types";
import { isOversizedSize, truncateText, MAX_FETCH_SIZE, MAX_VISUALIZATION_SIZE } from "@/utils/content-size";
import { getTypeColor } from "@/models/transforms";
import { useFetchDocumentByUrl } from "@/composables/bblock";
import { useBBlockNavigation } from "@/composables/bblock-navigation";
import CopyToClipboardButton from "@/components/CopyToClipboardButton.vue";
import ProfilesValidationReportDialog from "@/components/bblock/ProfilesValidationReportDialog.vue";
import ViewPluginRenderer from "@/components/bblock/ViewPluginRenderer.vue";
import bblockService from "@/services/bblock.service";
import {useViewPlugins, transformOutputToCandidate} from "@/composables/view-plugins";

const props = defineProps({
  bblock: { type: Object, required: true },
  example: Object,
  language: Object,
  sourceFilesUrl: String,
});

const { openBBlock, canOpenBBlock, getBBlockUrl } = useBBlockNavigation();
const { matchPlugins } = useViewPlugins();

const fullscreen = ref(false);
const showTransformDetails = ref(false);
const transformOutputView = ref('code');
const profilesMenuVisible = ref(false);
const profileBBlocks = ref({});
const refBBlock = ref(null);

const isTransformView = computed(() => props.language?.isTransform === true);
const isViewPlugin = computed(() => props.language?.isViewPlugin === true);

const currentSnippet = computed(() => {
  if (isTransformView.value || isViewPlugin.value) return null;
  return (props.language && props.example?.snippets?.find(s => !s.language || s.language.id === props.language.id))
    || props.example?.snippets?.[0];
});

const fullscreenTitle = computed(() => {
  if (currentSnippet.value?.language) {
    return `${props.example.title} (${currentSnippet.value.language.label})`;
  }
  return props.example.title;
});

const currentSnippetRemote = computed(() => {
  const ref = currentSnippet.value?.ref;
  return !!ref && /^https?:\/\//.test(ref) && !(props.sourceFilesUrl && ref.startsWith(props.sourceFilesUrl));
});

const showContentSidebar = computed(() =>
  props.example.content?.trim() || currentSnippetRemote.value
);

const transformOutputMediaClass = computed(() => {
  const mediaTypes = props.language?.transform?.outputs?.mediaTypes;
  if (!mediaTypes?.length) return 'code';
  const mt = mediaTypes[0];
  const mimeType = typeof mt === 'string' ? mt : mt?.mimeType;
  return classifyMimeType(mimeType);
});

const snippetMediaClass = computed(() => {
  const snippet = currentSnippet.value;
  if (!snippet) return 'code';
  const base = classifyMimeType(snippet.language?.id);
  if (base === 'image' || base === 'video' || base === 'audio') return base;
  if (snippet.binary) return 'download';
  if (currentSnippetDeclaredOversized.value) return 'download'; // declared oversized — never fetched
  if (snippet.code == null) return 'code'; // not inlined by the build — resolved once fetched, see below
  if (base === 'download') return isLikelyBinary(snippet.code) ? 'download' : 'code';
  return 'code';
});

// A build-reported size lets us skip the network fetch entirely for snippets we already know
// are too large to preview — same circuit-breaker idea as transformOutputDeclaredOversized below.
// Gated against MAX_VISUALIZATION_SIZE (not the smaller text-display threshold), since the fetch
// still needs to happen for content that's too big to highlight but small enough to map/3D-render.
const currentSnippetDeclaredOversized = computed(() => isOversizedSize(currentSnippet.value?.sizeBytes, MAX_VISUALIZATION_SIZE));

// Not every snippet ships its content inline anymore — some only carry a ref/url (postprocessing
// may skip inlining large ones). Fetch those on demand, under the same size protections as
// transform outputs: skip entirely if declared oversized, otherwise fetch with a hard abort ceiling.
const currentSnippetFetchUrl = computed(() => {
  const snippet = currentSnippet.value;
  if (!snippet || snippet.code != null || !snippet.url) return null;
  if (snippetMediaClass.value !== 'code') return null; // image/video/audio use the URL directly; download/binary never fetch
  return snippet.url;
});

const currentSnippetStatus = reactive(useFetchDocumentByUrl(
  computed(() => props.bblock),
  currentSnippetFetchUrl,
  computed(() => ({ maxSize: MAX_FETCH_SIZE }))
));

// Refines 'code' into 'download' once a non-inlined snippet turns out too large or binary
const resolvedSnippetMediaClass = computed(() => {
  const base = snippetMediaClass.value;
  const snippet = currentSnippet.value;
  if (base !== 'code' || snippet?.code != null) return base;
  if (currentSnippetStatus.tooLarge) return 'download';
  const fetched = currentSnippetStatus.contents;
  if (fetched == null) return 'code'; // still loading, or fetch failed — code branch shows spinner/error
  return isLikelyBinary(fetched) ? 'download' : 'code';
});

const snippetDisplay = computed(() => {
  const snippet = currentSnippet.value;
  if (resolvedSnippetMediaClass.value !== 'code') {
    return { text: snippet?.code, truncated: false };
  }
  // Once we actually have the text, its real length is authoritative — no need to consult
  // sizeBytes again, that was only useful to decide whether to fetch/parse it in the first place.
  return truncateText(snippet?.code ?? currentSnippetStatus.contents);
});

// A build-reported size lets us skip the network fetch entirely for outputs we already know
// are too large to preview. Gated against MAX_VISUALIZATION_SIZE, since the fetch still needs to
// happen for content that's too big to
// highlight as text but small enough to render as a map/3D scene.
const transformOutputDeclaredOversized = computed(() => isOversizedSize(props.language?.transformEntry?.sizeBytes, MAX_VISUALIZATION_SIZE));

// Skip fetching for known binary/media types, or for outputs already known to be oversized;
// fetch for code and unknown ('download') so we can sniff
const transformOutputFetchUrl = computed(() => {
  const mc = transformOutputMediaClass.value;
  if (mc === 'image' || mc === 'video' || mc === 'audio') return null;
  if (transformOutputDeclaredOversized.value) return null;
  return props.language?.transformEntry?.url ?? null;
});

// For unknown output types ('download'), re-evaluate once content arrives
const resolvedTransformOutputMediaClass = computed(() => {
  const base = transformOutputMediaClass.value;
  if (transformOutputStatus.tooLarge || (transformOutputDeclaredOversized.value && (base === 'code' || base === 'download'))) return 'download';
  if (base !== 'download') return base;
  const contents = transformOutputStatus.contents;
  if (contents == null) return 'download'; // still loading — safe default
  return isLikelyBinary(contents) ? 'download' : 'code';
});

// maxSize is a hard abort ceiling, independent of any declared/sniffed size: it protects against
// downloading (and then JSON.parse-ing for map/3D detection) an unexpectedly huge output whose
// size wasn't declared or was declared wrong.
const transformOutputStatus = reactive(useFetchDocumentByUrl(
  computed(() => props.bblock),
  transformOutputFetchUrl,
  computed(() => ({ maxSize: MAX_FETCH_SIZE }))
));

// Declared size skipped the fetch above, so there's no content to truncate here — the download
// button covers that case. This only truncates content we did fetch and found unexpectedly large,
// i.e. sizeBytes was missing or wrong.
const transformOutputDisplay = computed(() => truncateText(transformOutputStatus.contents));

// View plugins matched against this transform's output. Re-evaluated whenever the selected
// transform or its (already-fetched, never fetched here) content changes — see
// .claude/view-plugins-design.md "Content resolution".
const transformViewPluginMatches = ref([]);
let transformPluginMatchToken = 0;

watch(
  [() => props.language, () => transformOutputStatus.contents],
  async () => {
    const token = ++transformPluginMatchToken;
    if (!isTransformView.value || !props.language?.transformEntry?.success) {
      transformViewPluginMatches.value = [];
      return;
    }
    const candidate = transformOutputToCandidate(
      props.language.transform,
      props.language.transformEntry,
      transformOutputStatus
    );
    const matched = await matchPlugins([candidate], {bblock: props.bblock});
    if (token === transformPluginMatchToken) {
      transformViewPluginMatches.value = matched;
    }
  },
  { immediate: true }
);

const selectedTransformPluginMatch = computed(() => {
  if (!transformOutputView.value?.startsWith?.('plugin:')) return null;
  const i = Number(transformOutputView.value.slice('plugin:'.length));
  return transformViewPluginMatches.value[i] ?? null;
});

// Promote to the first matching plugin view (built-in map/3D/web or otherwise — see
// composables/view-plugins.js) once one resolves, as long as the user hasn't already navigated
// away from the default 'code' view themselves.
watch(transformViewPluginMatches, (matches) => {
  if (transformOutputView.value === 'code' && matches.length) {
    transformOutputView.value = 'plugin:0';
  }
});

const profilesValidation = computed(() => props.language?.transformEntry?.profilesValidation ?? null);

const profilesValidationPassed = computed(() => {
  if (!profilesValidation.value) return null;
  return Object.values(profilesValidation.value).every(v => v.result);
});

watch(() => props.language, () => {
  showTransformDetails.value = false;
  transformOutputView.value = 'code';
  profilesMenuVisible.value = false;
});

watch(() => props.language?.transformEntry?.profilesValidation, async (pv) => {
  if (!pv) return;
  const bblocks = await bblockService.getBBlocks(true);
  const result = {};
  for (const profileId of Object.keys(pv)) {
    result[profileId] = bblocks[profileId] || null;
  }
  profileBBlocks.value = result;
}, { immediate: true });

watch(currentSnippet, async (snippet) => {
  refBBlock.value = null;
  if (snippet?.ref) {
    refBBlock.value = await bblockService.findResource(snippet.ref) ?? null;
  }
}, { immediate: true });


function canOpenProfile(profileId) {
  const bblock = profileBBlocks.value[profileId];
  if (!bblock) return false;
  return bblockService.isShown(bblock) || !!bblock.documentation?.['bblocks-viewer'];
}

function getProfileUrl(profileId) {
  const bblock = profileBBlocks.value[profileId];
  if (!bblock) return undefined;
  return getBBlockUrl(bblock);
}

function openProfile(profileId) {
  const bblock = profileBBlocks.value[profileId];
  if (!bblock) return;
  openBBlock(bblock);
}

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
