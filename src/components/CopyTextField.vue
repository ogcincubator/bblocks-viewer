<template>
  <v-text-field
    readonly
    density="compact"
    :model-value="text"
    hide-details
  >
    <template v-slot:append-inner>
      <v-icon
        v-if="this.url"
        icon="mdi-open-in-new"
        @click="open"
        target="_blank"
        title="Open in new window"
      ></v-icon>
      <v-icon
        icon="mdi-clipboard"
        title="Copy to clipboard"
        @click="copy"
      ></v-icon>
    </template>
  </v-text-field>
</template>
<script>
export default {
  props: {
    text: String,
    url: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    copy() {
      if (navigator?.clipboard) {
        navigator.clipboard.writeText(this.text);
      }
    },
    open() {
      window.open(this.text);
    },
  },
}
</script>
