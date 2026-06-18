<template>
  <div class="cm-viewer-wrapper">
    <v-btn class="cm-expand-all-btn" icon="mdi-arrow-expand-vertical" size="x-small" variant="text"
           density="comfortable" title="Expand all" @click="expandAll" />
    <div ref="el" class="cm-viewer"></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { EditorView, lineNumbers, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { foldGutter, foldKeymap, foldEffect, bracketMatching, ensureSyntaxTree, unfoldAll } from '@codemirror/language';
import { defaultKeymap } from '@codemirror/commands';
import { githubLight } from '@fsegurai/codemirror-theme-github-light';
import { json } from '@codemirror/lang-json';
import { yaml } from '@codemirror/lang-yaml';

const props = defineProps({
  code: { type: String, required: true },
  language: { type: String, required: true },
  // Auto-fold first-level nested blocks only when doc exceeds this many lines
  autoFoldThreshold: { type: Number, default: 20 },
  // Only fold a nested block if it spans at least this many lines
  autoFoldMinNodeLines: { type: Number, default: 4 },
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

function tryFoldNode(state, node, effects) {
  const startLine = state.doc.lineAt(node.from);
  const endLine = state.doc.lineAt(node.to);
  if (endLine.number - startLine.number + 1 < props.autoFoldMinNodeLines) return;
  // Compute fold range directly (equivalent to CM's foldInside) to avoid
  // foldable()'s dependency on the lazy parser having reached this position.
  effects.push(foldEffect.of({ from: node.from + 1, to: node.to - 1 }));
}

function foldJsonObjectLevel(objNode, state, effects) {
  for (let prop = objNode.firstChild; prop; prop = prop.nextSibling) {
    if (prop.name !== 'Property') continue;
    const val = prop.lastChild;
    if (val && (val.name === 'Object' || val.name === 'Array')) tryFoldNode(state, val, effects);
  }
}

function foldJsonThroughArray(arrNode, state, effects) {
  for (let item = arrNode.firstChild; item; item = item.nextSibling) {
    if (item.name === 'Object') foldJsonObjectLevel(item, state, effects);
    else if (item.name === 'Array') foldJsonThroughArray(item, state, effects);
  }
}

function applyFirstLevelFolds(view) {
  const { state } = view;
  if (props.autoFoldThreshold <= 0 || state.doc.lines < props.autoFoldThreshold) return;

  const tree = ensureSyntaxTree(state, state.doc.length, 2000);
  if (!tree) return;
  const effects = [];

  if (props.language === 'json') {
    // JsonText > Object/Array (root). Arrays don't count as a nesting level on
    // their own (they're just containers), so we look through them to find
    // the objects they hold and fold those objects' first-level properties.
    const root = tree.topNode.firstChild;
    if (!root) return;
    if (root.name === 'Object') {
      foldJsonObjectLevel(root, state, effects);
    } else if (root.name === 'Array') {
      foldJsonThroughArray(root, state, effects);
    }
  } else if (props.language === 'yaml') {
    // Stream > Document > BlockMapping (root)
    const rootMapping = tree.topNode.firstChild?.firstChild;
    if (rootMapping?.name !== 'BlockMapping') return;
    for (let pair = rootMapping.firstChild; pair; pair = pair.nextSibling) {
      if (pair.name !== 'Pair') continue;
      const val = pair.lastChild;
      if (val && (val.name === 'BlockMapping' || val.name === 'BlockSequence')) tryFoldNode(state, val, effects);
    }
  }

  if (effects.length > 0) view.dispatch({ effects });
}

onMounted(() => {
  view = new EditorView({ state: buildState(props.code), parent: el.value });
  // Delay one tick so the parser has finished before we fold
  setTimeout(() => applyFirstLevelFolds(view), 0);
});

onBeforeUnmount(() => {
  view?.destroy();
});

function expandAll() {
  if (view) {
    unfoldAll(view);
  }
}

watch(() => props.code, (code) => {
  view?.setState(buildState(code));
  setTimeout(() => applyFirstLevelFolds(view), 0);
});
watch(() => props.language, () => {
  view?.setState(buildState(props.code));
  setTimeout(() => applyFirstLevelFolds(view), 0);
});
</script>

<style>
.cm-viewer .cm-editor {
  outline: none;
}
.cm-viewer .cm-scroller {
  overflow: auto;
}
</style>
