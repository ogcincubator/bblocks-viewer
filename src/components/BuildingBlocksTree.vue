<script setup>
import {computed, ref, provide} from "vue";
import BuildingBlocksTreeItem from "@/components/BuildingBlocksTreeItem.vue";

const props = defineProps({
  bblocks: {
    type: Array,
    required: true,
  }
});

const expandAllFlag = ref(0);
const collapseAllFlag = ref(0);

provide('expandAllFlag', expandAllFlag);
provide('collapseAllFlag', collapseAllFlag);

function expandAll() {
  expandAllFlag.value++;
}
function collapseAll() {
  collapseAllFlag.value++;
}

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
</script>
<template>
  <div v-if="tree" class="building-blocks-tree">
    <div class="d-flex justify-end mb-2">
      <v-btn size="small" variant="text" prepend-icon="mdi-unfold-more-horizontal" @click="expandAll">
        Expand All
      </v-btn>
      <v-btn size="small" variant="text" prepend-icon="mdi-unfold-less-horizontal" @click="collapseAll">
        Collapse All
      </v-btn>
    </div>
    <building-blocks-tree-item :path="[]" :node="tree"></building-blocks-tree-item>
  </div>
</template>
