<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-select
          v-model="selectedOutput"
          label="Select a transform"
          :items="outputTransforms"
          return-object
        >
          <template #item="{ props, item }">
            <v-list-item
              v-bind="props"
              :title="item.raw.transform.id"
            >
              <template v-if="!item.raw.success" #prepend>
                <v-icon color="error" size="small" class="mr-1">mdi-alert-circle</v-icon>
              </template>
              <v-list-item-subtitle>
                {{ item.raw.snippet.language.label }} &#8594; {{ item.raw.transform.outputs.mediaTypes[0].label }}
              </v-list-item-subtitle>
            </v-list-item>
          </template>
          <template #selection="{ item }">
            <v-icon v-if="!item.raw.success" color="error" size="small" class="mr-1">mdi-alert-circle</v-icon>
            {{ item.raw.transform.id }}
            <span class="text-caption ml-2 align-self-end">{{ item.raw.snippet.language.label }} &#8594; {{ item.raw.transform.outputs.mediaTypes[0].label }}</span>
          </template>
        </v-select>
        <div v-if="selectedOutput?.transform?.description">
          {{ selectedOutput.transform.description }}
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col lg="6">
        <p class="text-h6">Input ({{ selectedOutput.snippet.language.label }})</p>
        <div style="max-height: 30em; overflow-y: auto; font-size: 90%">
          <code-viewer
            :code="selectedOutput.snippet.code"
            :language="selectedOutput.snippet.language.id"
          >
          </code-viewer>
        </div>
      </v-col>
      <v-col lg="6">
        <p class="text-h6">Output ({{ selectedOutput.transform.outputs.mediaTypes[0].label }})</p>
        <div style="max-height: 30em; overflow-y: auto; font-size: 90%">
          <template v-if="!selectedOutput.success">
            <v-alert type="error" class="mb-2">An error was found running this transform</v-alert>
            <pre v-if="selectedOutput.stderr" class="text-caption text-error pa-2" style="overflow-x: auto; white-space: pre-wrap">{{ selectedOutput.stderr }}</pre>
          </template>
          <template v-else>
            <div class="text-center" v-if="outputStatus.loading">
              <v-progress-circular
                indeterminate
                color="primary"
                size="64"
              >
              </v-progress-circular>
            </div>
            <code-viewer
              v-if="!outputStatus.loading && !outputStatus.error && outputStatus.contents"
              :code="outputStatus.contents"
              :language="selectedOutput.transform.outputs.mediaTypes[0].id"
            >
            </code-viewer>
            <v-alert v-if="outputStatus.error" type="error">Error loading transform output from {{ selectedOutput.url }}</v-alert>
          </template>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import {computed, reactive, ref} from "vue";
import CodeViewer from "@/components/CodeViewer.vue";
import {useFetchDocumentByUrl} from "@/composables/bblock";

const props = defineProps({
  bblock: {
    type: Object,
    required: true,
  },
  example: {
    type: Object,
    required: true,
  },
});

const outputTransforms = reactive([]);

props.bblock.transforms.forEach((transform, tidx) => {
  props.example.snippets.forEach((snippet, sidx) => {
    const snippetResult = snippet?.transformResults?.[transform.id];
    if (snippetResult === undefined || snippetResult === null) {
      return;
    }
    const isLegacy = typeof snippetResult === 'string';
    outputTransforms.push({
      id: `${tidx}-${sidx}`,
      title: transform.id,
      transform,
      snippet,
      url: isLegacy ? snippetResult : (snippetResult.url || null),
      success: isLegacy ? true : (snippetResult.success ?? true),
      stderr: isLegacy ? null : (snippetResult.stderr || null),
    });
  });
});

const selectedOutput = ref(outputTransforms[0]);

const outputStatus = reactive(useFetchDocumentByUrl(props.bblock, computed(() => selectedOutput.value?.url)));
</script>