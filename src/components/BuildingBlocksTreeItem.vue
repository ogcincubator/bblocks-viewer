<script setup>
import {computed, ref, inject, watch} from "vue";
import {getLabel as getItemClassLabel} from "@/models/itemClass";

const props = defineProps({
  node: {
    type: Object,
    required: true,
  },
  path: {
    type: Array,
    required: true,
  },
  defaultOpen: {
    type: Boolean,
    default: false,
  },
});
const childrenKeys = computed(() => {
  if (!props.node.children) {
    return [];
  }
  return Object.keys(props.node.children).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
});
const isFolder = computed(() => childrenKeys.value.length > 0);
const open = ref(props.path.length === 0 || props.defaultOpen);
const icon = computed(() => {
  if (props.node.bblock && !isFolder.value) return 'mdi-puzzle';
  return open.value ? 'mdi-folder-open' : 'mdi-folder';
});
const bblock = computed(() => props.node.bblock);

const expandAllFlag = inject('expandAllFlag', ref(0));
const collapseAllFlag = inject('collapseAllFlag', ref(0));

watch(expandAllFlag, () => {
  if (isFolder.value) {
    open.value = true;
  }
});
watch(collapseAllFlag, () => {
  if (isFolder.value && props.path.length > 0) {
    open.value = false;
  }
});

function toggle() {
  if (isFolder.value) {
    open.value = !open.value;
  }
}
</script>
<template>
  <div :class="{'ml-5': props.path?.length, 'my-2': props.path?.length}">
    <div v-if="props.path?.length" class="d-flex">
      <div v-if="props.path?.length > 1">
        <v-icon class="mr-1">mdi-subdirectory-arrow-right</v-icon>
      </div>
      <v-card v-if="bblock && !isFolder" :to="{ name: 'BuildingBlock', params: { id: bblock.itemIdentifier } }">
        <v-card-text class="text-body-1 py-1 px-3">
          <div class="d-flex">
            <v-icon class="mr-1">{{ icon }}</v-icon>
            <v-tooltip :text="bblock.itemIdentifier">
              <template #activator="{ props: tooltipProps }">
                <code v-bind="tooltipProps">{{ props.path[props.path.length - 1] }}</code>
              </template>
            </v-tooltip>
            <span class="flex-grow-1"></span>
            <div>
              <v-chip color="default" variant="flat" size="small">
                {{ getItemClassLabel(bblock.itemClass) }}
              </v-chip>
            </div>
          </div>
          <div class="flex-grow-1">
            <div v-if="bblock">
              <div>{{ bblock.name }} <small class="text-muted">v{{ bblock.version }}</small></div>
              <small class="abstract text-muted text-truncate">{{ bblock.abstract }}</small>
            </div>
          </div>
        </v-card-text>
      </v-card>
      <div v-else class="tree-folder d-flex align-center" @click="toggle">
        <v-icon v-if="isFolder" class="chevron mr-1" :class="{ 'chevron-open': open }" size="small">
          mdi-chevron-right
        </v-icon>
        <v-icon class="mr-1">{{ icon }}</v-icon>
        <div class="flex-grow-1">
          <v-tooltip :text="path.join('.')">
            <template #activator="{ props: tooltipProps }">
              <code v-bind="tooltipProps">{{ props.path[props.path.length - 1] }}</code>
            </template>
          </v-tooltip>
          <template v-if="bblock">
            <span class="ml-2 text-muted text-body-2">{{ bblock.name }}</span>
            <v-chip class="ml-2" color="default" variant="flat" size="x-small">
              {{ getItemClassLabel(bblock.itemClass) }}
            </v-chip>
          </template>
        </div>
        <v-chip v-if="isFolder" variant="text" size="x-small" class="ml-1 text-muted">
          {{ childrenKeys.length }}
        </v-chip>
      </div>
    </div>
    <div v-if="open">
      <building-blocks-tree-item
        v-for="key of childrenKeys"
        :key="key"
        :path="[...props.path, key]"
        :node="props.node.children[key]"
        :default-open="props.path.length === 0">
      </building-blocks-tree-item>
    </div>
  </div>
</template>
<style scoped>
.tree-folder {
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0.3em 0.5em;
  user-select: none;
}
.tree-folder:hover {
  background-color: rgba(0, 0, 0, 0.04);
}
.chevron {
  transition: transform 0.2s ease;
}
.chevron-open {
  transform: rotate(90deg);
}
</style>
