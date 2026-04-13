<template>
  <div>
    <div v-if="showType || showDescription" class="transform-header mb-2">
      <div v-if="showType && transform.type" class="transform-type-chip">
        <v-tooltip text="Type of this transform">
          <template #activator="{ props: tooltipProps }">
            <v-chip v-bind="tooltipProps" size="small" variant="flat"
                    :color="getTypeColor(transform.type)">
              {{ transform.type }}
            </v-chip>
          </template>
        </v-tooltip>
      </div>
      <markdown-text v-if="showDescription && transform.description"
                     class="description text-body-2"
                     :content="transform.description"
                     :base-url="sourceFilesUrl" />
    </div>

    <v-alert
      v-if="pluginByType[transform.type]"
      density="compact"
      variant="tonal"
      color="info"
      icon="mdi-puzzle-outline"
      class="my-2 text-body-2"
    >
      Provided by
      <code>{{ pluginByType[transform.type].className }}</code>
      in module
      <a v-if="pluginByType[transform.type].urls?.[0]"
         :href="pluginByType[transform.type].urls[0]" target="_blank">
        <code>{{ pluginByType[transform.type].module }}</code>
      </a>
      <code v-else>{{ pluginByType[transform.type].module }}</code>
      <template v-if="pluginByType[transform.type].pip">
        — install via pip:
        <code>{{ pluginByType[transform.type].pip }}</code>
      </template>
    </v-alert>

    <v-row class="my-2">
      <v-col md="4">
        <div class="font-weight-bold">Inputs</div>
        <ul class="pl-5" v-if="transform?.inputs?.mediaTypes?.length">
          <li v-for="item in transform.inputs.mediaTypes" :key="item.id">
            <span v-if="item.label">{{ item.label }} ({{ item.mimeType }})</span>
            <span v-else-if="item.mimeType">{{ item.mimeType }}</span>
            <span v-else>{{ item }}</span>
          </li>
        </ul>
        <div v-else class="text-disabled">No input media types have been defined.</div>
      </v-col>
      <v-col md="4">
        <div class="font-weight-bold">Output media types</div>
        <ul class="pl-5" v-if="transform?.outputs?.mediaTypes?.length">
          <li v-for="item in transform.outputs.mediaTypes" :key="item.id">
            <span v-if="item.label">{{ item.label }} ({{ item.mimeType }})</span>
            <span v-else-if="item.mimeType">{{ item.mimeType }}</span>
            <span v-else>{{ item }}</span>
          </li>
        </ul>
        <div v-else class="text-disabled">No output media types have been defined.</div>
      </v-col>
      <v-col md="4">
        <div class="font-weight-bold">Output profiles</div>
        <ul class="pl-5" v-if="transform?.outputs?.profiles?.length">
          <li v-for="profile in transform.outputs.profiles" :key="profile" class="mb-1">
            <template v-if="isBBlocksUri(profile)">
              <div>
                <code style="font-size: 0.85em; word-break: break-all">{{ bblockIdFromUri(profile) }}</code>
                <v-btn
                  v-if="canOpenOutputProfile(profile)"
                  size="x-small"
                  variant="text"
                  prepend-icon="mdi-open-in-new"
                  class="ml-2 px-1"
                  :href="getOutputProfileUrl(profile)"
                  @click.prevent="openOutputProfile(profile)"
                >View</v-btn>
              </div>
              <div v-if="outputProfileBBlocks[profile]?.name" class="text-caption text-medium-emphasis">{{ outputProfileBBlocks[profile].name }}</div>
            </template>
            <a v-else-if="isHttpUri(profile)" :href="profile" target="_blank">{{ profile }}</a>
            <span v-else>{{ profile }}</span>
          </li>
        </ul>
        <div v-else class="text-disabled">No output profiles have been defined.</div>
      </v-col>
    </v-row>

    <div class="code-viewer-wrapper">
      <code-viewer :code="transform.code" :language="getCodeLanguage(transform.type)"></code-viewer>
    </div>
    <div class="text-right mt-1">
      <copy-to-clipboard-button :text="transform.code" color="primary">
        Copy to Clipboard
      </copy-to-clipboard-button>
    </div>

    <div v-if="transform.metadata">
      <v-list lines="one" density="compact">
        <template v-for="(value, key) in transform.metadata" :key="key">
          <v-list-item
            v-if="key === 'dependencies' && (value.pip || value.npm || value.python || value.node)"
          >
            <v-list-item-title class="text-body-2">
              <div class="font-weight-medium mb-1">Dependencies</div>
              <div v-if="value.python" class="mb-1">
                <span class="mr-1">Python version:</span>
                <v-chip size="small" class="font-mono">{{ value.python }}</v-chip>
              </div>
              <div v-if="value.pip" class="mb-1">
                <span class="mr-1">pip dependencies:</span>
                <v-chip v-for="dep in toArray(value.pip)" :key="dep"
                        size="small" class="mr-1 font-mono">{{ dep }}</v-chip>
              </div>
              <div v-if="value.node" class="mb-1">
                <span class="mr-1">Node version:</span>
                <v-chip size="small" class="font-mono">{{ value.node }}</v-chip>
              </div>
              <div v-if="value.npm" class="mb-1">
                <span class="mr-1">npm dependencies:</span>
                <v-chip v-for="dep in toArray(value.npm)" :key="dep"
                        size="small" class="mr-1 font-mono">{{ dep }}</v-chip>
              </div>
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-else-if="!key.startsWith('_')">
            <v-list-item-title class="text-body-2">
              <span class="font-weight-medium mr-1">{{ key }}:</span>
              <code>{{ typeof value === 'object' ? JSON.stringify(value) : value }}</code>
            </v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue';
