<template>
  <div class="transforms-viewer px-1" v-if="transforms?.length">

    <slot name="intro-text">
      <p class="mb-2">The following transforms are defined for this Building Block:</p>
    </slot>

    <v-card v-for="transform of transforms" :key="transform.id" class="my-2">
      <v-card-title>
        <code>{{ transform.id }}</code>
        <v-tooltip text="Type of this transform">
          <template #activator="{props}">
            <v-chip v-bind="props" class="ml-2" size="small" variant="flat" label :color="getTypeColor(transform.type)">
              {{ transform.type }}
            </v-chip>
          </template>
        </v-tooltip>
      </v-card-title>
      <v-card-text>
        <MarkdownText class="description" :content="transform.description"
                      :base-url="bblock.sourceFiles"></MarkdownText>
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
              <li v-for="item in transform.outputs.profiles" :key="item.id">
                {{ item.label }} ({{ item.mimeType }})
              </li>
            </ul>
            <div v-else class="text-disabled">No output profiles have been defined.</div>
          </v-col>
        </v-row>

        <div class="code-viewer-wrapper">
          <code-viewer
            :code="transform.code"
          ></code-viewer>
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
                    <v-chip size="small" label class="font-mono">{{ value.python }}</v-chip>
                  </div>
                  <div v-if="value.pip" class="mb-1">
                    <span class="mr-1">pip dependencies:</span>
                    <v-chip v-for="dep in toArray(value.pip)" :key="dep"
                            size="small" label class="mr-1 font-mono">{{ dep }}</v-chip>
                  </div>
                  <div v-if="value.node" class="mb-1">
                    <span class="mr-1">Node version:</span>
                    <v-chip size="small" label class="font-mono">{{ value.node }}</v-chip>
                  </div>
                  <div v-if="value.npm" class="mb-1">
                    <span class="mr-1">npm dependencies:</span>
                    <v-chip v-for="dep in toArray(value.npm)" :key="dep"
                            size="small" label class="mr-1 font-mono">{{ dep }}</v-chip>
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
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup>
import {computed, ref, onMounted} from "vue";
import CodeViewer from "@/components/CodeViewer.vue";
import CopyToClipboardButton from "@/components/CopyToClipboardButton.vue";
import MarkdownText from "@/components/MarkdownText.vue";
import bblockService from "@/services/bblock.service";

const props = defineProps({
  bblock: {
    type: Object,
    required: true,
  }
});

const transforms = computed(() => props.bblock?.transforms);

const toArray = v => !v ? [] : (Array.isArray(v) ? v : [v]);

const pluginByType = ref({});

onMounted(() => {
  bblockService.getPluginByType().then(map => { pluginByType.value = map; });
});

const getTypeColor = text => {
  switch (text) {
    case 'jq':
      return '#000033';
    case 'sparql-update':
      return '#990000';
    case 'xslt':
      return '#006600';
  }
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Convert to 32-bit integer
  }
  const r = Math.abs(hash) % 180;
  const g = Math.abs(hash >> 8) % 180;
  const b = Math.abs(hash >> 16) % 180;
  const toHex = (num) => num.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

</script>
<style lang="scss" scoped>
.description p {
  margin-bottom: 0.7em;
}
</style>
