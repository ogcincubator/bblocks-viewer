<template>
  <div>
    <div v-if="loading" class="text-center my-4">
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </div>
    <v-col cols="12" v-if="!loading && bblock">
      <h1 class="d-flex">
        {{ bblock.name }}
        <v-spacer></v-spacer>
        <v-btn v-if="slateLink" size="small" prepend-icon="mdi-open-in-new" :href="slateLink" target="_blank" color="secondary">
          View HTML documentation
        </v-btn>
      </h1>
      <p class="my-2">{{ bblock.abstract }}</p>

      <v-card class="mt-2">
        <v-tabs
          v-model="tab"
          color="primary"
        >
          <v-tab value="about" prepend-icon="mdi-information-outline">About</v-tab>
          <v-tab v-if="bblock.examples && bblock.examples.length" prepend-icon="mdi-puzzle-outline" value="examples">
            Examples
          </v-tab>
          <v-tab value="json-schema" prepend-icon="mdi-code-json" v-if="bblock.schema">JSON Schema</v-tab>
          <v-tab value="json-ld" prepend-icon="mdi-semantic-web" v-if="bblock.ldContext">JSON-LD context</v-tab>
          <v-tab value="validation" prepend-icon="mdi-check">Validation</v-tab>
        </v-tabs>
        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="about" class="tab-content-about pa-1"  :transition="false" :reverse-transition="false">
              <v-alert :type="bblock.validationPassed ? 'success' : 'error'">
                This building block is
                <strong v-if="!bblock.validationPassed">NOT</strong>
                valid.
                <v-btn class="float-end"
                       size="small"
                       v-if="bblock.testOutputs"
                       :href="bblock.testOutputs"
                       prepend-icon="mdi-open-in-new"
                       target="_blank">
                  View test outputs
                </v-btn>
              </v-alert>
              <v-card v-if="bblock.description" title="Description" class="bblock-description">
                <v-card-text v-html="description">
                </v-card-text>
              </v-card>

              <v-card v-if="bblock.sources && bblock.sources.length" title="References" class="bblock-references">
                <v-list>
                  <v-list-item v-for="source in bblock.sources"
                               :key="source.title"
                               :title="source.title"
                               :href="source.link"
                               target="_blank"
                               :subtitle="source.link"
                               :prepend-icon="source.link ? 'mdi-open-in-new' : 'mdi-text-box-multiple-outline'"
                  >
                  </v-list-item>
                </v-list>
              </v-card>

            </v-window-item>

            <v-window-item
              v-if="bblock.examples && bblock.examples.length"
              value="examples"
              class="ma-1"
               :transition="false" :reverse-transition="false">
              <v-tabs
                v-model="languageTab"
              >
                <v-tab v-for="lang in languageTabs" :key="lang.id" :value="lang.id">{{ lang.label }}</v-tab>
              </v-tabs>
              <v-expansion-panels multiple>
                <v-expansion-panel v-for="example in bblock.examples">
                  <v-expansion-panel-title>{{ example.title }}</v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <div v-if="example.content" class="example-content">
                      {{ md2html(example.content) }}
                    </div>
                    <code>

                    </code>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-window-item>
            <v-window-item value="json-schema"  :transition="false" :reverse-transition="false">
              <p class="mb-2">This Building Block's JSON schema is available in the following formats:</p>

              <div class="ml-3">
                <div v-if="bblock.schema['application/yaml']" class="d-flex align-center mb-2">
                  <span class="mr-2">YAML:</span>
                  <copy-text-field url :text="bblock.schema['application/yaml']"></copy-text-field>
                </div>
                <div v-if="bblock.schema['application/json']" class="d-flex align-center">
                  <span class="mr-2">JSON:</span>
                  <copy-text-field url :text="bblock.schema['application/json']"></copy-text-field>
                </div>
              </div>

              <div class="d-flex flex-column align-stretch  pa-5">
                <div class="code-viewer-wrapper">
                  <code-viewer
                    v-if="jsonSchema.contents"
                    :language="jsonSchema.lang"
                    :code="jsonSchema.contents"
                  ></code-viewer>
                </div>
                <div v-if="jsonSchema.contents" class="json-schema-actions text-right mt-1">
                  <v-btn
                    prepend-icon="mdi-clipboard"
                    @click="copyToClipboard(jsonSchema.contents)"
                    color="primary"
                  >
                    Copy to clipboard
                  </v-btn>
                </div>
                <v-progress-circular v-if="jsonSchema.loading" size="64"></v-progress-circular>
              </div>

            </v-window-item>
            <v-window-item v-if="bblock.ldContext" value="json-ld" :transition="false" :reverse-transition="false">

              <p class="mb-2">This Building Block's JSON-LD is available at the following URL:</p>

              <div class="ml-3">
                <div v-if="bblock.ldContext" class="d-flex align-center mb-2">
                  <copy-text-field url :text="bblock.ldContext"></copy-text-field>
                </div>
              </div>

              <div class="d-flex flex-column align-stretch pa-5">
                <div class="code-viewer-wrapper">
                  <code-viewer
                    v-if="ldContext.contents"
                    language="json"
                    :code="ldContext.contents"
                  ></code-viewer>
                </div>
                <div v-if="ldContext.contents" class="json-schema-actions text-right mt-1">
                  <v-btn
                    prepend-icon="mdi-open-in-new"
                    :href="jsonLdPlaygroundLink"
                    color="primary"
                    target="_blank"
                    class="mr-1"
                  >
                    View in JSON-LD Playground
                  </v-btn>
                  <v-btn
                    prepend-icon="mdi-clipboard"
                    @click="copyToClipboard(ldContext.contents)"
                    color="primary"
                  >
                    Copy to clipboard
                  </v-btn>
                </div>
                <v-progress-circular v-if="ldContext.loading" size="64"></v-progress-circular>
              </div>
            </v-window-item>
            <v-window-item value="validation"  :transition="false" :reverse-transition="false">
            </v-window-item>
          </v-window>

        </v-card-text>
      </v-card>

      <v-expansion-panels class="pa-2" multiple>
        <v-expansion-panel title="How to use">
          <v-expansion-panel-text class="how-to">
            With this building block, I want to...
            <v-tabs v-model="howToTab" align-tabs="center">
              <v-tab value="schema">use its schema</v-tab>
              <v-tab v-if="bblock.ldContext" value="json-ld">use its JSON-LD context</v-tab>
              <v-tab value="reuse-bb">reuse it in another BB</v-tab>
            </v-tabs>
            <v-window v-model="howToTab">
              <v-window-item value="schema">
                Schema
              </v-window-item>
              <v-window-item value="json-ld">
                <p>This building block's JSON-LD context can be found at:</p>
                <v-text-field
                  readonly
                >
                  {{ bblock.ldContext }}
                  <template v-slot:append-inner>
                    <v-icon @click.prevent="copyToClipboard(bblock.ldContext)" title="Copy to clipboard">
                      mdi-clipboard
                    </v-icon>
                  </template>
                </v-text-field>
                <p>You can include this JSON-LD context in your own JSON objects as follows:</p>
                <v-textarea
                  readonly
                  :model-value="jsonLdExample"
                  class="monospace"
                  rows="7"
                >
                  <template v-slot:append-inner>
                    <v-icon @click.prevent="copyToClipboard(jsonLdExample)" title="Copy to clipboard">
                      mdi-clipboard
                    </v-icon>
                  </template>
                </v-textarea>
                <p>If you have additional JSON-LD that you would like to use, just add it to the <code>@context</code>
                  array above,
                  either as a URL or as a JSON-LD context object.</p>
              </v-window-item>
              <v-window-item value="reuse-bb">
                REUSE
              </v-window-item>
            </v-window>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </div>
