<template>
  <div class="json-ld-context-viewer">
    <p class="mb-2">This Building Block's JSON-LD is available at the following URL:</p>

    <div class="text-right mb-2" v-if="bblock?.sourceLdContext">
      <v-btn-toggle
        v-model="mode"
        rounded="0"
        color="primary"
        group
        mandatory="force"
      >
        <v-btn value="simplified">
          Source
          <template #append>
            <v-tooltip
              text="The simplified version only shows the context defined by the current building block, without any inherited or imported terms."
              class="opaque-tooltip"
              location="bottom"
            >
              <template #activator="{ props }">
                <v-icon v-bind="props">mdi-help-circle</v-icon>
              </template>
            </v-tooltip>
          </template>
        </v-btn>
        <v-btn value="full">
          Full
          <template #append>
            <v-tooltip
              text="The full context includes the terms defined by the current building block, plus all inherited and imported one."
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

    <div class="ml-3">
      <div v-if="url" class="d-flex align-center mb-2">
        <copy-text-field url :text="url"></copy-text-field>
      </div>
    </div>

    <div class="d-flex flex-column align-stretch pa-5">
      <div class="code-viewer-wrapper">
        <code-viewer
          v-if="contents"
          language="json"
          :code="contents"
        ></code-viewer>
      </div>
      <div v-if="contents" class="jsonld-actions text-right mt-1">
        <v-btn
          prepend-icon="mdi-open-in-new"
          :href="jsonLdPlaygroundLink"
          color="primary"
          target="_blank"
          class="mr-1"
          variant="flat"
        >
          View in JSON-LD Playground
        </v-btn>
        <v-btn
          prepend-icon="mdi-clipboard"
          @click="copyToClipboard(contents)"
          color="primary"
          variant="flat"
        >
          Copy to clipboard
        </v-btn>
      </div>
      <v-progress-circular v-if="loading" size="64"></v-progress-circular>
    </div>
  </div>
</template>
<script>
import CopyTextField from "@/components/CopyTextField.vue";
import CodeViewer from "@/components/CodeViewer.vue";
import {copyToClipboard} from "@/lib/utils";
import bblockService from "@/services/bblock.service";

export default {
  components: {
    CopyTextField,
    CodeViewer,
  },
  props: {
    bblock: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      ldContext: {
        loading: false,
        contents: null,
      },
      sourceLdContext: {
        loading: false,
        contents: null,
      },
      mode: 'full', // or 'simplified'
    };
  },
  methods: {
    copyToClipboard,
    load() {
      if (!this.bblock?.ldContext) {
        return;
      }
      if (this.mode === 'full') {
        if (!this.ldContext.contents) {
          this.ldContext.loading = true;
          bblockService.fetchLdContext(this.bblock)
            .then(data => this.ldContext.contents = data)
            .finally(() => this.ldContext.loading = false);
        }
      } else if (this.bblock.sourceLdContext) {
        this.sourceLdContext.loading = true;
          bblockService.fetchSourceLdContext(this.bblock)
            .then(data => this.sourceLdContext.contents = data)
            .finally(() => this.sourceLdContext.loading = false);
      }
    },
  },
  computed: {
    jsonLdPlaygroundLink() {
      return this.bblock
        && this.bblock.ldContext
        && `https://json-ld.org/playground/#json-ld=${encodeURIComponent(this.bblock.ldContext)}`;
    },
    contents() {
      if (!this.bblock) {
        return null;
      }
      return this.mode === 'full' ? this.ldContext.contents : this.sourceLdContext.contents;
    },
    url() {
      if (!this.bblock) {
        return null;
      }
      return this.mode === 'full' ? this.bblock.ldContext : this.bblock.sourceLdContext;
    },
    loading() {
      return this.mode === 'full' ? this.ldContext.loading : this.sourceLdContext.loading;
    },
  },
  watch: {
    bblock: {
      handler() {
        this.ldContext.contents = null;
        this.sourceLdContext.contents = null;
        this.mode = 'full';
        this.load();
      },
      immediate: true,
    },
    mode() {
      this.load();
    },
  },
}
</script>
<style>
.opaque-tooltip .v-overlay__content {
  background: rgba(66, 66, 66, 1) !important;
}
</style>
