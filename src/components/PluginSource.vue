<template>
  <template v-if="plugin.pip">
    pip:
    <template v-if="plugin.urls?.length">
      <a
        v-for="(url, i) in plugin.urls" :key="url"
        :href="url" target="_blank"
      ><code>{{ pipList[i] }}</code></a>
    </template>
    <code v-else>{{ plugin.pip }}</code>
  </template>
</template>

<script>
/**
 * Renders a plugin entry's `pip` dependency list, linking each one to its `urls` entry
 * (same index) when present. Shared across the Transform/Validator/Build plugin tabs on
 * the Home view, which all report plugin entries in this same {pip, urls} shape.
 */
export default {
  name: 'PluginSource',
  props: {
    plugin: {
      type: Object,
      required: true,
    },
  },
  computed: {
    pipList() {
      return Array.isArray(this.plugin.pip) ? this.plugin.pip : [this.plugin.pip];
    },
  },
};
</script>
