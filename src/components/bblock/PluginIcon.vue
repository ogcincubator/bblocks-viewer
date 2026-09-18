<template>
  <v-icon v-if="typeof icon === 'string'" v-bind="$attrs" :icon="icon"></v-icon>
  <span v-else-if="icon?.url" class="plugin-icon-image" v-bind="$attrs">
    <img :src="icon.url" alt="" />
  </span>
</template>
<script setup>
defineProps({
  icon: {
    type: [String, Object],
    default: null,
  },
});
</script>
<style scoped>
.plugin-icon-image {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
}

.plugin-icon-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>
