<template>
  <v-card v-if="bblock">
    <v-card-title>
      {{ bblock.name }}
    </v-card-title>
    <v-card-text v-if="loading">
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-card-text>
    <template v-else>
      <v-card-text>{{ bblock.abstract }}</v-card-text>
      <v-expansion-panels class="pa-2" multiple>
        <v-expansion-panel title="Full description" @group:selected="loadDescription()">
          <v-expansion-panel-text>
            <v-progress-circular
              v-if="description.loading"
              color="primary"
              indeterminate
              size="64"
            ></v-progress-circular>
            <div class="description" v-html="description.content"></div>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel title="Examples">
          <v-expansion-panel-text>
            <em>Coming soon...</em>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel title="Sources" v-if="bblock.sources && bblock.sources.length">
          <v-expansion-panel-text>
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
          </v-expansion-panel-text>
        </v-expansion-panel>
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
    </template>
    <slot name="bottom"></slot>
  </v-card>
</template>

<script>
import axios from 'axios';
import {marked} from 'marked';

export default {
  props: {
    bblock: Object,
  },
  data() {
    return {
      description: {
        content: null,
        loading: false,
      },
      loading: false,
      howToTab: 'schema',
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
    }
  },
  methods: {
    loadBBlock() {
      this.description = {
        content: null,
        loading: false,
      };
      if (!this.bblock) {
        return;
      }
    },
    loadDescription() {
      if (this.description.loading) {
        return;
      }
      this.description.loading = true;
      axios.get(this.bblock.sourceFiles + '/description.md')
        .then(resp => {
          this.description.content = marked.parse(resp.data);
        })
        .catch(e => {
          console.log('Error loading description', e);
          this.description.content = '';
        })
        .finally(() => {
          this.description.loading = false;
        });
    },
    copyToClipboard(text) {
      navigator?.clipboard?.writeText(text);
    },
  },
  watch: {
    bblock() {
      this.loadBBlock();
    },
  },
}
</script>

<style lang="scss" >
.description {
  p {
    margin-bottom: 0.6em;
  }
}
.how-to .v-tab {
  text-transform: none !important;
}
.monospace {
  font-family: monospace;
}
</style>
