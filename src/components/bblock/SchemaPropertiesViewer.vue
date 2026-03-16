<script setup>
import {computed, reactive, ref, watch} from 'vue';
import {useRouter} from 'vue-router';
import bblockService from '@/services/bblock.service';
import {fetchResource} from '@/services/linked-data.service';

const props = defineProps({
  bblock: {
    type: Object,
    default: null,
  },
});

const router = useRouter();

const loading = ref(false);
const contents = ref(null);
const error = ref(null);
const hasLoaded = ref(false);
const allBBlocks = ref({});

watch(() => props.bblock, (bblock) => {
  if (bblock && !hasLoaded.value && bblock.resolvedSchemaProperties) {
    hasLoaded.value = true;
    loading.value = true;
    Promise.all([
      bblockService.fetchDocumentByUrl(bblock, bblock.resolvedSchemaProperties),
      bblockService.getBBlocks(true),
    ])
      .then(([data, bblocks]) => {
        contents.value = JSON.parse(data);
        allBBlocks.value = bblocks;
      })
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

const KEYWORD_DISPLAY = {
  anyOf: 'any of',
  oneOf: 'one of',
  then: 'then',
  else: 'else',
  branch: null,  // branch nodes show their title directly, no badge
};

// Stable string key for a path array (null-byte join avoids slash ambiguity)
const pathKey = path => path.join('\x00');

const trimAbstract = (abstract) => {
  if (!abstract) return null;
  const firstSentence = abstract.match(/^.+?\.(?=\s|$)/s);
  const text = firstSentence ? firstSentence[0] : abstract;
  return text.length > 160 ? text.slice(0, 157) + '…' : text;
};

const bblockChips = computed(() => {
  const chips = {};
  for (const prop of allProperties.value) {
    for (const id of prop.foreignSources) {
      if (id in chips) continue;
      const bb = allBBlocks.value[id];
      const label = bb?.name ?? id.split('.').at(-1);
      const tooltip = trimAbstract(bb?.abstract);
      let href = null;
      if (bb) {
        if (bblockService.isShown(bb)) {
          href = router.resolve({name: 'BuildingBlock', params: {id}}).href;
        } else if (bb.documentation?.['bblocks-viewer']) {
          href = bb.documentation['bblocks-viewer'].url;
        }
      }
      chips[id] = {label, href, tooltip, external: href && !bblockService.isShown(bb)};
    }
  }
  return chips;
});

// Expand a ref'd entry: prepend basePath to each def entry's path, recursively
function expandRef(basePath, defKey, defs, visited = new Set()) {
  if (visited.has(defKey)) return [];
  visited = new Set(visited).add(defKey);
  const entries = defs[defKey] ?? [];
  const result = [];
  for (const entry of entries) {
    const fullPath = [...basePath, ...entry.path];
    result.push({...entry, path: fullPath});
    if (entry.ref) {
      result.push(...expandRef(fullPath, entry.ref, defs, visited));
    }
  }
  return result;
}

// Flat list of raw properties with ref'd subtrees expanded inline
const rawProperties = computed(() => {
  if (!contents.value) return [];
  const data = contents.value;
  const defs = data.defs ?? {};
  const props = Array.isArray(data) ? data : (data.properties ?? []);
  const result = [];
  for (const prop of props) {
    result.push(prop);
    if (prop.ref) {
      result.push(...expandRef(prop.path, prop.ref, defs));
    }
  }
  return result;
});

// Flat list of all properties enriched with display data
const allProperties = computed(() => {
  if (!rawProperties.value.length) return [];

  const withChildren = new Set();
  for (const prop of rawProperties.value) {
    if (prop.path.length > 1) {
      withChildren.add(pathKey(prop.path.slice(0, -1)));
    }
  }

  const originalIndex = new Map(rawProperties.value.map((p, i) => [pathKey(p.path), i]));
  const INF = rawProperties.value.length;
  const sortKey = path => path.map((_, i) => originalIndex.get(pathKey(path.slice(0, i + 1))) ?? INF);
  const sorted = [...rawProperties.value].sort((a, b) => {
    const ka = sortKey(a.path), kb = sortKey(b.path);
    for (let i = 0; i < Math.min(ka.length, kb.length); i++) {
      if (ka[i] !== kb[i]) return ka[i] - kb[i];
    }
    return ka.length - kb.length;
  });

  const ownSource = `bblocks://${props.bblock.itemIdentifier}`;

  return sorted.map(prop => {
    const pk = pathKey(prop.path);

    return {
      ...prop,
      pathKey: pk,
      // branch: use title (a, b, c…); group (anyOf/oneOf/…): no name, badge suffices
      name: prop.keyword === 'branch' ? prop.title
          : prop.keyword ? null
          : prop.path.at(-1),
      depth: prop.path.length - 1,
      hasChildren: withChildren.has(pk),
      isOwn: prop.sources?.includes(ownSource),
      foreignSources: (prop.sources ?? [])
        .filter(s => s !== ownSource && s.startsWith('bblocks://'))
        .map(s => s.slice(10)),
      schemaTypeLabel: Array.isArray(prop.schema_type)
        ? prop.schema_type.join(' | ')
        : prop.schema_type,
      schemaTypeColor: SCHEMA_TYPE_COLORS[
        Array.isArray(prop.schema_type) ? prop.schema_type[0] : prop.schema_type
      ] ?? 'grey',
    };
  });
});

// Set of expanded property paths; creating a new Set on each change for reactivity
const expanded = ref(new Set());

// Initialize: expand all depth-0 nodes that have children
watch(allProperties, (props) => {
  if (!props.length) return;
  expanded.value = new Set(
    props.filter(p => p.depth === 0 && p.hasChildren).map(p => p.pathKey)
  );
}, {immediate: true});

const toggle = (pk) => {
  const next = new Set(expanded.value);
  next.has(pk) ? next.delete(pk) : next.add(pk);
  expanded.value = next;
};

const expandAll = () => {
  expanded.value = new Set(allProperties.value.filter(p => p.hasChildren).map(p => p.pathKey));
};

const collapseAll = () => {
  expanded.value = new Set();
};

// Only show items whose full ancestor chain is expanded (depth-0 always visible)
const visibleProperties = computed(() => {
  return allProperties.value.filter(prop => {
    if (prop.depth === 0) return true;
    for (let i = 1; i < prop.path.length; i++) {
      if (!expanded.value.has(pathKey(prop.path.slice(0, i)))) return false;
    }
    return true;
  });
});

const hasAnyExpandable = computed(() => allProperties.value.some(p => p.hasChildren));
const hasAnySemantics = computed(() => allProperties.value.some(p => p.effectiveId));

const showSemantics = ref(true);

// ── Semantic lookup ─────────────────────────────────────────────────────────

const isHttpUri = uri => /^https?:\/\//.test(uri);

// keyed by prop.path → { status: 'loading'|'found'|'error', label, description, error }
const lookupResults = reactive({});

const doLookup = async (prop) => {
  lookupResults[prop.pathKey] = {status: 'loading'};
  try {
    const result = await fetchResource(prop.effectiveId);
    lookupResults[prop.pathKey] = {
      status: 'found',
      label: result.label,
      description: result.description,
    };
  } catch (e) {
    lookupResults[prop.pathKey] = {status: 'error', error: e.message || 'Lookup failed'};
  }
};

const DESCRIPTION_TRIM = 120;
const trimDescription = text =>
  text && text.length > DESCRIPTION_TRIM ? text.slice(0, DESCRIPTION_TRIM - 1) + '…' : text;
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
      <v-alert
        type="info"
        variant="tonal"
        density="compact"
        class="ma-2 text-caption"
        icon="mdi-flask-outline"
      >
        This view is a beta feature and may contain errors or omissions.
      </v-alert>
      <div v-if="hasAnyExpandable || hasAnySemantics" class="d-flex pa-2 justify-end align-center">
        <template v-if="hasAnyExpandable">
          <v-btn size="x-small" variant="tonal" prepend-icon="mdi-expand-all" @click="expandAll" class="mr-2">
            Expand all
          </v-btn>
          <v-btn size="x-small" variant="tonal" prepend-icon="mdi-collapse-all" @click="collapseAll">
            Collapse all
          </v-btn>
        </template>
        <template v-if="hasAnySemantics">
          <v-divider v-if="hasAnyExpandable" vertical class="mx-3"/>
          <v-btn
            size="x-small"
            variant="text"
            :active="showSemantics"
            active-color="primary"
            prepend-icon="mdi-semantic-web"
            @click="showSemantics = !showSemantics"
          >Semantics {{ showSemantics ? 'on' : 'off' }}</v-btn>
        </template>
      </div>
      <v-list density="compact">
        <v-list-item
          v-for="prop in visibleProperties"
          :key="prop.pathKey"
          :lines="!prop.keyword && prop.effectiveId && showSemantics ? 'two' : 'one'"
          :style="{ paddingLeft: `${prop.depth * 20 + 16}px` }"
          :class="{ 'prop-own': prop.isOwn, 'prop-branch': !!prop.keyword, 'prop-branch-leaf': prop.keyword === 'branch' }"
        >
          <template #prepend>
            <v-icon
              v-if="prop.hasChildren"
              size="small"
              class="mr-1 expand-icon"
              :class="{ expanded: expanded.has(prop.pathKey) }"
              @click.stop="toggle(prop.pathKey)"
            >mdi-chevron-right</v-icon>
            <span v-else class="expand-placeholder"></span>
          </template>
          <v-list-item-title>
            <span
              class="property-name"
              :class="{ 'branch-name': prop.keyword === 'branch' }"
              @click="prop.hasChildren && toggle(prop.pathKey)"
            >{{ prop.name ?? KEYWORD_DISPLAY[prop.keyword] }}</span>
            <span
              v-if="prop.hasChildren && !expanded.has(prop.pathKey)"
              class="text-disabled text-body-2 ml-1"
            >{ … }</span>
            <!-- group keyword badge (anyOf / oneOf / then / else) -->
            <v-chip
              v-if="prop.keyword && prop.keyword !== 'branch'"
              size="x-small"
              class="ml-2"
              color="blue-grey"
              variant="tonal"
              label
            >{{ KEYWORD_DISPLAY[prop.keyword] }}</v-chip>
            <template v-else-if="!prop.keyword">
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
            </template>
          </v-list-item-title>
          <v-list-item-subtitle v-if="!prop.keyword && prop.effectiveId && showSemantics" class="id-line">
            <a
              v-if="isHttpUri(prop.effectiveId)"
              :href="prop.effectiveId"
              target="_blank"
              class="uri-link"
            >{{ prop.effectiveId }}</a>
            <span v-else class="uri-plain">{{ prop.effectiveId }}</span>
            <!-- lookup button: shown until a successful result is cached -->
            <v-btn
              v-if="isHttpUri(prop.effectiveId) && lookupResults[prop.pathKey]?.status !== 'found'"
              icon
              size="x-small"
              variant="plain"
              density="compact"
              class="ml-1"
              :loading="lookupResults[prop.pathKey]?.status === 'loading'"
              :disabled="lookupResults[prop.pathKey]?.status === 'loading'"
              @click.stop="doLookup(prop)"
            >
              <v-icon size="small">mdi-magnify</v-icon>
            </v-btn>
            <!-- lookup result -->
            <template v-if="lookupResults[prop.pathKey]?.status === 'found'">
              <span v-if="lookupResults[prop.pathKey].label" class="lookup-label ml-2">
                {{ lookupResults[prop.pathKey].label }}
              </span>
              <template v-if="lookupResults[prop.pathKey].description">
                <v-tooltip
                  v-if="lookupResults[prop.pathKey].description.length > DESCRIPTION_TRIM"
                  :text="lookupResults[prop.pathKey].description"
                  max-width="320"
                  class="opaque-tooltip"
                >
                  <template #activator="{ props: tp }">
                    <span v-bind="tp" class="lookup-description ml-2">
                      {{ trimDescription(lookupResults[prop.pathKey].description) }}
                    </span>
                  </template>
                </v-tooltip>
                <span v-else class="lookup-description ml-2">
                  {{ lookupResults[prop.pathKey].description }}
                </span>
              </template>
            </template>
            <!-- lookup error -->
            <v-tooltip
              v-else-if="lookupResults[prop.pathKey]?.status === 'error'"
              :text="lookupResults[prop.pathKey].error"
              max-width="320"
            >
              <template #activator="{ props: tp }">
                <v-icon v-bind="tp" size="small" color="error" class="ml-1">
                  mdi-alert-circle-outline
                </v-icon>
              </template>
            </v-tooltip>
          </v-list-item-subtitle>
          <template #append>
            <div class="source-chips d-none d-sm-block">
              <!-- ≤ 2 sources: show chips inline -->
              <template v-if="prop.foreignSources.length < 3">
                <v-tooltip
                  v-for="id in prop.foreignSources"
                  :key="id"
                  :text="bblockChips[id]?.tooltip ?? id"
                  location="bottom"
                  max-width="320"
                  class="opaque-tooltip"
                >
                  <template #activator="{ props: tooltipProps }">
                    <v-chip
                      v-bind="tooltipProps"
                      :href="bblockChips[id]?.href"
                      :target="bblockChips[id]?.external ? '_blank' : undefined"
                      size="x-small"
                      class="ml-1"
                      variant="outlined"
                      label
                    >{{ bblockChips[id]?.label }}</v-chip>
                  </template>
                </v-tooltip>
              </template>
              <!-- ≥ 3 sources: collapsed "N sources" chip with dropdown -->
              <v-menu v-else location="bottom end" :close-on-content-click="false">
                <template #activator="{ props: menuProps }">
                  <v-chip
                    v-bind="menuProps"
                    size="x-small"
                    class="ml-1"
                    variant="outlined"
                    label
                    append-icon="mdi-chevron-down"
                  >{{ prop.foreignSources.length }} sources</v-chip>
                </template>
                <v-list density="compact" class="sources-dropdown">
                  <v-list-item
                    v-for="id in prop.foreignSources"
                    :key="id"
                    :href="bblockChips[id]?.href"
                    :target="bblockChips[id]?.external ? '_blank' : undefined"
                    :title="bblockChips[id]?.label ?? id"
                    :subtitle="bblockChips[id]?.tooltip"
                    class="sources-dropdown-item"
                  />
                </v-list>
              </v-menu>
            </div>
          </template>
        </v-list-item>
      </v-list>
    </template>
    <div v-else class="text-disabled pa-4">No properties found.</div>
  </div>
</template>

<style>
.opaque-tooltip .v-overlay__content {
  background: rgba(66, 66, 66, 1) !important;
}
</style>

<style scoped>
.property-name {
  font-family: monospace;
  font-size: 0.9rem;
}

.prop-own .property-name {
  color: rgb(var(--v-theme-primary));
}

/* group-level keyword node (anyOf / oneOf / then / else) */
.prop-branch:not(.prop-branch-leaf) {
  opacity: 0.75;
  font-style: italic;
}

/* leaf branch node (a / b / Geometry / …) */
.branch-name {
  font-family: monospace;
  font-size: 0.9rem;
  color: rgba(var(--v-theme-on-surface), 0.7);
}

.branch-bblock-id {
  font-size: 0.7rem;
  opacity: 0.6;
  margin-left: 0.4em;
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

.source-chips {
  text-align: right;
}

.sources-dropdown {
  min-width: 180px;
  max-width: 320px;
}

.sources-dropdown-item :deep(.v-list-item-subtitle) {
  white-space: normal;
}

.source-chips .v-chip {
  max-width: 140px;
}

.source-chips .v-chip :deep(.v-chip__content) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}

.id-line {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-width: 0;
  font-size: 0.75rem;
  opacity: 1 !important;
}

.uri-link,
.uri-plain {
  font-family: monospace;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  flex-shrink: 1;
}

.uri-link {
  color: rgb(var(--v-theme-primary));
}

.lookup-label {
  font-weight: 500;
  flex-basis: 100%;
  margin-left: 0 !important;
}

.lookup-description {
  color: rgba(var(--v-theme-on-surface), 0.7);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  flex-basis: 100%;
  margin-left: 0 !important;
  cursor: default;
}
</style>
