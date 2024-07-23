<template>
  <pre class="code-viewer" @click.prevent="click"><code v-html="output"></code></pre>
</template>
<script>
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import {getHighlightLanguage} from "@/models/mime-types";
import {autolink, registerLanguages} from "@/lib/hljs/utils";

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
    openUrls: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    const highlighter = hljs.newInstance();
    registerLanguages(highlighter);
    return {
      highlighter,
    };
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
        let output = this.highlighter.highlight(this.code, {
            language: this.knownLang,
          }).value;
        if (this.autolink) {
          output = autolink(output, this.knownLang)
        }
        this.$emit('highlight', output);
        return output;
      } catch (e) {
        console.log('Error highlighting code', e);
        return this.code;
      }
    },
  },
  methods: {
    click(ev) {
      if (this.openUrls) {
        if (ev?.target?.attributes?.href?.value) {
          window.open(ev.target.attributes.href.value);
        }
      } else if (ev.target) {
        this.$emit('codeClick', {
          clickEvent: ev,
          target: ev.target,
          href: ev?.target?.attributes?.href?.value,
        });
      }
    },
  },
}
</script>
<style lang="scss">
.code-viewer span[href] {
  text-decoration: underline dotted;
  cursor: pointer;
}
</style>
