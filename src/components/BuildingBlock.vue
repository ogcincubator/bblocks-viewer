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
      <h1 class="d-flex align-baseline">
        {{ bblock.name }}
        <v-chip v-if="status" class="ml-3" size="small" :color="status.color">{{ status.label }}</v-chip>
        <v-spacer></v-spacer>
        <v-btn v-if="slateLink" size="small" prepend-icon="mdi-open-in-new" :href="slateLink" target="_blank"
               color="secondary">
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
          <v-tab value="validation" prepend-icon="mdi-check" v-if="shaclRules">Validation</v-tab>
        </v-tabs>
        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="about" class="tab-content-about pa-1" :transition="false" :reverse-transition="false">
              <v-row>
                <v-col>
                  <v-alert :type="bblock.validationPassed ? 'success' : 'error'">
                    This building block is
                    <strong v-if="!bblock.validationPassed">NOT</strong>
                    valid.
                    <v-btn class="float-end"
                           size="small"
                           v-if="bblock.testOutputs"
                           :href="bblock.testOutputs"
                           prepend-icon="mdi-open-in-new"
                           target="_blank"
                    >
                      View test outputs
                    </v-btn>
                  </v-alert>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-card v-if="bblock.description" title="Description" class="bblock-description">
                    <v-card-text v-html="description" @click="interceptLinks">
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

              <v-row class="align-stretch">
                <v-col cols="12" md="9">
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
                </v-col>
                <v-col cols="12" md="3">
                  <v-card title="Other information">
                    <v-list>
                      <v-list-item title="Added">{{ bblock.dateTimeAddition }}</v-list-item>
                      <v-list-item title="Last change">{{ bblock.dateOfLastChange }}</v-list-item>
                      <v-list-item v-if="bblock.group" title="Group">
                        <v-chip :color="bblock.groupColor">{{ bblock.group }}</v-chip>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-col>
              </v-row>
            </v-window-item>

            <v-window-item
              v-if="bblock.examples && bblock.examples.length"
              value="examples"
              class="ma-1"
              :transition="false" :reverse-transition="false"
            >
              <v-item-group
                v-model="languageTab"
                mandatory
                class="my-2 d-flex justify-end align-center"
              >
                <div class="mr-2">View examples as:</div>
                <v-item
                  v-for="lang in languageTabs"
                  :key="lang.id"
                  :value="lang.id"
                  v-slot="{ isSelected, toggle }"
                >
                  <v-btn
                    :color="isSelected ? 'primary' : 'default'"
                    @click="toggle"
                  >
                    {{ lang.label }}
                  </v-btn>
                </v-item>
              </v-item-group>
              <v-expansion-panels multiple v-model="expandedExamples">
                <v-expansion-panel
                  v-for="(example, exampleIdx) in bblock.examples"
                  :key="exampleIdx"
                  :value="exampleIdx"
                >
                  <v-expansion-panel-title>{{ example.title }}</v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <example-viewer
                      :example="example"
                      :language="languageTabs.find(l => l.id === languageTab)"
                    ></example-viewer>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-window-item>
            <v-window-item value="json-schema" :transition="false" :reverse-transition="false">
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
            <v-window-item
              value="validation"
              :transition="false"
              :reverse-transition="false"
              v-if="bblock.shaclRules"
            >
              <p class="mb-2">
                The following sets of SHACL rules are used to validate this building block:
              </p>
              <v-card
                v-for="entry in shaclRules"
                :key="entry.bblockId"
                class="ma-2"
              >
                <v-card-title
                  v-if="entry.name"
                  class="text-subtitle-1"
                >
                  {{ entry.name }}
                  <small class="ml-2"><code>{{ entry.id }}</code></small>
                </v-card-title>
                <v-list-item v-for="rule in entry.rules"
                             :key="rule"
                             :title="rule"
                             :href="rule"
                             target="_blank"
                             prepend-icon="mdi-open-in-new"
                >
                </v-list-item>
              </v-card>
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
import {copyToClipboard, interceptLinks} from "@/lib/utils";
import bblockService from '@/services/bblock.service';
import CopyTextField from "@/components/CopyTextField.vue";
import {knownLanguages} from "@/models/mime-types";
import CodeViewer from "@/components/CodeViewer.vue";
import ExampleViewer from "@/components/bblock/ExampleViewer.vue";
import {statuses} from "@/models/status";

export default {
  components: {ExampleViewer, CodeViewer, CopyTextField},
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
      expandedExamples: [],
      shaclRules: null,
      status: null,
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
    status() {
      if (!this.bblock?.status) {
        return null;
      }
      return statuses.find(s => this.bblock.status === s.value);
    },
  },
  methods: {
    loadBBlock() {
      if (!this.bblockId || this.bblock?.itemIdentifier === this.bblockId) {
        return;
      }
      this.tab = this.$route.params?.section || 'about';
      this.loading = true;
      bblockService.fetchBBlock(this.bblockId)
        .then(data => {

          // Language tabs
          this.languageTabs = [];
          const addedLanguages = new Set();
          this.expandedExamples = [];
          if (data.examples && data.examples.length) {
            data.examples.forEach((example, exampleIdx) => {
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
                snippet.language = lang;
              });
              this.expandedExamples.push(exampleIdx);
            });
            this.languageTabs.sort((a, b) =>
              a.order === b.order ? a.label.localeCompare(b.label) : a.order - b.order
            );
            this.languageTab = this.languageTabs[0].id;

            // ShaclRules
            this.shaclRules = null;
            if (Array.isArray(data.shaclRules)) {
              // Legacy shaclRules
              if (data.shaclRules.length) {
                this.shaclRules = [{
                  id: this.bblockId,
                  name: data.name,
                  rules: data.shaclRules,
                }];
              }
            } else if (data.shaclRules && Object.keys(data.shaclRules).length) {
              this.shaclRules = [];
              if (data.shaclRules[this.bblockId]) {
                this.shaclRules.push({
                  id: this.bblockId,
                  name: data.name,
                  rules: data.shaclRules[this.bblockId],
                });
              }
              for (const [id, rules] of Object.entries(data.shaclRules)) {
                if (id !== this.bblockId) {
                  let name = id;
                  bblockService.getBBlockMetadata(id, true)
                    .then(md => name = md.name)
                    .finally(() => {
                      this.shaclRules.push({
                        id,
                        name,
                        rules,
                      })
                    });
                }
              }
            }
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
    copyToClipboard,
    interceptLinks,
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
