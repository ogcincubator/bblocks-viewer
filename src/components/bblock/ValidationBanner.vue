<script setup>
import {toRefs} from "vue";

const props = defineProps({
  register: Object,
  bblock: Object,
});
const {register, bblock} = toRefs(props);
</script>
<template>
  <v-alert v-if="register?.validationReport || !bblock.validationPassed"
           :type="bblock.validationPassed ? 'success' : 'error'">
    <span v-if="bblock.validationPassed">
      All examples and tests for this building block pass validation.
    </span>
    <span v-else>
      Examples or tests for this building block have validation errors
    </span>
    <div v-if="register?.validationReport" class="float-end">
      <v-btn
        size="small"
        :href="`${register.validationReport}#bblock-${bblock.itemIdentifier}`"
        prepend-icon="mdi-clipboard-check-outline"
        target="_blank"
        :class="{ 'with-dropdown': bblock.testOutputs }"
      >
        Validation report
      </v-btn>
      <v-menu v-if="bblock.testOutputs" location="bottom end">
        <template #activator="{ props }">
          <v-btn size="small" v-bind="props" class="dropdown-button">
            <v-icon>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list density="compact" style="padding: 0">
          <v-list-item
            density="compact"
            :href="bblock.testOutputs"
            target="_blank"
          >
            <v-icon>mdi-playlist-check</v-icon>
            Test output files
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div v-else class="float-end">
      <v-btn class="float-end"
             size="small"
             v-if="!register?.validationReport && bblock.testOutputs"
             :href="bblock.testOutputs"
             prepend-icon="mdi-open-in-new"
             target="_blank"
      >
        View test outputs
      </v-btn>
    </div>
  </v-alert>
</template>
