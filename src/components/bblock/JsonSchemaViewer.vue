<template>
  <div class="json-schema-viewer">
    <p class="mb-2">This Building Block's JSON schema is available in the following formats:</p>

    <div class="text-right mb-2" v-if="bblock?.sourceSchema">
      <v-btn-toggle
        v-model="mode"
        rounded="0"
        color="primary"
        group
        mandatory="force"
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
          Full (YAML)
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
        <v-btn value="annotated-json">
          Full (JSON)
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
        <v-btn value="resolved-json" v-if="bblock?.resolvedSchema">
          Resolved (JSON)
          <template #append>
            <v-tooltip
              text="Fully resolved schema with all $ref inlined and allOf flattened — no external references"
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

    <div class="ml-3" v-if="mode === 'annotated' || mode === 'annotated-json'">
      <div v-if="bblock.schema['application/yaml']" class="d-flex align-center mb-2">
        <span class="mr-2">YAML:</span>
        <copy-text-field url :text="bblock.schema['application/yaml']"></copy-text-field>
      </div>
      <div v-if="bblock.schema['application/json']" class="d-flex align-center">
        <span class="mr-2">JSON:</span>
        <copy-text-field url :text="bblock.schema['application/json']"></copy-text-field>
      </div>
    </div>

    <div class="ml-3" v-else-if="mode === 'resolved-json'">
      <div class="d-flex align-center mb-2">
        <copy-text-field url :text="bblock.resolvedSchema"></copy-text-field>
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
          :open-urls="false"
          @code-click="codeClick"
        ></code-viewer>
        <div v-if="currentSchemaLoading" class="text-center">
          <v-progress-circular size="64" class="ma-3" indeterminate></v-progress-circular>
        </div>
        <v-alert v-if="mode === 'source' && sourceSchema.error" type="error" title="Error loading resource">
          An error was encountered while loading the remote resource ({{ sourceSchema.error }}).
        </v-alert>
        <v-alert v-if="mode === 'annotated-json' && jsonAnnotated.error" type="error" title="Error parsing schema">
          An error was encountered while parsing the annotated schema ({{ sourceSchema.error }}).
        </v-alert>
        <v-alert v-if="mode === 'resolved-json' && resolvedJson.error" type="error" title="Error loading resource">
          An error was encountered while loading the resolved schema ({{ resolvedJson.error }}).
        </v-alert>
      </div>
      <div v-if="currentSchema" class="json-schema-actions text-right mt-1">
        <copy-to-clipboard-button :text="currentSchema" color="primary">Copy to clipboard</copy-to-clipboard-button>
      </div>
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
              :href="getBBlockUrl(menu.bblock)"
              @click.prevent="openBBlock(menu.bblock)"
            >
              View Building Block
            </v-btn>
            <v-btn size="small" class="mx-1" :href="menu.href" target="_blank">Open schema</v-btn>
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
import CodeViewer from "@/components/CodeViewer.vue";
import CopyTextField from "@/components/CopyTextField.vue";
import bblockService from "@/services/bblock.service";
import ColorCircle from "@/components/ColorCircle.vue";
import CopyToClipboardButton from "@/components/CopyToClipboardButton.vue";

export default {
  components: {
    CopyToClipboardButton,
    ColorCircle,
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
        contents: false,
        error: null,
      },
      jsonAnnotated: {
        loading: false,
        contents: false,
        error: null,
      },
      resolvedJson: {
        loading: false,
        contents: false,
        error: null,
      },
      mode: 'annotated', // or 'source'
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
          href = bblock?.schema?.['application/yaml'];
        } else if (href) {
          bblock = await bblockService.findResource(href.replace(/#.*$/, ''));
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
    getBBlockUrl(bblock) {
      if (bblockService.isShown(bblock)) {
        return this.$router.resolve({
          name: 'BuildingBlock',
          params: {
            id: bblock.itemIdentifier,
          },
        }).href;
      } else if (bblock.documentation?.['bblocks-viewer']) {
        return bblock.documentation['bblocks-viewer'].url;
      }
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
    currentSchema() {
      if (!this.bblock) {
        return null;
      }
      switch(this.mode) {
        case 'annotated': return this.bblock.annotatedSchema;
        case 'annotated-json': return this.jsonAnnotated.contents;
        case 'resolved-json': return this.resolvedJson.contents;
        default: return this.sourceSchema.contents;
      }
    },
    currentSchemaLoading() {
      if (this.mode === 'source') {
        return this.sourceSchema.loading;
      }
      if (this.mode === 'annotated-json') {
        return this.jsonAnnotated.loading;
      }
      if (this.mode === 'resolved-json') {
        return this.resolvedJson.loading;
      }
      return false;
    },
  },
  watch: {
    mode(v) {
      if (v === 'source') {
        if (!this.sourceSchema.loading && this.sourceSchema.contents === false) {
          this.sourceSchema.loading = true;
          bblockService.fetchSourceSchema(this.bblock)
            .then(schema => this.sourceSchema.contents = schema)
            .catch(e => this.sourceSchema.error = e)
            .finally(() => this.sourceSchema.loading = false);
        }
      } else if (v === 'annotated-json') {
        if (this.bblock.schema['application/json'] && !this.jsonAnnotated.loading
          && this.jsonAnnotated.contents === false) {
          this.jsonAnnotated.loading = true;
          bblockService.fetchDocument(this.bblock, ['schema', 'application/json'])
            .then(schema => this.jsonAnnotated.contents = schema)
            .catch(e => this.jsonAnnotated.error = e)
            .finally(() => this.jsonAnnotated.loading = false);
        }
      } else if (v === 'resolved-json') {
        if (this.bblock.resolvedSchema && !this.resolvedJson.loading
          && this.resolvedJson.contents === false) {
          this.resolvedJson.loading = true;
          bblockService.fetchDocumentByUrl(this.bblock, this.bblock.resolvedSchema)
            .then(schema => {
              if (typeof schema === 'object') {
                schema = JSON.stringify(schema, null, 2);
              }
              this.resolvedJson.contents = schema;
            })
            .catch(e => this.resolvedJson.error = e)
            .finally(() => this.resolvedJson.loading = false);
        }
      }
    },
  },
}
</script>
