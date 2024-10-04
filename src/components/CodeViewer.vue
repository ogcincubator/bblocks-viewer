<template>
  <pre class="code-viewer" @click.prevent="click"><code v-html="output"></code></pre>
</template>
<script>
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import {getHighlightLanguage} from "@/models/mime-types";

const hljsPromise = (async() => {
  const {autolink, registerLanguages} = await import("@/lib/hljs/utils");
  const highlighter = hljs.newInstance();
  registerLanguages(highlighter);
  return {
    autolink, highlighter,
  };
})();

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
      default: 'text',
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
    return {
      highlighter: null,
      autolinkFunction: null,
    };
  },
  created() {
    hljsPromise.then(({autolink, highlighter}) => {
      this.highlighter = highlighter;
      this.autolinkFunction = autolink;
    })
  },
  computed: {
    knownLang() {
      return getHighlightLanguage(this.language);
    },
    output() {
      if (!this.highlighter) {
        return null;
      }
      if (!this.highlight) {
        return this.code;
      }
      try {
        let output = this.highlighter.highlight(this.code, {
            language: this.knownLang,
          }).value;
        if (this.autolink) {
          output = this.autolinkFunction(output, this.knownLang)
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
