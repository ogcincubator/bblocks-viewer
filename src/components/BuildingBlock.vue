<template>
  <div :class="wrapperClass">
    <div v-if="loading" class="text-center my-4">
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </div>
    <v-col cols="12" v-if="!loading && bblock">
      <h1 class="d-flex flex-column flex-sm-row align-center">
        {{ bblock.name }}
        <v-chip v-if="status" class="ml-sm-3" size="small" :color="status.color" variant="flat">{{ status.label }}</v-chip>
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
              <v-row v-if="bblock.description" >
                <v-col>
                  <v-card title="Description" class="bblock-description">
                    <v-card-text v-html="description" @click="interceptLinks">
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-card title="Dependencies">
                    <v-card-text>
                      <dependency-viewer
                        :bblock-id="bblockId"
                        @node:click="dependencyNodeClick"
                      ></dependency-viewer>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

              <v-row class="align-stretch" v-if="bblock.sources?.length || bblock.tags?.length">
                <v-col cols="12" md="9">
                  <v-row v-if="bblock.tags?.length">
                    <v-col>
                      <v-card v-if="bblock.tags?.length" title="Tags" class="bblock-tags">
                        <v-card-text>
                          <v-chip v-for="tag in bblock.tags" v-text="tag" variant="outlined" class="mb-1 mr-1"></v-chip>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                  <v-row v-if="bblock.sources?.length">
                   <v-col>
                      <v-card title="References" class="bblock-references">
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
                  </v-row>
                </v-col>
                <v-col cols="12" md="3">
                  <v-card title="Other information" class="fill-height">
                    <v-list>
                      <v-list-item title="Added">{{ bblock.dateTimeAddition }}</v-list-item>
                      <v-list-item title="Last change">{{ bblock.dateOfLastChange }}</v-list-item>
                      <v-list-item title="Register">
                        <v-chip
                          :color="bblock.register.color"
                          :title="bblock.register.url"
                        >
                          {{ bblock.register.name }}
                        </v-chip>
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
                class="d-flex justify-md-end align-center language-tabs flex-column flex-md-row"
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
                    class="mx-1 mb-1"
                  >
                    {{ lang.label }}
                  </v-btn>
                </v-item>
              </v-item-group>
              <v-expansion-panels multiple v-model="expandedExamples">
                <template
                  v-for="(example, exampleIdx) in bblock.examples"
                  :key="exampleIdx"
                >
                  <v-expansion-panel
                    :value="exampleIdx"
                    v-if="example.content?.length || example.snippets.find(s => s.language.id == languageTab)"
                  >
                    <v-expansion-panel-title>{{ example.title }}</v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <example-viewer
                        :example="example"
                        :language="languageTabs.find(l => l.id === languageTab)"
                        :source-files-url="bblock.sourceFiles"
                      ></example-viewer>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </template>
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
                    v-if="bblock.annotatedSchema"
                    language="yaml"
                    :code="bblock.annotatedSchema"
                  ></code-viewer>
                </div>
                <div v-if="bblock.annotatedSchema" class="json-schema-actions text-right mt-1">
                  <v-btn
                    prepend-icon="mdi-clipboard"
                    @click="copyToClipboard(bblock.annotatedSchema)"
                    color="primary"
                  >
                    Copy to clipboard
                  </v-btn>
                </div>
              </div>

            </v-window-item>
            <v-window-item v-if="bblock.ldContext" value="json-ld" :transition="false" :reverse-transition="false">
              <json-ld-context-viewer :bblock="bblock"></json-ld-context-viewer>
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
    </v-col>

    <v-dialog v-model="relatedBBlock.show" max-width="800">
      <template #default="{ isActive }">
        <v-card>
          <v-card-title style="white-space: normal">
            {{ relatedBBlock.metadata.name }}
          </v-card-title>
          <v-card-subtitle>
            <code>{{ relatedBBlock.metadata.itemIdentifier }}</code>
          </v-card-subtitle>
          <v-card-text>
            {{ relatedBBlock.metadata.abstract }}
            <p class="mt-2 text-body-2" v-if="relatedBBlock.metadata.itemIdentifier === bblockId">This is the current building block.</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              v-if="relatedBBlock.metadata.itemIdentifier !== bblockId && (relatedBBlock.metadata.local || showImported || relatedBBlock.metadata.documentation?.['bblocks-viewer'])"
              @click="openRelatedBlock()"
            >
              More information
            </v-btn>
            <v-btn @click="isActive.value = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>

  </div>
