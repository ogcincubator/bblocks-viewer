<template>
  <pre class="code-viewer"><code v-html="output"></code></pre>
</template>
<script>
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
//import hljsDefineTurtle from '@/lib/hljs/turtle';
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
    }
  },
  data() {
    const highlighter = hljs.newInstance();
    registerLanguages(highlighter);
    //highlighter.registerLanguage('turtle', hljsDefineTurtle);
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
      try {
        return this.highlighter.highlight(this.code, {
          language: this.knownLang,
        }).value;
      } catch (e) {
        console.log('Error highlighting code', e);
        return this.code;
      }
    },
  },
}
</script>
