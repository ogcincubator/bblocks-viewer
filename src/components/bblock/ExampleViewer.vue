<template>
  <v-container v-if="example.content || example.snippets?.length">
    <v-row>
      <v-col cols="12" :md="example.snippets?.length ? 6 : 12" v-if="example.content">
        <div
          class="example-content"
          v-html="md2html(example.content, this.sourceFilesUrl)"
          @click.prevent="interceptLinks"
        >
        </div>
      </v-col>
      <v-col cols="12" :md="example.content ? 6 : 12" v-if="example.snippets?.length">
        <template v-if="currentSnippet">
          <slot name="before-code"></slot>
          <div style="max-height: 30em; overflow-y: auto">
            <code-viewer
              :code="currentSnippet.highlighted || currentSnippet.code"
              :language="currentSnippet.language.highlight || currentSnippet.language.id"
              :highlight="!currentSnippet.highlighted"
              @highlight="currentSnippet.highlighted = $event"
            >
            </code-viewer>
          </div>
          <div class="text-right mt-2">
            <v-btn
              v-if="currentSnippet.url"
              :href="currentSnippet.url"
              target="_blank"
              prepend-icon="mdi-open-in-new"
              class="ml-1"
              color="primary"
              variant="flat"
            >
              Open in new window
            </v-btn>
          </div>
        </template>
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
.example-content {
  * {
    max-width: 100%;
  }

  p {
    margin-bottom: 0.4rem;
  }

  img {
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
  }
}
</style>
<script>
import {interceptLinks, md2html} from "@/lib/utils";
import CodeViewer from "@/components/CodeViewer.vue";

export default {
  components: {CodeViewer},
  props: {
    example: Object,
    language: Object,
    sourceFilesUrl: String,
  },
  methods: {
    md2html,
    interceptLinks,
  },
  computed: {
    currentSnippet() {
      return this.example?.snippets?.find(s => !s.language || s.language.id === this.language.id);
    },
  },
}
</script>
