<template>
  <div class="json-schema-viewer">
    <p class="mb-2">This Building Block's JSON schema is available in the following formats:</p>

    <div class="text-right mb-2" v-if="bblock?.sourceSchema">
      <v-btn-toggle
        v-model="mode"
        rounded="0"
        color="primary"
        group
      >
        <v-btn value="source">
          Source
          <template #append>
            <v-tooltip
              text="The source version shows the schema before semantic annotation"
              class="opaque-tooltip"
              location="bottom"
            >
              <template #activator="{ props }">
                <v-icon v-bind="props">mdi-help-circle</v-icon>
              </template>
            </v-tooltip>
          </template>
        </v-btn>
        <v-btn value="annotated">
          Full
          <template #append>
            <v-tooltip
              text="The annotated version contains semantic annotations that can be used to build a JSON-LD context"
              class="opaque-tooltip"
              location="bottom"
            >
              <template #activator="{ props }">
                <v-icon v-bind="props">mdi-help-circle</v-icon>
              </template>
            </v-tooltip>
          </template>
        </v-btn>
      </v-btn-toggle>
    </div>

    <div class="ml-3" v-if="mode === 'annotated'">
      <div v-if="bblock.schema['application/yaml']" class="d-flex align-center mb-2">
        <span class="mr-2">YAML:</span>
        <copy-text-field url :text="bblock.schema['application/yaml']"></copy-text-field>
      </div>
      <div v-if="bblock.schema['application/json']" class="d-flex align-center">
        <span class="mr-2">JSON:</span>
        <copy-text-field url :text="bblock.schema['application/json']"></copy-text-field>
      </div>
    </div>

    <div class="ml-3" v-else>
      <div class="d-flex align-center mb-2">
        <copy-text-field url :text="bblock.sourceSchema"></copy-text-field>
      </div>
    </div>

    <div class="d-flex flex-column align-stretch pa-5">
      <div class="code-viewer-wrapper">
        <code-viewer
          v-if="currentSchema"
          language="yaml"
          :code="currentSchema"
        ></code-viewer>
        <div v-if="currentSchemaLoading" class="text-center">
          <v-progress-circular size="64" class="ma-3" indeterminate></v-progress-circular>
        </div>
      </div>
      <div v-if="currentSchema" class="json-schema-actions text-right mt-1">
        <v-btn
          prepend-icon="mdi-clipboard"
          @click="copyToClipboard(currentSchema)"
          color="primary"
          variant="flat"
        >
          Copy to clipboard
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
import CodeViewer from "@/components/CodeViewer.vue";
import CopyTextField from "@/components/CopyTextField.vue";
import {copyToClipboard} from "@/lib/utils";
import bblockService from "@/services/bblock.service";

export default {
  components: {
    CodeViewer,
    CopyTextField,
  },
  props: {
    bblock: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      sourceSchema: {
        loading: false,
        contents: null,
        error: null,
      },
      mode: 'annotated', // or 'source'
    };
  },
  methods: {
    copyToClipboard,
  },
  computed: {
    currentSchema() {
      if (!this.bblock) {
        return null;
      }
      return this.mode === 'annotated' ? this.bblock.annotatedSchema : this.sourceSchema.contents;
    },
    currentSchemaLoading() {
      return this.mode === 'source' ? this.sourceSchema.loading : false;
    },
  },
  watch: {
    mode(v) {
      if (v === 'source' && !this.sourceSchema.loading && this.sourceSchema.contents !== false) {
        this.sourceSchema.loading = true;
        bblockService.fetchSourceSchema(this.bblock)
          .then(schema => this.sourceSchema.contents = schema)
          .catch(e => this.sourceSchema.error = e)
          .finally(() => this.sourceSchema.loading = false);
      }
    },
  },
}
</script>
