<template>
  <v-container v-if="example.content || example.snippets?.length" class="px-0 mx-0" fluid>
    <v-row>
      <v-col cols="12" :md="example.snippets?.length ? 6 : 12" v-if="example.content">
        <div
          class="example-content markdown-text"
          v-html="md2html(example.content, this.sourceFilesUrl)"
          @click.prevent="interceptLinks"
        >
        </div>
        <div v-if="currentSnippet?.ref && /^https?:\/\//.test(currentSnippet.ref)">
          This snippet was retrieved from <a :href="currentSnippet.ref" target="_blank">{{ currentSnippet.ref }}</a>.
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
              v-if="currentSnippet"
              @click="fullscreen = true"
              prepend-icon="mdi-fullscreen"
              class="ml-1"
              color="primary"
              variant="flat"
            >
              Full screen
            </v-btn>
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
            <v-btn
              v-if="currentSnippet.url && currentSnippet.language?.id === 'jsonld'"
              :href="`https://json-ld.org/playground/#startTab=tab-expanded&json-ld=${encodeURIComponent(currentSnippet.url)}`"
              target="_blank"
              class="ml-1"
              color="primary"
              variant="flat"
            >
              <template #prepend>
                <json-ld-icon width="18" height="18"></json-ld-icon>
              </template>
              JSON-LD Playground
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
      <v-dialog fullscreen v-model="fullscreen" v-if="currentSnippet">
        <v-card>
          <v-toolbar color="primary">
            <v-toolbar-title class="flex-grow-1">{{ fullscreenTitle }}</v-toolbar-title>
            <v-btn icon @click="fullscreen = false"><v-icon>mdi-close</v-icon></v-btn>
          </v-toolbar>
          <v-card-text style="overflow: scroll">
            <code-viewer
                :code="currentSnippet.highlighted || currentSnippet.code"
                :language="currentSnippet.language.highlight || currentSnippet.language.id"
                :highlight="!currentSnippet.highlighted"
              >
              </code-viewer>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>
<script>
import {interceptLinks, md2html} from "@/lib/utils";
import CodeViewer from "@/components/CodeViewer.vue";
import JsonLdIcon from '@/assets/json-ld-data-white.svg';

export default {
  components: {CodeViewer, JsonLdIcon},
  props: {
    example: Object,
    language: Object,
    sourceFilesUrl: String,
  },
  data() {
    return {
      fullscreen: false,
    }
  },
  methods: {
    md2html,
    interceptLinks,
  },
  computed: {
    currentSnippet() {
      return (this.language && this.example?.snippets?.find(s => !s.language || s.language.id === this.language.id))
        || this.example?.snippets?.[0];
    },
    fullscreenTitle() {
      if (this.currentSnippet?.language) {
        return `${this.example.title} (${this.currentSnippet.language.label})`
      } else {
        return this.example.title;
      }
    },
  },
}
</script>
<style lang="scss">
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
