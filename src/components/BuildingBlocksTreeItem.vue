<script setup>
import {computed, inject} from "vue";
import {getLabel as getItemClassLabel} from "@/models/itemClass";
import StatusChip from "@/components/StatusChip.vue";

const props = defineProps({
  node: {
    type: Object,
    required: true,
  },
  path: {
    type: Array,
    required: true,
  },
  // Only worth showing when the tree mixes bblocks from more than one
  // register -- see BuildingBlocksTree.vue.
  showRegisterDot: {
    type: Boolean,
    default: true,
  },
});

const bblock = computed(() => props.node.bblock);
const segment = computed(() => props.path[props.path.length - 1]);
const childrenKeys = computed(() => {
  if (!props.node.children) {
    return [];
  }
  return Object.keys(props.node.children).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
});
// A node can be a building block *and* a folder at once (e.g. "ogc.a" is a
// bblock while "ogc.a.b" also exists) -- the two are independent facts.
const isFolder = computed(() => childrenKeys.value.length > 0);
const pathKey = computed(() => props.path.join('.'));

// Open state is centralized in the tree's store (see BuildingBlocksTree.vue)
// so it can be shared across nodes and persisted -- nodes follow the store's
// default open/closed state unless this path has its own override.
const treeStore = inject('treeStore', null);
const open = computed({
  get: () => {
    if (!treeStore) {
      return true;
    }
    const override = treeStore.overrides[pathKey.value];
    return override === undefined ? treeStore.defaultOpen : override;
  },
  set: v => treeStore?.setOpen(pathKey.value, v),
});
const folderIcon = computed(() => open.value ? 'mdi-folder-open' : 'mdi-folder');

function toggle() {
  if (isFolder.value) {
    open.value = !open.value;
  }
}

const itemClassLabel = computed(() => bblock.value ? getItemClassLabel(bblock.value.itemClass) : null);
const bblockTitle = computed(() => {
  if (!bblock.value) {
    return null;
  }
  return bblock.value.abstract
    ? `${bblock.value.itemIdentifier}\n\n${bblock.value.abstract}`
    : bblock.value.itemIdentifier;
});
</script>
<template>
  <div class="tree-node">
    <div v-if="path.length" class="tree-row d-flex align-center">
      <v-icon
        v-if="isFolder"
        class="chevron"
        :class="{ 'chevron-open': open }"
        size="18"
        @click.stop="toggle"
      >mdi-chevron-right</v-icon>
      <span v-else class="chevron-spacer"></span>

      <router-link
        v-if="bblock"
        class="tree-item tree-item-bblock"
        :title="bblockTitle"
        :to="{ name: 'BuildingBlock', params: { id: bblock.itemIdentifier } }"
      >
        <v-icon class="mr-2" size="18" color="primary">mdi-puzzle</v-icon>
        <code class="segment mr-2">{{ segment }}</code>
        <span class="bblock-name text-medium-emphasis text-truncate">{{ bblock.name }}</span>
        <span class="version text-medium-emphasis ml-1">v{{ bblock.version }}</span>
      </router-link>

      <div
        v-else
        class="tree-item tree-item-folder"
        :title="path.join('.')"
        @click="toggle"
      >
        <v-icon class="mr-2" size="18" color="grey-darken-1">{{ folderIcon }}</v-icon>
        <code class="segment">{{ segment }}</code>
      </div>

      <!-- Kept outside the identity element above (link or folder label), so
           this whole group is flush with the row's right edge regardless of
           how wide the identity part is. -->
      <div class="tree-meta d-flex align-center">
        <template v-if="bblock">
          <span
            v-if="showRegisterDot"
            class="register-dot mr-2"
            :style="{ backgroundColor: bblock.register.color }"
            :title="bblock.register.name"
          ></span>
          <status-chip :status="bblock.status" size="x-small" class="mr-1"></status-chip>
          <v-chip size="x-small" variant="flat" color="default">{{ itemClassLabel }}</v-chip>
        </template>
        <!-- Reserved even on non-folder rows: a v-if here would make this
             slot's width come and go with the count chip itself, which then
             shifts the status/class chips on rows that do have one. -->
        <span class="count-slot ml-1">
          <v-chip v-if="isFolder" size="x-small" variant="text" class="count-chip">
            {{ childrenKeys.length }}
          </v-chip>
        </span>
      </div>
    </div>

    <div
      v-if="!path.length || open"
      class="tree-children"
      :class="{ 'tree-children-indent': path.length }"
    >
      <building-blocks-tree-item
        v-for="key of childrenKeys"
        :key="key"
        :path="[...props.path, key]"
        :node="props.node.children[key]"
        :show-register-dot="props.showRegisterDot">
      </building-blocks-tree-item>
    </div>
  </div>
</template>
<style scoped>
.tree-row {
  min-height: 34px;
}

.chevron {
  flex: 0 0 auto;
  cursor: pointer;
  border-radius: 4px;
  transition: transform 0.15s ease;
}

.chevron-open {
  transform: rotate(90deg);
}

.chevron-spacer {
  display: inline-block;
  width: 18px;
  flex: 0 0 auto;
}

.tree-item {
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  min-width: 0;
  padding: 4px 8px;
  margin-left: 2px;
  border-radius: 6px;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
}

.tree-meta {
  flex: 0 0 auto;
}

.tree-item-bblock:hover,
.tree-item-folder:hover {
  background-color: rgba(24, 103, 192, 0.08);
}

.tree-item-folder .segment,
.tree-item-bblock .segment {
  font-weight: 600;
}

.bblock-name {
  min-width: 0;
  font-size: 0.9em;
}

.version {
  font-size: 0.8em;
  white-space: nowrap;
}

.segment {
  background: none;
  padding: 0;
  color: inherit;
  white-space: nowrap;
}

.register-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex: 0 0 auto;
}

.count-slot {
  display: inline-flex;
  justify-content: flex-end;
  min-width: 28px;
  flex: 0 0 auto;
}

.count-chip {
  opacity: 0.7;
}

.tree-children-indent {
  margin-left: 9px;
  padding-left: 13px;
  border-left: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
