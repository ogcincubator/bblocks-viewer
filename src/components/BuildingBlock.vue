<template>
  <div>
    <div class="text-center my-4">
      <v-progress-circular
        v-if="loading"
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </div>
    <template v-if="!loading && bblock">
      <h2>{{ bblock.name }}</h2>
      <p class="my-2">{{ bblock.abstract }}</p>
      <v-expansion-panels class="pa-2" multiple>
        <v-expansion-panel v-if="bblock.description" title="Full description">
          <v-expansion-panel-text>
            <div class="description" v-html="description"></div>
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
  </div>
</template>

<script>
import {marked} from 'marked';
import bblockService from '@/services/bblock.service';

export default {
  props: {
    bblockId: String,
  },
  data() {
    return {
      bblock: null,
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
    },
    description() {
      return this.bblock && this.bblock.description && marked.parse(this.bblock.description);
    },
  },
  methods: {
    loadBBlock() {
      if (!this.bblockId || this.bblock?.itemIdentifier === this.bblockId) {
        return;
      }
      this.loading = true;
      bblockService.getBBlock(this.bblockId)
        .then(data => {
          this.bblock = data;
          this.$emit('load', data);
        })
        .finally(() => {
          this.loading = false;
        })
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
  * {
    padding: revert;
    margin: revert;
  }
}
.how-to .v-tab {
  text-transform: none !important;
}
.monospace {
  font-family: monospace;
}
</style>
