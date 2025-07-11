<script setup>
import {computed} from "vue";
import BuildingBlocksTreeItem from "@/components/BuildingBlocksTreeItem.vue";

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
</script>
<template>
  <div v-if="tree" class="building-blocks-tree">
    <building-blocks-tree-item :path="[]" :node="tree"></building-blocks-tree-item>
  </div>
</template>
