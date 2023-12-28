<template>
  <div v-if="total" class="d-flex align-center">
    <div class="flex-grow-1 flex-shrink-1">
      <v-progress-linear
        model-value="100 * number / total"
        :color="total > 0 && completed == total ? 'success' : 'primary'"></v-progress-linear>
    </div>
    <div class="text-caption text-no-wrap pl-3">
      Loaded {{ completed }} / {{ total }} registers
      <v-btn size="x-small" @click.prevent="this.$emit('hide')" class="ml-2">Hide</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    completed: Number,
    total: Number,
  },
  computed: {
    finished() {
      return this.completed === this.total;
    },
  },
}
</script>
