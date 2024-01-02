<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <div
          v-if="example.content"
          class="example-content"
          v-html="md2html(example.content)"
          @click.prevent="interceptLinks"
        >
        </div>
      </v-col>
      <v-col cols="12" :md="example.content ? 6 : 12">
        <pre
          v-if="currentSnippet"
          style="max-height: 30em; overflow-y: auto"
        ><code>{{ currentSnippet.code }}</code></pre>
        <v-card
          variant="outlined"
          style="opacity: 0.7"
          v-else
        >
          <v-card-text>
            This example has no code in
            <span v-if="language.label">{{language.label}}</span>
            <span v-else>this</span>
            format.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
</style>
<script>
import {interceptLinks, md2html} from "@/lib/utils";

export default {
  props: {
    example: Object,
    language: Object,
  },
  methods: {
    md2html,
    interceptLinks,
  },
  computed: {
    currentSnippet() {
      return this.example.snippets.find(s => s.language.id === this.language.id);
    },
  },
}
</script>
