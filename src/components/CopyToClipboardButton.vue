<template>
  <v-tooltip
    v-model="showFeedback"
    location="bottom"
    text="Copied!"
    :open-on-hover="false"
    class="opaque-tooltip"
  >
    <template #activator="{ props }">
      <v-btn
        v-if="isIcon"
        :icon="iconValue"
        :variant="variant"
        @click.prevent="copy"
        v-bind="props"
        :color="color"
        :size="size"
      >
      </v-btn>
      <v-btn
        v-else
        :prepend-icon="iconValue"
        :variant="variant"
        @click.prevent="copy"
        v-bind="props"
        :color="color"
      >
        <slot></slot>
      </v-btn>
    </template>
  </v-tooltip>
</template>
<script>
import {copyToClipboard} from "@/lib/utils";

let timeout;
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
    iconTimeout: {
      type: Number,
      default: 1500,
    },
    variant: {
      type: String,
      default: 'flat',
    },
    color: {
      type: String,
    },
    size: {
      type: String,
    }
  },
  inheritAttrs: false,
  data() {
    return {
      showFeedback: false,
    };
  },
  methods: {
    copy() {
      clearTimeout(timeout);
      copyToClipboard(this.text);
      this.showFeedback = true;
      this.$emit('copyToClipboard', this.text);
      timeout = setTimeout(() => this.showFeedback = false, this.iconTimeout);
    },
  },
  computed: {
    iconValue() {
      return this.showFeedback ? 'mdi-check-bold' : 'mdi-content-copy';
    },
    isIcon() {
      return !this.$slots.default;
    },
  }
}
</script>
