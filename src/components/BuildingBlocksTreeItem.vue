<script setup>
import {computed} from "vue";
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
});
const icon = computed(() => props.node.bblock ? 'mdi-puzzle' : 'mdi-folder');
const childrenKeys = computed(() => {
  if (!props.node.children) {
    return [];
  }
  return Object.keys(props.node.children).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
});
const bblock = computed(() => props.node.bblock);
</script>
<template>
  <div :class="{'ml-5': props.path?.length, 'my-2': props.path?.length}">
    <div v-if="props.path?.length" class="d-flex">
      <div v-if="props.path?.length > 1">
        <v-icon class="mr-1">mdi-subdirectory-arrow-right</v-icon>
      </div>
      <v-card v-if="bblock" :to="{ name: 'BuildingBlock', params: { id: bblock.itemIdentifier } }">
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
      <div v-else class="d-flex" :class="{ bblock }">
        <div>
          <v-icon class="mr-1">{{ icon }}</v-icon>
        </div>
        <div class="flex-grow-1">
          <v-tooltip :text="path.join('.')">
            <template #activator="{ props: tooltipProps }">
              <code v-bind="tooltipProps">{{ props.path[props.path.length - 1] }}</code>
            </template>
          </v-tooltip>
        </div>
      </div>
    </div>
    <building-blocks-tree-item
      v-for="key of childrenKeys"
      :key="key"
      :path="[...props.path, key]"
      :node="props.node.children[key]">
    </building-blocks-tree-item>
  </div>
</template>
<style>
.bblock {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0.3em 0.5em;
}
</style>
