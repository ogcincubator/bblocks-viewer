<template>
  <pre class="code-viewer"><code v-html="output"></code></pre>
</template>
<script>
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import {getHighlightLanguage} from "@/models/mime-types";
import {registerLanguages} from "@/lib/hljs/utils";

export default {
  props: {
    autolink: {
      type: Boolean,
      default: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    highlight: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    const highlighter = hljs.newInstance();
    registerLanguages(highlighter);
    return {
      highlighter,
    };
  },
  mounted() {

  },
  computed: {
    knownLang() {
      return getHighlightLanguage(this.language);
    },
    output() {
      if (!this.highlight) {
        return this.code;
      }
      try {
        const output = this.highlighter.highlight(this.code, {
          language: this.knownLang,
        }).value;
        this.$emit('highlight', output);
        return output;
      } catch (e) {
        console.log('Error highlighting code', e);
        return this.code;
      }
    },
  },
}
</script>
