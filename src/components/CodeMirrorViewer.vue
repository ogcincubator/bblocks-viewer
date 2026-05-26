<template>
  <div ref="el" class="cm-viewer"></div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { EditorView, lineNumbers, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { foldGutter, foldKeymap, bracketMatching } from '@codemirror/language';
import { defaultKeymap } from '@codemirror/commands';
import { githubLight } from '@fsegurai/codemirror-theme-github-light';
import { json } from '@codemirror/lang-json';
import { yaml } from '@codemirror/lang-yaml';

const props = defineProps({
  code: { type: String, required: true },
  language: { type: String, required: true },
});

const langExtension = { json: json(), yaml: yaml() };

const el = ref(null);
let view = null;

function buildState(doc) {
  const lang = langExtension[props.language] ?? json();
  return EditorState.create({
    doc,
    extensions: [
      EditorState.readOnly.of(true),
      githubLight,
      lineNumbers(),
      foldGutter({
        markerDOM(open) {
          const span = document.createElement('span');
          span.className = 'cm-fold-marker';
          span.textContent = open ? '⊟' : '⊞';
          return span;
        },
      }),
      bracketMatching(),
      lang,
      keymap.of([...defaultKeymap, ...foldKeymap]),
      EditorView.theme({
        '&': { fontSize: '0.85em' },
        '.cm-content': { fontFamily: 'monospace', padding: '8px 0' },
        '.cm-fold-marker': { cursor: 'pointer', fontSize: '1.1em', lineHeight: '1', userSelect: 'none' },
        '.cm-lineNumbers .cm-gutterElement': { padding: '0 8px' },
      }),
    ],
  });
}

onMounted(() => {
  view = new EditorView({ state: buildState(props.code), parent: el.value });
});

onBeforeUnmount(() => {
  view?.destroy();
});

watch(() => props.code, (code) => view?.setState(buildState(code)));
watch(() => props.language, () => view?.setState(buildState(props.code)));
</script>

<style>
.cm-viewer .cm-editor {
  outline: none;
}
.cm-viewer .cm-scroller {
  overflow: auto;
}
</style>