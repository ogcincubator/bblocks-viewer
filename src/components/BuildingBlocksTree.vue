<script setup>
import {computed, reactive, provide} from "vue";
import BuildingBlocksTreeItem from "@/components/BuildingBlocksTreeItem.vue";
import configService from "@/services/config.service";

const props = defineProps({
  bblocks: {
    type: Array,
    required: true,
  }
});

const tree = computed(() => {
  if (!props.bblocks) {
    return null;
  }

  const root = {'children': {}};

  for (const bblock of props.bblocks) {
    const components = bblock.itemIdentifier.split('.');
    let childNode = root;
    for (const comp of components) {
      if (!Object.hasOwn(childNode['children'], comp)) {
        childNode['children'][comp] = {'children': {}};
      }
      childNode = childNode['children'][comp];
    }
    childNode['bblock'] = bblock;
  }

  return root;
});

// The register color dot only carries information when the tree actually
// mixes bblocks from more than one register (e.g. showImported is on).
const showRegisterDot = computed(() => new Set(props.bblocks.map(b => b.register?.url)).size > 1);

// Open/closed state: a `defaultOpen` flag plus per-path `overrides` that only
// need to record entries which *differ* from the current default. This way
// Expand All / Collapse All are O(1) (just flip the default and clear the
// overrides) and stay correct even if the tree's contents change afterwards
// (e.g. the list gets filtered), instead of having to snapshot every path
// that happens to exist at the moment the button is clicked.
//
// Persists per register in localStorage so re-visiting the tree keeps the
// shape you left it in.
const storageKey = `bblocksTreeState:${configService.register}`;

function loadState() {
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed?.defaultOpen === 'boolean' && parsed?.overrides && typeof parsed.overrides === 'object') {
        return parsed;
      }
    }
  } catch {
    // ignore malformed/inaccessible storage, fall through to the default below
  }
  return {defaultOpen: true, overrides: {}};
}

const state = reactive(loadState());

function persist() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
    // localStorage may be unavailable (private browsing, quota exceeded, etc.);
    // toggling still works for the current session, it just won't be remembered.
  }
}

function clearOverrides() {
  for (const key of Object.keys(state.overrides)) {
    delete state.overrides[key];
  }
}

function setOpen(path, isOpen) {
  if (isOpen === state.defaultOpen) {
    delete state.overrides[path];
  } else {
    state.overrides[path] = isOpen;
  }
  persist();
}

function expandAll() {
  state.defaultOpen = true;
  clearOverrides();
  persist();
}

function collapseAll() {
  state.defaultOpen = false;
  clearOverrides();
  persist();
}

provide('treeStore', {
  // Getter (not a plain property) so reads stay reactive for consumers even
  // though this object literal itself isn't wrapped in reactive()/computed().
  get defaultOpen() {
    return state.defaultOpen;
  },
  overrides: state.overrides,
  setOpen,
});
</script>
<template>
  <div v-if="tree" class="building-blocks-tree">
    <div class="tree-toolbar d-flex align-center mb-3">
      <span class="text-medium-emphasis text-body-2">{{ bblocks.length }} building block{{ bblocks.length === 1 ? '' : 's' }}</span>
      <v-spacer></v-spacer>
      <v-btn
        size="small" variant="text" density="comfortable"
        prepend-icon="mdi-arrow-expand-vertical"
        @click="expandAll"
      >Expand all</v-btn>
      <v-btn
        size="small" variant="text" density="comfortable"
        prepend-icon="mdi-arrow-collapse-vertical"
        @click="collapseAll"
      >Collapse all</v-btn>
    </div>
    <building-blocks-tree-item :path="[]" :node="tree" :show-register-dot="showRegisterDot"></building-blocks-tree-item>
  </div>
</template>
<style scoped>
.tree-toolbar {
  padding: 0 0.25rem;
}
</style>
