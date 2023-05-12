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
    };
  },
  mounted() {
    this.loadBBlock();
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
</style>
