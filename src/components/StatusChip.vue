<template>
  <v-chip v-if="status" :variant="variant" :color="color" :size="size">{{ label }}</v-chip>
</template>
<script>

import {statusColors} from "@/models/status";

export default {
  props: {
    status: String,
    variant: {
      type: String,
      default: 'flat',
    },
    size: {
      type: String,
      default: 'small',
    },
  },
  computed: {
    color() {
      return statusColors[this.status] || null;
    },
    label() {
      return this.status.charAt(0).toUpperCase() + this.status.substring(1).replaceAll('-', ' ');
    },
  },
}
</script>
