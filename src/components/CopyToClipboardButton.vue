<template>
  <v-tooltip
    v-model="showFeedback"
    location="bottom"
    text="Copied!"
    :open-on-hover="false"
    class="opaque-tooltip"
  >
    <template #activator="{ props }">
      <v-btn :icon="icon" variant="flat" @click.prevent="copy" v-bind="props"></v-btn>
    </template>
  </v-tooltip>
</template>
<script>
import {copyToClipboard} from "@/lib/utils";

let timeout;
export default {
  props: {
    text: {
      required: true,
      type: String,
    },
    iconTimeout: {
      type: Number,
      default: 1500,
    },
  },
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
    icon() {
      return this.showFeedback ? 'mdi-check-bold' : 'mdi-content-copy';
    },
  }
}
</script>
