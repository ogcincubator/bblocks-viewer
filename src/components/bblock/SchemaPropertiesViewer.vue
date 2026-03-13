<script setup>
import {computed, ref, watch} from 'vue';
import bblockService from '@/services/bblock.service';

const props = defineProps({
  bblock: {
    type: Object,
    default: null,
  },
});

const loading = ref(false);
const contents = ref(null);
const error = ref(null);
const hasLoaded = ref(false);

watch(() => props.bblock, (bblock) => {
  if (bblock && !hasLoaded.value && bblock.resolvedSchemaProperties) {
    hasLoaded.value = true;
    loading.value = true;
    bblockService.fetchDocumentByUrl(bblock, bblock.resolvedSchemaProperties)
      .then(data => contents.value = JSON.parse(data))
      .catch(err => error.value = err)
      .finally(() => loading.value = false);
  }
}, {immediate: true});

const SCHEMA_TYPE_COLORS = {
  string: 'green',
  integer: 'blue',
  number: 'blue',
  boolean: 'orange',
  object: 'purple',
  array: 'teal',
  null: 'grey',
};

// Flat list of all properties enriched with display data
const allProperties = computed(() => {
  if (!contents.value?.length) return [];

  const withChildren = new Set();
  for (const prop of contents.value) {
    const parts = prop.path.split('/');
    if (parts.length > 2) {
      withChildren.add(parts.slice(0, -1).join('/'));
    }
  }

  const originalIndex = new Map(contents.value.map((p, i) => [p.path, i]));
  const INF = contents.value.length;
  const sortKey = path => path.split('/').filter(Boolean)
    .map((_, i, parts) => originalIndex.get('/' + parts.slice(0, i + 1).join('/')) ?? INF);
  const sorted = [...contents.value].sort((a, b) => {
    const ka = sortKey(a.path), kb = sortKey(b.path);
    for (let i = 0; i < Math.min(ka.length, kb.length); i++) {
      if (ka[i] !== kb[i]) return ka[i] - kb[i];
    }
    return ka.length - kb.length;
  });

  const ownSource = `bblocks://${props.bblock.itemIdentifier}`;

  return sorted.map(prop => ({
    ...prop,
    name: prop.path.split('/').at(-1),
    depth: prop.path.split('/').length - 2,
    hasChildren: withChildren.has(prop.path),
    isOwn: prop.sources?.includes(ownSource),
    schemaTypeLabel: Array.isArray(prop.schema_type)
      ? prop.schema_type.join(' | ')
      : prop.schema_type,
    schemaTypeColor: SCHEMA_TYPE_COLORS[
      Array.isArray(prop.schema_type) ? prop.schema_type[0] : prop.schema_type
    ] ?? 'grey',
  }));
});

// Set of expanded property paths; creating a new Set on each change for reactivity
const expanded = ref(new Set());

// Initialise: expand all depth-0 nodes that have children
watch(allProperties, (props) => {
  if (!props.length) return;
  expanded.value = new Set(
    props.filter(p => p.depth === 0 && p.hasChildren).map(p => p.path)
  );
}, {immediate: true});

const toggle = (path) => {
  const next = new Set(expanded.value);
  next.has(path) ? next.delete(path) : next.add(path);
  expanded.value = next;
};

const expandAll = () => {
  expanded.value = new Set(allProperties.value.filter(p => p.hasChildren).map(p => p.path));
};

const collapseAll = () => {
  expanded.value = new Set();
};

// Only show items whose full ancestor chain is expanded (depth-0 always visible)
const visibleProperties = computed(() => {
  return allProperties.value.filter(prop => {
    if (prop.depth === 0) return true;
    const parts = prop.path.split('/').filter(Boolean);
    for (let i = 1; i < parts.length; i++) {
      if (!expanded.value.has('/' + parts.slice(0, i).join('/'))) return false;
    }
    return true;
  });
});

const hasAnyExpandable = computed(() => allProperties.value.some(p => p.hasChildren));
</script>

<template>
  <div class="schema-properties-viewer px-1">
    <div v-if="loading" class="d-flex justify-center pa-6">
      <v-progress-circular indeterminate color="primary"/>
    </div>
    <v-alert v-else-if="error" type="error" class="ma-2">
      Failed to load schema properties.
    </v-alert>
    <template v-else-if="allProperties.length">
      <div v-if="hasAnyExpandable" class="d-flex pa-2 justify-end">
        <v-btn size="x-small" variant="tonal" prepend-icon="mdi-expand-all" @click="expandAll" class="mx-2">
          Expand all
        </v-btn>
        <v-btn size="x-small" variant="tonal" prepend-icon="mdi-collapse-all" @click="collapseAll">
          Collapse all
        </v-btn>
      </div>
      <v-list density="compact" lines="one">
        <v-list-item
          v-for="prop in visibleProperties"
          :key="prop.path"
          :style="{ paddingLeft: `${prop.depth * 20 + 16}px` }"
          :class="{ 'prop-own': prop.isOwn }"
        >
          <template #prepend>
            <v-icon
              v-if="prop.hasChildren"
              size="small"
              class="mr-1 expand-icon"
              :class="{ expanded: expanded.has(prop.path) }"
              @click.stop="toggle(prop.path)"
            >mdi-chevron-right</v-icon>
            <span v-else class="expand-placeholder"></span>
          </template>
          <v-list-item-title>
            <span class="property-name" @click="prop.hasChildren && toggle(prop.path)">
              {{ prop.name }}
            </span>
            <span
              v-if="prop.hasChildren && !expanded.has(prop.path)"
              class="text-disabled text-body-2 ml-1"
            >{ … }</span>
            <v-chip
              v-if="prop.required"
              size="x-small"
              class="ml-2"
              color="red"
              variant="tonal"
              label
            >required</v-chip>
            <v-chip
              v-if="prop.schemaTypeLabel"
              size="x-small"
              class="ml-2"
              :color="prop.schemaTypeColor"
              variant="tonal"
              label
            >{{ prop.schemaTypeLabel }}</v-chip>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </template>
    <div v-else class="text-disabled pa-4">No properties found.</div>
  </div>
</template>

<style scoped>
.property-name {
  font-family: monospace;
  font-size: 0.9rem;
}

.prop-own .property-name {
  color: rgb(var(--v-theme-primary));
}

.expand-icon {
  cursor: pointer;
  transition: transform 0.15s ease;
}

.expand-icon.expanded {
  transform: rotate(90deg);
}

.expand-placeholder {
  display: inline-block;
  width: 20px;
}
</style>
