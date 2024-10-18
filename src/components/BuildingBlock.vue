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
        <div>
          <v-chip class="ml-sm-3 mx-1" size="small" variant="flat">{{ getItemClassLabel(bblock.itemClass) }}</v-chip>
          <v-chip v-if="status" class="mx-1" size="small" :color="status.color" variant="flat">{{ status.label }}</v-chip>
        </div>
      </h1>
      <p class="mb-3">
        <code>{{ bblock.itemIdentifier }}</code>
        <copy-to-clipboard-button :text="bblock.itemIdentifier"></copy-to-clipboard-button>
      </p>
      <p class="mt-2 mb-4">{{ bblock.abstract }}</p>

      <v-card class="mt-2">
        <v-tabs
          v-model="tab"
          color="primary"
        >
          <v-tab value="about" prepend-icon="mdi-information-outline">About</v-tab>
          <v-tab v-if="bblock.examples?.length" prepend-icon="mdi-puzzle-outline" value="examples">
            Examples
          </v-tab>
          <v-tab value="json-schema" prepend-icon="mdi-code-json" v-if="bblock.schema">JSON Schema</v-tab>
          <v-tab value="openapi" prepend-icon="mdi-api" v-if="bblock.openAPIDocument">OpenAPI document</v-tab>
          <v-tab value="dependency-list" prepend-icon="mdi-file-tree" v-if="bblock.openAPIDocument">API dependencies</v-tab>
          <v-tab value="ontology" prepend-icon="mdi-semantic-web" v-if="bblock.ontology">Ontology</v-tab>
          <v-tab value="semantic-uplift" prepend-icon="mdi-semantic-web" v-if="bblock.ldContext">Semantic uplift</v-tab>
          <v-tab value="validation" prepend-icon="mdi-check" v-if="shaclRules">Validation</v-tab>
          <v-tab value="transforms" prepend-icon="mdi-file-swap" v-if="bblock.transforms?.length">Transforms</v-tab>
        </v-tabs>
        <v-card-text>
          <v-window disabled v-model="tab">
            <v-window-item value="about" class="tab-content-about pa-1" :transition="false" :reverse-transition="false">
              <v-row>
                <v-col>
                  <v-alert v-if="!bblock.validationPassed" type="error">
                    Examples or tests for this building block have validation errors
                    <div v-if="register?.validationReport" class="float-end" >
                      <v-btn
                        size="small"

                        :href="`${register.validationReport}#bblock-${bblock.itemIdentifier}`"
                        prepend-icon="mdi-clipboard-check-outline"
                        target="_blank"
                        :class="{ 'with-dropdown': bblock.testOutputs }"
                      >
                        Validation report
                      </v-btn>
                      <v-menu v-if="bblock.testOutputs" location="bottom end">
                        <template #activator="{ props }">
                          <v-btn size="small" v-bind="props" class="dropdown-button">
                            <v-icon>mdi-menu-down</v-icon>
                          </v-btn>
                        </template>
                        <v-list density="compact" style="padding: 0">
                          <v-list-item
                            density="compact"
                            :href="bblock.testOutputs"
                            target="_blank"
                          >
                            <v-icon>mdi-playlist-check</v-icon>
                            Test output files
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </div>
                    <div v-else class="float-end">
                      <v-btn class="float-end"
                             size="small"
                             v-if="!register?.validationReport && bblock.testOutputs"
                             :href="bblock.testOutputs"
                             prepend-icon="mdi-open-in-new"
                             target="_blank"
                      >
                        View test outputs
                      </v-btn>
                    </div>
                  </v-alert>
                </v-col>
              </v-row>
              <v-row v-if="bblock.description" >
                <v-col>
                  <v-card title="Description" class="bblock-description markdown-text">
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
                      <v-list-item v-if="bblock.gitRepository" title="Git information">
                        <dl class="ml-1">
                          <dt class="text-subtitle-2">Repository</dt>
                          <dd class="text-caption ml-1"><a :href="bblock.gitRepository" v-text="bblock.gitRepository" target="_blank"></a></dd>
                          <dt v-if="bblock.gitPath" class="text-subtitle-2">Path</dt>
                          <dd v-if="bblock.gitPath" class="ml-1">
                            <pre class="text-caption"><code><a v-if="bblock.gitRepository.startsWith('https://github.com/')" :href="`${bblock.gitRepository}/blob/HEAD/${bblock.gitPath}`" v-text="bblock.gitPath"></a><span v-else>{{ bblock.gitPath }}</span></code></pre>
                          </dd>
                        </dl>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-col>
              </v-row>
            </v-window-item>

            <v-window-item
              v-if="bblock.examples?.length"
              value="examples"
              class="ma-1"
              :transition="false" :reverse-transition="false"
            >
              <v-alert v-if="bblock.semanticUplift?.additionalSteps?.length" type="info" variant="tonal" class="my-2">
                The RDF version of some or all of these examples may have require additional
                steps other than simply using a JSON-LD context.
                View <a href="#" @click.prevent="tab = 'semantic-uplift'" class="text-primary">Semantic uplift</a> for more information.
              </v-alert>
              <v-expansion-panels multiple v-model="expandedExamples">
                <template
                  v-for="(example, exampleIdx) in bblock.examples"
                  :key="exampleIdx"
                >
                  <v-expansion-panel
                    :value="exampleIdx"
                    v-if="example.content?.length || example.snippets?.length"
                    :id="`example-panel-${exampleIdx}`"
                  >
                    <v-expansion-panel-title>
                      {{ example.title }}
                      <v-spacer></v-spacer>
                      <language-tabs
                        v-if="$vuetify.display.mdAndUp"
                        @click.stop="nop"
                        :variant="($vuetify.display.lgAndUp && languageTabs.length < 5) ? 'buttons' : 'dropdown'"
                        v-model="selectedLanguageTabs[exampleIdx]"
                        :languages="languageTabs"
                      />
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <example-viewer
                        :bblock="bblock"
                        :example="example"
                        :language="languageTabs.find(l => l.id === selectedLanguageTabs[exampleIdx])"
                        :source-files-url="bblock.sourceFiles"
                      >
                        <template #before-code v-if="!$vuetify.display.mdAndUp">
                          <language-tabs v-model="languageTabs[exampleIdx]" :languages="languageTabs" variant="dropdown" />
                        </template>
                      </example-viewer>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </template>
              </v-expansion-panels>
            </v-window-item>
            <v-window-item value="json-schema" :transition="false" :reverse-transition="false">
              <json-schema-viewer :bblock="bblock"></json-schema-viewer>
            </v-window-item>
            <v-window-item value="openapi" :transition="false" :reverse-transition="false">
              <open-api-document-viewer :bblock="bblock"></open-api-document-viewer>
            </v-window-item>
            <v-window-item value="dependency-list" :transition="false" :reverse-transition="false">
              <dependency-list :bblock="bblock"></dependency-list>
            </v-window-item>
            <v-window-item value="ontology" :transition="false" :reverse-transition="false">
              <ontology-viewer :bblock="bblock"></ontology-viewer>
            </v-window-item>
            <v-window-item v-if="bblock.ldContext" value="semantic-uplift" :transition="false" :reverse-transition="false">
              <semantic-uplift :bblock="bblock"></semantic-uplift>
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
            <v-window-item
              value="transforms"
              :transition="false"
              :reverse-transition="false"
              v-if="bblock.transforms?.length"
            >
              <transforms-viewer :bblock="bblock"></transforms-viewer>
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
            <v-chip class="ml-sm-3 mx-1" size="small" variant="flat">{{ getItemClassLabel(relatedBBlock.metadata.itemClass) }}</v-chip>
          </v-card-subtitle>
          <v-card-text>
            {{ relatedBBlock.metadata.abstract }}
            <p class="my-2 text-body-2" v-if="relatedBBlock.metadata.itemIdentifier === bblockId">This is the current building block.</p>
            <v-divider class="my-2"></v-divider>
            <div v-if="relatedBBlock.metadata.register">
              From register:
              <color-circle :color="relatedBBlock.metadata.register.color" class="mr-1"></color-circle>
              <strong>{{ relatedBBlock.metadata.register.name }}</strong>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :href="relatedBBlockLink"
              v-if="relatedBBlock.metadata.itemIdentifier !== bblockId && (relatedBBlock.metadata.local || showImported || relatedBBlock.metadata.documentation?.['bblocks-viewer'])"
              @click.prevent="openRelatedBBlock()"
            >
              Go to Building Block
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
import {interceptLinks, setBaseUrl} from "@/lib/utils";
import {getLabel as getItemClassLabel} from "@/models/itemClass";
import bblockService from '@/services/bblock.service';
import {knownLanguages} from "@/models/mime-types";
import ExampleViewer from "@/components/bblock/ExampleViewer.vue";
import {statuses} from "@/models/status";
import DependencyViewer from "@/components/bblock/DependencyViewer.vue";
import configService from "@/services/config.service";
import LanguageTabs from "@/components/bblock/LanguageTabs.vue";
import JsonSchemaViewer from "@/components/bblock/JsonSchemaViewer.vue";
import ColorCircle from "@/components/ColorCircle.vue";
import CopyToClipboardButton from "@/components/CopyToClipboardButton.vue";
import OpenApiDocumentViewer from "@/components/bblock/OpenApiDocumentViewer.vue";
import DependencyList from "@/components/bblock/DependencyList.vue";
import OntologyViewer from "@/components/bblock/OntologyViewer.vue";
import SemanticUplift from "@/components/bblock/SemanticUplift.vue";
import {useNavigationStore} from "@/stores/navigation";
import TransformsViewer from "@/components/bblock/TransformsViewer.vue";

