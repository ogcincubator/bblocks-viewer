<template>
  <div v-if="total" class="d-flex align-center">
    <div class="flex-grow-1 flex-shrink-1">
      <v-progress-linear
        :model-value="100 * completed / total"
        :color="textColor"></v-progress-linear>
    </div>
    <div class="text-caption text-no-wrap pl-3" :style="textStyle">
      <v-progress-circular v-if="!finished" size="10" indeterminate class="mr-1"></v-progress-circular>
      Loaded {{ completed }} / {{ total }} registers
      <v-btn
        v-if="hasErrors"
        class="mx-2"
        size="x-small"
        color="error"
        prepend-icon="mdi-alert-octagon"
        @click="showErrorsDialog = true">
        Errors
      </v-btn>
      <v-btn size="x-small" @click.prevent="this.$emit('hide')" class="mx-2">Hide</v-btn>
    </div>

    <v-dialog v-model="showErrorsDialog" max-width="800">
      <v-card title="Register load errors">
        <v-card-text>
          <p>The following errors were encountered while loading the list of building block registers:</p>
          <v-list>
            <v-list-item
              v-for="(value, url) in this.failed"
              :key="url"
              :title="url"
              :subtitle="value.error.toString()"
              :href="url"
              target="_blank"
            >
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" @click="showErrorsDialog = false"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    completed: Number,
    total: Number,
    failed: Object,
  },
  data() {
    return {
      showErrorsDialog: false,
    };
  },
  methods: {
  },
  computed: {
    finished() {
      return (this.completed + Object.keys(this.failed).length) >= this.total;
    },
    hasErrors() {
      return this.failed && Object.keys(this.failed).length;
    },
    textColor() {
      if (this.hasErrors) {
        return 'error';
      }
      return this.total > 0 && this.completed == this.total ? 'success' : 'primary';
    },
    textStyle() {
      return this.hasErrors ? 'color: rgb(var(--v-theme-error))': '';
    },
  },
}
</script>