</template>

<script>
import {marked} from 'marked';
import bblockService from '@/services/bblock.service';
import CopyTextField from "@/components/CopyTextField.vue";
import {knownLanguages} from "@/models/mime-types";
import CodeViewer from "@/components/CodeViewer.vue";

export default {
  components: {CodeViewer, CopyTextField},
  props: {
    bblockId: String,
  },
  data() {
    return {
      bblock: null,
      loading: false,
      howToTab: 'schema',
      tab: 'about',
      languageTab: null,
      languageTabs: [],
      jsonSchema: {
        loading: true,
        contents: null,
        lang: 'yaml',
      },
      ldContext: {
        loading: true,
        contents: null,
      },
    };
  },
  mounted() {
    this.loadBBlock();
  },
  computed: {
    jsonLdExample() {
      if (!this.bblock?.ldContext) {
        return '';
      }
      return `{
    "@context": [
      "${this.bblock.ldContext}"
    ],
    "name": "John Smith",
    "age": 29
}`
    },
    description() {
      if (!this.bblock || !this.bblock.description) {
        return null;
      }
      const html = marked.parse(this.bblock.description);
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const h1s = doc.getElementsByTagName('h1'), h2s = doc.getElementsByTagName('h2');
      if (!(h1s.length + h2s.length)) {
        return html;
      }
      for (let i = 6; i > 0; i--) {
        const newTag = i === 6 ? '<div class="h7">' : `<h${i + 1}>`,
          newClosing = i === 6 ? '</div>' : `</h${i + 1}>`;
        for (let h of doc.getElementsByTagName(`h${i}`)) {
          h.outerHTML = `${newTag}${h.innerHTML}${newClosing}`;
        }
      }
      return doc.body.innerHTML;
    },
    slateLink() {
      return this.bblock && bblockService.getBBlockSlateLink(this.bblockId);
    },
    jsonLdPlaygroundLink() {
      return this.bblock
        && this.bblock.ldContext
        && `https://json-ld.org/playground/#json-ld=${encodeURIComponent(this.bblock.ldContext)}`;
    },
  },
  methods: {
    loadBBlock() {
      if (!this.bblockId || this.bblock?.itemIdentifier === this.bblockId) {
        return;
      }
      this.tab = this.$route.params?.section || 'about';
      this.loading = true;
      bblockService.getBBlock(this.bblockId)
        .then(data => {
          this.languageTabs = [];
          const addedLanguages = new Set();
          if (data.examples && data.examples.length) {
            data.examples.forEach(example => {
              example.snippets?.forEach(snippet => {
                if (!snippet.language) {
                  snippet.language = 'plaintext';
                }
                let lang = knownLanguages[snippet.language];
                if (typeof lang === 'string') {
                  lang = knownLanguages[lang];
                }
                if (!lang) {
                  lang = {
                    id: lang,
                    order: 999,
                    label: lang,
                  };
                }
                if (!addedLanguages.has(lang.id)) {
                  this.languageTabs.push(lang);
                  addedLanguages.add(lang.id);
                }
                example.lang = lang;
              });
            });
            this.languageTabs.sort((a, b) =>
              a.order === b.order ? a.label.localeCompare(b.label) : a.order - b.order
            );
            this.languageTab = this.languageTabs[0].id;
          }

          this.jsonSchema.loading = true;
          bblockService.fetchSchema(data)
            .then(({lang, contents}) => {
              this.jsonSchema.lang = lang;
              this.jsonSchema.contents = contents;
            })
            .finally(() => this.jsonSchema.loading = false);
          this.ldContext.loading = true;
          bblockService.fetchLdContext(data)
            .then(ldContext => this.ldContext.contents = ldContext)
            .finally(() => this.ldContext.loading = false);

          this.bblock = data;
          this.$emit('load', this.bblock);
          console.log(data);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    copyToClipboard(text) {
      navigator?.clipboard?.writeText(text);
    },
    md2html(s) {
      return marked(s);
    },
  },
  watch: {
    bblockId() {
      this.loadBBlock();
    },
    tab(v) {
      this.$router.replace({
        name: 'BuildingBlock',
        params: {
          id: this.bblockId,
          section: v === 'about' ? '' : v,
        },
      });
    },
    loading(v) {
      this.$emit('update:loading', v);
    },
  },
}
</script>

<style lang="scss">
.bblock-description .v-card-text {
  * {
    padding: revert;
    margin: revert;
  }

  > *:first-child {
    padding-top: 0;
    margin-top: 0;
  }
}

.tab-content-about > * {
  margin-top: 10px;

  &:first-child {
    margin-top: 0 !important;
  }
}

.how-to .v-tab {
  text-transform: none !important;
}

.monospace {
  font-family: monospace;
}

.code-viewer-wrapper {
  width: 100%;
  padding: 1rem;
  border: 1px solid gray;
  max-height: 30em;
  overflow-y: auto;
}
</style>
