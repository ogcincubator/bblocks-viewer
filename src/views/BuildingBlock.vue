<template>
  <v-card v-if="bblock">
    <v-card-text v-if="loading">
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-card-text>
    <template v-else>
      <v-card-text v-if="documentation">
        <div v-html="documentation">
        </div>
      </v-card-text>
      <template v-else>
        <v-card-title>{{ bblock.name }}</v-card-title>
        <v-card-text>{{ bblock.abstract }}</v-card-text>
      </template>
    </template>
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
      documentation: null,
      loading: false,
    };
  },
  mounted() {
    this.loadBBlock();
  },
  methods: {
    loadBBlock() {
      if (!this.bblock) {
        return;
      }
      if (this.bblock.documentation) {
        let docUrl = null;
        if (Array.isArray(this.bblock.documentation)) {
          docUrl = this.bblock.documentation.find(d => d.endsWith('.md'));
        } else if (this.bblock.documentation.endsWith('.md')) {
          docUrl = this.bblock.documentation;
        }
        if (docUrl) {
          this.loading = true;
          axios.get(docUrl)
            .then(resp => {
              this.documentation = marked.parse(resp.data);
            })
            .finally(() => {
              this.loading = false;
            });
        }
      }
    }
  },
  watch: {
    bblock() {
      this.loadBBlock();
    },
  },
}
</script>