const navigationStore = useNavigationStore();

export default {
  components: {
    TransformsViewer,
    SemanticUplift,
    OntologyViewer,
    DependencyList,
    CopyToClipboardButton,
    ColorCircle,
    JsonSchemaViewer,
    LanguageTabs,
    DependencyViewer,
    ExampleViewer,
    OpenApiDocumentViewer,
  },
  props: {
    bblockId: String,
  },
  data() {
    return {
      bblock: null,
      loading: false,
      howToTab: 'schema',
      tab: 'about',
      languageTabs: [],
      selectedLanguageTabs: [],
      expandedExamples: [],
      shaclRules: null,
      allBBlocks: {},
      relatedBBlock: {
        show: false,
        metadata: null,
      },
      showImported: !!configService.config.showImported,
      registers: {},
    };
  },
  mounted() {
    this.loadBBlock();
    bblockService.getBBlocks(true)
      .then(bblocks => {
        this.allBBlocks = bblocks;
      });
    bblockService.getRegisters(true)
      .then(registers => {
        this.registers = registers;
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
    relatedBBlockLink() {
      return this.relatedBBlock.metadata?.documentation?.['bblocks-viewer']?.url;
    },
    register() {
      if (!this.bblock && !this.registers) {
        return null;
      }
      return this.registers[this.bblock.register.url];
    },
    contextNavigationWatched() {
      return {
        tab: this.tab,
        bblock: this.bblock,
      };
    },
  },
  methods: {
    getItemClassLabel,
    loadBBlock() {
      if (!this.bblockId || this.bblock?.itemIdentifier === this.bblockId) {
        return;
      }
      this.tab = this.$route.params?.section || 'about';
      this.loading = true;
      this.languageTabs = [];
      this.selectedLanguageTabs = [];
      this.expandedExamples = [];
      bblockService.fetchBBlock(this.bblockId)
        .then(data => {
          const addedLanguages = new Set();
          if (data.examples && data.examples.length) {
            data.examples.forEach((example, exampleIdx) => {
              let selectedLanguageTab;
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
                if (!selectedLanguageTab) {
                  selectedLanguageTab = snippet.language.id;
                }
                if (!addedLanguages.has(lang.id)) {
                  this.languageTabs.push(lang);
                  addedLanguages.add(lang.id);
                }
                if (selectedLanguageTab) {
                  this.selectedLanguageTabs.push(selectedLanguageTab);
                }
              });
              this.expandedExamples.push(exampleIdx);
            });
            this.languageTabs.sort((a, b) =>
              a.order === b.order ? a.label.localeCompare(b.label) : a.order - b.order
            );

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
    interceptLinks,
    dependencyNodeClick(bblockId) {
      const bblock = this.allBBlocks[bblockId];
      if (bblock) {
        this.relatedBBlock.metadata = bblock;
        this.relatedBBlock.show = true;
      }
    },
    openRelatedBBlock() {
      if (this.relatedBBlock.metadata) {
        if (bblockService.isShown(this.relatedBBlock.metadata)) {
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
    nop: () => {},
    scrollToExample(example) {
      const top = document.getElementById(`example-panel-${example.idx}`).getBoundingClientRect().top;
      const headerHeight = document.querySelector('header').offsetHeight;
      window.scrollTo(0, window.scrollY + top - headerHeight);
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
    contextNavigationWatched() {
      if (this.tab === 'examples' && this?.bblock?.examples?.length) {
        navigationStore.setItems(
          this.bblock.examples.map((e, idx) => ({ title: e.title, idx})),
          this.scrollToExample,
        )
      } else {
        navigationStore.clearItems();
      }
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

.with-dropdown {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.dropdown-button {
  min-width: 2em;
  padding: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
