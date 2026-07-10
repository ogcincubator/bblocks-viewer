<template>
  <div class="json-ld-context-viewer">

    <slot name="intro-text">
      <p class="mb-2">This Building Block's JSON-LD is available at the following URL:</p>
    </slot>

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

    <v-alert
      v-if="!bblock?.sourceLdContext && contents"
      type="info"
      variant="tonal"
      icon="mdi-auto-fix"
      title="Auto-assembled from dependencies"
      class="mb-4"
    >
      This context is auto-assembled from its dependencies: reuse of simplified, consistent, and tested
      components to create reliable solutions.
      <a
        href="https://ogcincubator.github.io/bblocks-docs/create/semantic-uplift#modularity-support"
        target="_blank"
        rel="noopener"
      >How context composition works</a>
    </v-alert>

    <div class="ml-3">
      <div v-if="url" class="d-flex align-center mb-2">
        <copy-text-field url :text="url"></copy-text-field>
      </div>
    </div>

    <div v-if="contextSourcesGraphHasContent" class="text-right">
      <v-tooltip
        :text="contextGraphCollapsed ? 'Show context source graph' : 'Hide context source graph'"
        location="bottom"
      >
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            icon
            variant="text"
            size="small"
            @click="contextGraphCollapsed = !contextGraphCollapsed"
          >
            <v-icon>{{ contextGraphCollapsed ? 'mdi-dock-left' : 'mdi-dock-right' }}</v-icon>
          </v-btn>
        </template>
      </v-tooltip>
    </div>

    <v-row>
      <v-col cols="12" :lg="showContextSourcesGraph ? 7 : 12">
        <div class="d-flex flex-column align-stretch pa-5">
          <div class="code-viewer-wrapper">
            <code-viewer
              v-if="contents"
              language="json"
              :code="processedContents"
              :plain="true"
            ></code-viewer>
            <v-alert v-if="error" type="error" title="Error loading resource">
              An error was encountered while loading the remote resource ({{ error }}).
            </v-alert>
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
            <copy-to-clipboard-button :text="contents" color="primary">Copy to clipboard</copy-to-clipboard-button>
          </div>
          <v-progress-circular v-if="loading" size="64" indeterminate></v-progress-circular>
        </div>
      </v-col>
      <v-col cols="12" lg="5" v-show="showContextSourcesGraph">
        <p class="text-subtitle-2 mb-2 d-flex align-center">
          Where this context comes from
          <v-tooltip
            text="This graph only shows dependencies that define their own JSON-LD context — intermediate dependencies without one are skipped over."
            class="opaque-tooltip"
            location="bottom"
          >
            <template #activator="{ props }">
              <v-icon v-bind="props" class="ml-1">mdi-help-circle</v-icon>
            </template>
          </v-tooltip>
        </p>
        <dependency-viewer
          v-if="bblock?.itemIdentifier"
          :bblocks="bblock.itemIdentifier"
          mode="jsonld-context"
          :item-class-legend="false"
          :registers-legend="true"
          :height="360"
          @has-content="contextSourcesGraphHasContent = $event"
          @node:click="contextSourceNodeClick"
        ></dependency-viewer>
      </v-col>
    </v-row>

    <related-building-block-dialog
      v-model="relatedBBlock.show"
      :bblock="relatedBBlock.metadata"
      :current-bblock-id="bblock?.itemIdentifier"
    ></related-building-block-dialog>
  </div>
</template>
<script>
import CopyTextField from "@/components/CopyTextField.vue";
import CodeViewer from "@/components/CodeViewer.vue";
import bblockService from "@/services/bblock.service";
import CopyToClipboardButton from "@/components/CopyToClipboardButton.vue";
import { expandCuriesInContext } from "@/lib/jsonld-expander";
import DependencyViewer from "@/components/bblock/DependencyViewer.vue";
import RelatedBuildingBlockDialog from "@/components/bblock/RelatedBuildingBlockDialog.vue";

export default {
  components: {
    CopyToClipboardButton,
    CopyTextField,
    CodeViewer,
    DependencyViewer,
    RelatedBuildingBlockDialog,
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
        error: null,
      },
      sourceLdContext: {
        loading: false,
        contents: null,
        error: null,
      },
      mode: 'full', // or 'simplified'
      contextSourcesGraphHasContent: false,
      contextGraphCollapsed: false,
      allBBlocks: {},
      relatedBBlock: {
        show: false,
        metadata: null,
      },
    };
  },
  mounted() {
    bblockService.getBBlocks(true).then(bblocks => {
      this.allBBlocks = bblocks;
    });
  },
  methods: {
    contextSourceNodeClick(bblockId) {
      const bblock = this.allBBlocks[bblockId];
      if (bblock) {
        this.relatedBBlock.metadata = bblock;
        this.relatedBBlock.show = true;
      }
    },
    load() {
      if (!this.bblock?.ldContext) {
        return;
      }
      if (this.mode === 'full') {
        if (!this.ldContext.contents) {
          this.ldContext.loading = true;
          bblockService.fetchLdContext(this.bblock)
            .then(data => this.ldContext.contents = data)
            .catch(e => this.ldContext.error = e)
            .finally(() => this.ldContext.loading = false);
        }
      } else if (this.bblock.sourceLdContext) {
        this.sourceLdContext.loading = true;
          bblockService.fetchSourceLdContext(this.bblock)
            .then(data => this.sourceLdContext.contents = data)
            .catch(e => this.sourceLdContext.error = e)
            .finally(() => this.sourceLdContext.loading = false);
      }
    },
  },
  computed: {
    showContextSourcesGraph() {
      return this.contextSourcesGraphHasContent && !this.contextGraphCollapsed;
    },
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
    processedContents() {
      return this.contents ? expandCuriesInContext(this.contents) : null;
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
    error() {
      if (!this.bblock) {
        return null;
      }
      return this.mode === 'full' ? this.ldContext.error : this.sourceLdContext.error;
    }
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
