<template>
  <v-card v-if="steps.length" :title="title" class="my-2">
    <v-card-subtitle v-if="$slots.text">
      <slot name="text"></slot>
    </v-card-subtitle>
    <v-expansion-panels class="my-1 pa-2" multiple variant="accordion">
      <v-expansion-panel v-for="(step, idx) in steps"
                         :key="idx"
      >
        <v-expansion-panel-title>
          {{ idx + 1 }}. {{ step.label || step.type }}
          <v-tooltip
            v-if="step.description"
            :text="step.description"
            class="opaque-tooltip"
            location="bottom"
          >
            <template #activator="{ props }">
              <v-icon v-bind="props" class="mx-1" style="cursor: help">mdi-help-circle</v-icon>
            </template>
          </v-tooltip>
          <v-tooltip
            v-if="step.url"
            text="View the documentation for this step type"
            class="opaque-tooltip"
            location="bottom"
          >
            <template #activator="{ props }">
              <v-icon v-bind="props" @click.stop="openUrl(step.url)">mdi-book-open-page-variant-outline</v-icon>
            </template>
          </v-tooltip>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <semantic-uplift-step-content :step="step" :bblock="bblock"></semantic-uplift-step-content>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>
<script>
import SemanticUpliftStepContent from "@/components/bblock/SemanticUpliftStepContent.vue";

export default {
  components: {SemanticUpliftStepContent},
  props: {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    steps: {
      type: Array,
      required: true,
    },
    bblock: {
      type: Object,
      required: true,
    },
  },
  methods: {
    openUrl(url) {
      window.open(url);
    },
  },
}
</script>
