<template>
  <svg class="color-circle" xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 30 30">
    <circle r="12" cx="15" cy="15" :fill="color"></circle>
  </svg>
</template>
<script>
export default {
  props: {
    width: {
      type: Number,
      default: 22,
    },
    height: {
      type: Number,
      default: 22,
    },
    color: {
      required: true,
      type: String,
    },
  },
}
</script>
<style>
.color-circle {
  vertical-align: middle;
}
</style>
