<template>
  <div v-if="groups.length" class="bblock-relations d-flex flex-wrap align-center ga-x-4 ga-y-1">
    <div v-for="group in groups" :key="group.type" class="d-flex flex-wrap align-center ga-1">
      <span class="text-caption text-medium-emphasis">{{ group.label }}:</span>
      <v-chip
        v-for="target in group.targets"
        :key="target.id"
        size="small"
        variant="tonal"
        :color="target.known ? group.color : undefined"
        :prepend-icon="group.icon"
        :link="target.known"
        :title="target.known ? target.id : `${target.id} (not found in the loaded registers)`"
        :class="{'text-medium-emphasis': !target.known}"
        @click="target.known && emit('select', target.id)"
      >
        {{ target.name }}
      </v-chip>
    </div>
  </div>
</template>
<script setup>
import {computed} from 'vue';
import {bblockIdFromUri} from '@/lib/utils';
import {relations} from '@/models/relations';

const props = defineProps({
  bblock: {type: Object, required: true},
  // All known building blocks, keyed by itemIdentifier
  allBBlocks: {type: Object, default: () => ({})},
});
const emit = defineEmits(['select']);

// Each target is listed once, under its most specific relation (relations are ordered by
// specificity), mirroring how the dependency graph collapses duplicate edges.
const groups = computed(() => {
  const seen = new Set();
  return relations
    .map(relation => {
      const raw = props.bblock?.[relation.type] || (relation.type === 'isProfileOf' ? props.bblock?.profileOf : null);
      const targets = [];
      [].concat(raw || []).forEach(ref => {
        const id = bblockIdFromUri(ref);
        if (seen.has(id)) {
          return;
        }
        seen.add(id);
        const target = props.allBBlocks?.[id];
        targets.push({id, name: target?.name || id, known: !!target});
      });
      return {...relation, targets};
    })
    .filter(group => group.targets.length);
});
</script>
