<template>
  <pre class="code-viewer" @click.prevent="click"><code v-if="rawOutput" v-html="rawOutput"></code><code v-else>{{code}}</code></pre>
</template>
<script>
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/github.css';
import json from 'highlight.js/lib/languages/json';
import yaml from 'highlight.js/lib/languages/yaml';
import xml from 'highlight.js/lib/languages/xml';
import {getHighlightLanguage} from "@/models/mime-types";

const highlighter = hljs.newInstance();
highlighter.registerLanguage('json', json);
highlighter.registerLanguage('yaml', yaml);
highlighter.registerLanguage('xml', xml);

let _autolink = null;

async function prepare(lang) {
  const { loadLanguage, autolink } = await import("@/lib/hljs/utils");
  _autolink = autolink;
  await loadLanguage(highlighter, lang);
}

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
    rawCode: {
      type: String,
      required: false,
    },
    openUrls: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      langReady: false,
    };
  },
  created() {
    prepare(this.knownLang).then(() => { this.langReady = true; });
  },
  watch: {
    knownLang(lang) {
      this.langReady = false;
      prepare(lang).then(() => { this.langReady = true; });
    },
  },
  computed: {
    knownLang() {
      return getHighlightLanguage(this.language);
    },
    rawOutput() {
      if (this.rawCode) {
        return this.rawCode;
      }
      if (this.langReady && highlighter.getLanguage(this.knownLang)) {
        try {
          let output = highlighter.highlight(this.code, {
            language: this.knownLang,
          }).value;
          if (this.autolink) {
            output = _autolink(output, this.knownLang);
          }
          this.$emit('highlight', output);
          return output;
        } catch (e) {
          console.log('Error highlighting code', e);
        }
      }
      return false;
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
