<template>
  <div class="openapi-document-viewer">
    <p class="mb-2">This Building Block's OpenAPI document is available at the following URL:</p>

    <div class="text-right mb-2" v-if="bblock?.openAPIDocument">
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
              text="The source version shows the document before resolving Building Blocks references"
              class="opaque-tooltip"
              location="bottom"
            >
              <template #activator="{ props }">
                <v-icon v-bind="props">mdi-help-circle</v-icon>
              </template>
            </v-tooltip>
          </template>
        </v-btn>
        <v-btn value="final">
          Final
          <template #append>
            <v-tooltip
              text="The final document only contains resolved Building Blocks references."
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
          language="yaml"
          :code="contents"
          :open-urls="false"
          @code-click="codeClick"
        ></code-viewer>
      </div>
      <div v-if="contents" class="openapi-actions text-right mt-1">
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
    <v-menu
      v-model="menu.visible"
      :activator="menu.activator"
      min-width="0"
      @click:outside="clickOutside"
      persistent
      no-click-animation
    >
      <v-card>
        <v-card-text v-if="!menu.loading">
          <div>From <strong>{{ menu.bblock.name }}</strong></div>
          <div><small><code>{{ menu.bblock.itemIdentifier }}</code></small></div>
          <div v-if="menu.bblock.register" style="font-size: 90%">
            <color-circle :color="menu.bblock.register.color"></color-circle>
            {{ menu.bblock.register.name }}
          </div>
          <div class="text-center mt-2">
            <v-btn
              v-if="canOpenBBlock(menu.bblock)"
              size="small"
              class="mx-1"
              @click.prevent="openBBlock(menu.bblock)"
            >
              View Building Block
            </v-btn>
            <v-btn size="small" class="mx-1" @click.prevent="openUrl(menu.href)">Open schema</v-btn>
          </div>
        </v-card-text>
        <v-card-text v-else class="text-center">
          <v-progress-circular indeterminate size="32"></v-progress-circular>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
import CopyTextField from "@/components/CopyTextField.vue";
import CodeViewer from "@/components/CodeViewer.vue";
import {copyToClipboard} from "@/lib/utils";
import bblockService from "@/services/bblock.service";
import ColorCircle from "@/components/ColorCircle.vue";

export default {
  components: {
    ColorCircle,
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
      finalDocument: {
        loading: false,
        contents: null,
      },
      sourceDocument: {
        loading: false,
        contents: null,
      },
      mode: 'final', // or 'simplified'
      menu: {
        loading: false,
        activator: null,
        visible: false,
        bblock: null,
        href: null,
      },
    };
  },
  methods: {
    copyToClipboard,
    load() {
      if (!this.bblock?.openAPIDocument) {
        return;
      }
      let prop = 'openAPIDocument', document = this.finalDocument;
      if (this.mode !== 'final') {
        prop = 'sourceOpenAPIDocument';
        document = this.sourceDocument;
      }
      if (!document.contents) {
        document.loading = true;
        bblockService.fetchDocument(this.bblock, prop)
          .then(data => document.contents = data)
          .finally(() => document.loading = false);
      }
    },
    async codeClick({ target, href }) {
      this.menu.loading = true;
      let bblock;
      try {
        const textContent = target.textContent.trim();
        if (/^bblocks:\/\//.test(textContent)) {
          const bblockId = textContent.substring(10);
          let bblocks = await bblockService.getBBlocks(false);
          if (!bblocks[bblockId]) {
            bblocks = await bblockService.getBBlocks(true);
          }
          bblock = bblocks[bblockId];
          if (bblock) {
            href = bblock.openAPIDocument || bblock.schema?.['application/yaml'];
          } else {
            href = null;
          }
        } else if (href) {
          bblock = await bblockService.findResource(href);
          console.log(href, bblock)
          if (!bblock) {
            window.open(href);
            return;
          }
        }
      } finally {
        this.menu.loading = false;
      }
      if (bblock) {
        this.menu.activator = target;
        this.menu.bblock = bblock;
        this.menu.href = href;
        this.$nextTick(() => this.menu.visible = true);
      }
    },
    openUrl(url) {
      window.open(url);
    },
    openBBlock(bblock) {
      if (bblockService.isShown(bblock)) {
        this.$router.push({
          name: 'BuildingBlock',
          params: {
            id: bblock.itemIdentifier,
          },
        });
      } else if (bblock.documentation?.['bblocks-viewer']) {
        window.open(bblock.documentation['bblocks-viewer'].url);
      }
    },
    canOpenBBlock(bblock) {
      return bblockService.isShown(bblock) || bblock.documentation?.['bblocks-viewer'];
    },
    clickOutside(ev) {
      this.$nextTick(() => {
        if (ev.target !== this.menu.activator) {
          this.menu.visible = false;
        }
      });
    },
  },
  computed: {
    contents() {
      if (!this.bblock) {
        return null;
      }
      return this.mode === 'final' ? this.finalDocument.contents : this.sourceDocument.contents;
    },
    url() {
      if (!this.bblock) {
        return null;
      }
      return this.mode === 'final' ? this.bblock.openAPIDocument : this.bblock.sourceOpenAPIDocument;
    },
    loading() {
      return this.mode === 'final' ? this.finalDocument.loading : this.sourceDocument.loading;
    },
  },
  watch: {
    bblock: {
      handler() {
        this.finalDocument.contents = null;
        this.sourceDocument.contents = null;
        this.mode = 'final';
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
