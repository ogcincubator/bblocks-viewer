<template>
  <div>
    <p class="mb-2">
      External resources declared by this building block:
    </p>
    <v-card
      v-for="group in groups"
      :key="group.role"
      class="ma-2"
    >
      <v-card-title class="text-subtitle-1">
        {{ group.label }}
        <v-chip size="x-small" class="ml-2" variant="tonal">{{ group.resources.length }}</v-chip>
      </v-card-title>
      <v-list-item
        v-for="(resource, i) in group.resources"
        :key="i"
        :href="resource.ref"
        target="_blank"
        prepend-icon="mdi-open-in-new"
        :title="resource.title || fileName(resource.ref)"
        :subtitle="resource.ref"
      >
        <template #append>
          <v-chip
            v-if="resource.conformsTo"
            :href="resource.conformsTo"
            target="_blank"
            size="small"
            variant="outlined"
            prepend-icon="mdi-check-decagram-outline"
            class="mr-2"
            @click.stop
          >
            conforms to
          </v-chip>
          <v-chip v-if="resource.format" size="small" variant="flat">{{ resource.format }}</v-chip>
        </template>
      </v-list-item>
    </v-card>
  </div>
</template>

<script setup>
import {computed} from 'vue';

const props = defineProps({
  bblock: {type: Object, required: true},
});

function roleLabel(role) {
  if (!role) {
    return 'Other';
  }
  // Specialized roles are full URIs: use the last path/fragment segment
  const name = /^[a-z][a-z0-9+.-]*:/i.test(role) ? role.split(/[#/]/).filter(Boolean).pop() : role;
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function fileName(url) {
  try {
    return decodeURIComponent(new URL(url).pathname.split('/').filter(Boolean).pop() || url);
  } catch {
    return url;
  }
}

const groups = computed(() => {
  const byRole = new Map();
  for (const resource of props.bblock.resources || []) {
    const role = resource.role || '';
    if (!byRole.has(role)) {
      byRole.set(role, {role, label: roleLabel(role), resources: []});
    }
    byRole.get(role).resources.push(resource);
  }
  return [...byRole.values()];
});
</script>
