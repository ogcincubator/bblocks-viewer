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
        <v-btn size="small" prepend-icon="mdi-open-in-new" :href="slateLink" target="_blank" color="secondary">
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
          <v-tab v-if="bblock.examples && bblock.examples.length" prepend-icon="mdi-puzzle-outline" value="examples">Examples</v-tab>
          <v-tab value="json-schema" prepend-icon="mdi-code-json">JSON Schema</v-tab>
          <v-tab value="json-ld" prepend-icon="mdi-semantic-web">JSON-LD context</v-tab>
          <v-tab value="validation" prepend-icon="mdi-check">Validation</v-tab>
        </v-tabs>
        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="about" class="tab-content-about pa-1">
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

            <v-window-item v-if="bblock.examples && bblock.examples.length" value="examples" class="ma-1">
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
            <v-window-item value="json-schema">
            </v-window-item>
            <v-window-item value="json-ld">
            </v-window-item>
            <v-window-item value="validation">
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
                <p>If you have additional JSON-LD that you would like to use, just add it to the <code>@context</code> array above,
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

const KNOWN_LANGS = {
  'json': { id: 'json', order: 0, label: 'JSON' },
  'yaml': { id: 'yaml', order: 1, label: 'YAML' },
  'jsonld': { id: 'jsonld', order: 3, label: 'JSON-LD', highlight: 'json' },
  'turtle': { id: 'turtle', order: 4, label: 'RDF/Turtle' },
  'plaintext': { id: 'plaintext', order: 5, label: 'Plain text' },
  'java': { id: 'java', order: 6, label: 'Java' },
  'python': { id: 'python', order: 7, label: 'Python' },
  'javascript': { id: 'javascript', order: 8, label: 'Javascript' },

  'ttl': 'turtle',
  'json-ld': 'jsonld',
  'yml': 'yaml',
  'txt': 'plaintext',
  'js': 'javascript',
  'rdf/turtle': 'turtle',
  'application/json': 'json',
  'application/yaml': 'yaml',
};

export default {
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
          newClosing = i === 6 ? '</div>' : `</h${i+1}>`;
        for (let h of doc.getElementsByTagName(`h${i}`)) {
          h.outerHTML = `${newTag}${h.innerHTML}${newClosing}`;
        }
      }
      return doc.body.innerHTML;
    },
    slateLink() {
      return this.bblock && bblockService.getBBlockSlateLink(this.bblockId);
    }
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
                let lang = KNOWN_LANGS[snippet.language];
                if (typeof lang === 'string') {
                  lang = KNOWN_LANGS[lang];
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

          this.bblock = data;
          this.$emit('load', this.bblock);
          console.log(data);
        })
        .finally(() => {
          this.loading = false;
        })
    },
    copyToClipboard(text) {
      navigator?.clipboard?.writeText(text);
    },
    md2html(s) {
      return marked(s);
    },
  },
  watch: {
    bblock() {
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

<style lang="scss" >
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
</style>