</template>

<script>
import {marked} from 'marked';
import {copyToClipboard, interceptLinks, setBaseUrl} from "@/lib/utils";
import bblockService from '@/services/bblock.service';
import CopyTextField from "@/components/CopyTextField.vue";
import {knownLanguages} from "@/models/mime-types";
import CodeViewer from "@/components/CodeViewer.vue";
import ExampleViewer from "@/components/bblock/ExampleViewer.vue";
import {statuses} from "@/models/status";
import DependencyViewer from "@/components/bblock/DependencyViewer.vue";
import configService from "@/services/config.service";
import JsonLdContextViewer from "@/components/bblock/JsonLdContextViewer.vue";

export default {
  components: {JsonLdContextViewer, DependencyViewer, ExampleViewer, CodeViewer, CopyTextField},
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
      expandedExamples: [],
      shaclRules: null,
      allBBlocks: {},
      relatedBBlock: {
        show: false,
        metadata: null,
      },
      showImported: configService.config.showImported,
    };
  },
  mounted() {
    this.loadBBlock();
    bblockService.getBBlocks(true).then(bblocks => {
      this.allBBlocks = bblocks;
    });
  },
  computed: {
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
      setBaseUrl(doc, this.bblock.sourceFiles);
      return doc.body.innerHTML;
    },
    slateLink() {
      return this.bblock && bblockService.getBBlockSlateLink(this.bblockId);
    },
    status() {
      if (!this.bblock?.status) {
        return null;
      }
      return statuses.find(s => this.bblock.status === s.value);
    },
    wrapperClass() {
      let result = {
        'md-and-up': this.$vuetify.display.mdAndUp,
      };
      if (this.tab) {
        result[`active-tab-${this.tab}`] = true;
      }
      return result;
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
                let lang;
                if (typeof snippet.language === 'object') {
                  lang = snippet.language;
                } else {
                  if (!snippet.language) {
                    snippet.language = 'plaintext';
                  }
                  lang = knownLanguages[snippet.language];
                  if (typeof lang === 'string') {
                    lang = knownLanguages[lang];
                  }
                  if (!lang) {
                    lang = {
                      id: snippet.language,
                      order: 999,
                      label: snippet.language,
                    };
                  }
                  snippet.language = lang;
                }
                if (!addedLanguages.has(lang.id)) {
                  this.languageTabs.push(lang);
                  addedLanguages.add(lang.id);
                }
              });
              this.expandedExamples.push(exampleIdx);
            });
            this.languageTabs.sort((a, b) =>
              a.order === b.order ? a.label.localeCompare(b.label) : a.order - b.order
            );
            this.languageTab = this.languageTabs[0]?.id;

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
              bblockService.getBBlocks(true)
                .then(allBBlocks => {
                  for (const [id, rules] of Object.entries(data.shaclRules)) {
                    if (id !== this.bblockId) {
                      const name = allBBlocks?.[id]?.name || id;
                      this.shaclRules.push({
                        id,
                        name,
                        rules,
                      });
                    }
                  }
                });
            }
          }

          this.bblock = data;
          this.$emit('load', this.bblock);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    copyToClipboard,
    interceptLinks,
    dependencyNodeClick(bblockId) {
      const bblock = this.allBBlocks[bblockId];
      if (bblock) {
        this.relatedBBlock.metadata = bblock;
        this.relatedBBlock.show = true;
      }
    },
    openRelatedBlock() {
      if (this.relatedBBlock.metadata) {
        if (this.relatedBBlock.metadata.local || configService.config.showImported) {
          this.$router.push({
            name: 'BuildingBlock',
            params: {
              id: this.relatedBBlock.metadata.itemIdentifier,
            },
          });
        } else if (this.relatedBBlock.metadata.documentation?.['bblocks-viewer']) {
          window.open(this.relatedBBlock.metadata.documentation['bblocks-viewer'].url);
        }
      }
      this.relatedBBlock.show = false;
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
    max-width: 100%;
  }

  > *:first-child {
    padding-top: 0;
    margin-top: 0;
  }

  p {
    margin-bottom: 0.4rem;
  }

  img {
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
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

.md-and-up {
  .language-tabs {
    position: fixed !important;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
    background: white;
    margin-bottom: 0;
    padding: 0.3rem 0.6rem;
    border-top: 1px solid #ddd;
  }
}

.active-tab-examples {
  padding-bottom: 2em;
}
</style>