import CodeViewer from "@/components/CodeViewer.vue";
import CopyToClipboardButton from "@/components/CopyToClipboardButton.vue";
import MarkdownText from "@/components/MarkdownText.vue";
import bblockService from "@/services/bblock.service";
import { getTypeColor, getCodeLanguage } from "@/models/transforms";
import { useBBlockNavigation } from "@/composables/bblock-navigation";

const props = defineProps({
  transform: { type: Object, required: true },
  showDescription: { type: Boolean, default: true },
  showType: { type: Boolean, default: true },
  sourceFilesUrl: { type: String, default: null },
});

const { openBBlock, canOpenBBlock, getBBlockUrl } = useBBlockNavigation();
const toArray = v => !v ? [] : (Array.isArray(v) ? v : [v]);

const pluginByType = ref({});
const outputProfileBBlocks = ref({});

const isBBlocksUri = (s) => typeof s === 'string' && s.startsWith('bblocks://');
const isHttpUri = (s) => typeof s === 'string' && /^https?:\/\//.test(s);
const bblockIdFromUri = (s) => s.slice('bblocks://'.length);

onMounted(() => {
  bblockService.getPluginByType().then(map => { pluginByType.value = map; });
});

watch(() => props.transform?.outputs?.profiles, async (profiles) => {
  if (!profiles?.length) return;
  const bblockUris = profiles.filter(isBBlocksUri);
  if (!bblockUris.length) return;
  const bblocks = await bblockService.getBBlocks(true);
  const result = {};
  for (const uri of bblockUris) {
    const id = bblockIdFromUri(uri);
    result[uri] = bblocks[id] || null;
  }
  outputProfileBBlocks.value = result;
}, { immediate: true });

function canOpenOutputProfile(uri) { return canOpenBBlock(outputProfileBBlocks.value[uri]); }
function getOutputProfileUrl(uri) { return getBBlockUrl(outputProfileBBlocks.value[uri]); }
function openOutputProfile(uri) { openBBlock(outputProfileBBlocks.value[uri]); }
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

.description :deep(p) {
  margin-bottom: 0.4em;
}
</style>
