<template>
  <v-tooltip v-if="hasReportUrls" text="View validation report" location="bottom">
    <template #activator="{ props: tooltipProps }">
      <v-icon
        v-bind="tooltipProps"
        class="ml-1"
        style="cursor: pointer"
        @click="showDialog = true"
      >mdi-text-box-search-outline</v-icon>
    </template>
  </v-tooltip>

  <v-dialog v-model="showDialog" max-width="800" scrollable>
    <v-card>
      <v-toolbar color="primary" density="compact">
        <v-toolbar-title>Profiles Validation Report</v-toolbar-title>
        <v-btn icon @click="showDialog = false"><v-icon>mdi-close</v-icon></v-btn>
      </v-toolbar>

      <v-card-text class="pa-0">
        <v-tabs
          v-if="profileIds.length > 1"
          v-model="selectedProfile"
          density="compact"
        >
          <v-tab v-for="profileId in profileIds" :key="profileId" :value="profileId">
            <v-icon :color="profilesValidation[profileId].result ? 'success' : 'error'" size="small" class="mr-1">
              {{ profilesValidation[profileId].result ? 'mdi-check-circle' : 'mdi-close-circle' }}
            </v-icon>
            {{ profileBBlocks[profileId]?.name || profileId }}
          </v-tab>
        </v-tabs>
        <v-divider v-if="profileIds.length > 1" />
        <template v-if="currentReport?.loading">
          <div class="d-flex justify-center pa-8">
            <v-progress-circular indeterminate color="primary" />
          </div>
        </template>
        <template v-else-if="currentReport?.error">
          <v-alert type="error" class="ma-4">Failed to load validation report</v-alert>
        </template>
        <template v-else-if="currentReport">
          <div class="pa-4" v-if="currentReport.json">
            <div class="d-flex align-center gap-2 mb-4">
              <v-chip :color="currentReport.json.result ? 'success' : 'error'" variant="flat" size="small">
                {{ currentReport.json.result ? 'Passed' : 'Failed' }}
              </v-chip>
              <span class="ml-1 text-body-2 text-medium-emphasis" v-if="currentReport.json.counts">
                {{ currentReport.json.counts.passed }} / {{ currentReport.json.counts.total }} items passed
              </span>
            </div>
            <template v-for="(item, itemIdx) in currentReport.json.items" :key="itemIdx">
              <div v-for="section in item.sections" :key="section.name" class="mb-4">
                <div class="text-subtitle-2 mb-2">{{ section.title || section.name }}</div>
                <div
                  v-for="(entry, ei) in section.entries"
                  :key="ei"
                  class="d-flex align-start gap-2 py-1 px-2 rounded mb-1"
                  :style="entry.isError ? 'background: rgba(var(--v-theme-error), 0.08)' : ''"
                >
                  <v-icon
                    v-if="entry.isError"
                    color="error"
                    size="small"
                    class="mr-1 flex-shrink-0"
                  >mdi-close-circle</v-icon>
                  <pre class="entry-text" :class="{ 'text-error': entry.isError }">{{ entry.message }}</pre>
                </div>
              </div>
            </template>
          </div>
          <v-alert v-else type="warning" class="ma-4">No structured report data available</v-alert>
        </template>
        <template v-else>
          <div class="d-flex justify-center pa-8">
            <v-progress-circular indeterminate color="primary" />
          </div>
        </template>
      </v-card-text>

    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
  profilesValidation: { type: Object, default: null },
  profileBBlocks: { type: Object, default: () => ({}) },
});

const showDialog = ref(false);
const reportFetched = ref({});
const selectedProfile = ref(null);

const profileIds = computed(() => Object.keys(props.profilesValidation ?? {}));

const hasReportUrls = computed(() =>
  profileIds.value.some(id => props.profilesValidation[id]?.report)
);

const currentReport = computed(() =>
  selectedProfile.value ? (reportFetched.value[selectedProfile.value] ?? null) : null
);

watch(() => props.profilesValidation, () => {
  showDialog.value = false;
  reportFetched.value = {};
  selectedProfile.value = null;
});

watch(showDialog, (open) => {
  if (!open) return;
  if (!profileIds.value.length) return;
  if (!selectedProfile.value || !props.profilesValidation?.[selectedProfile.value]) {
    selectedProfile.value = profileIds.value[0];
  }
  for (const profileId of profileIds.value) {
    const url = props.profilesValidation[profileId]?.report;
    if (reportFetched.value[profileId] || !url) continue;
    reportFetched.value[profileId] = { loading: true, error: false, json: null, raw: null };
    fetch(url)
      .then(r => r.text())
      .then(text => {
        try {
          reportFetched.value[profileId] = { loading: false, error: false, json: JSON.parse(text), raw: text };
        } catch {
          reportFetched.value[profileId] = { loading: false, error: false, json: null, raw: text };
        }
      })
      .catch(() => {
        reportFetched.value[profileId] = { loading: false, error: true, json: null, raw: null };
      });
  }
});
</script>
<style scoped>
.entry-text {
  font-family: monospace;
  font-size: 0.85em;
  white-space: pre-wrap;
  word-break: break-word;
  margin: 0;
}
</style>
