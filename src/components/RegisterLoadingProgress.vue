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
        v-if="hasErrors || hasWarnings"
        class="mx-2"
        size="x-small"
        :color="hasErrors ? 'error' : 'warning'"
        :prepend-icon="hasErrors ? 'mdi-alert-octagon' : 'mdi-alert'"
        @click="showErrorsDialog = true">
        {{ hasErrors ? 'Errors' : 'Warnings' }}
      </v-btn>
      <v-btn size="x-small" @click.prevent="this.$emit('hide')" class="mx-2">Hide</v-btn>
    </div>

    <v-dialog v-model="showErrorsDialog" max-width="800">
      <v-card :title="hasErrors ? 'Register load errors' : 'Register load warnings'">
        <v-card-text>
          <template v-if="hasErrors">
            <p>The following registers could not be loaded:</p>
            <v-list>
              <v-list-item
                v-for="(value, url) in failed"
                :key="url"
                :title="url"
                prepend-icon="mdi-alert-octagon"
                base-color="error"
                :href="url"
                target="_blank"
              >
                <v-list-item-subtitle class="wrap-subtitle">
                  {{ value.message || value.error.toString() }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </template>
          <template v-if="hasWarnings">
            <p>The following registers were loaded from a cached copy:</p>
            <v-list>
              <v-list-item
                v-for="(value, url) in warnings"
                :key="url"
                :title="url"
                prepend-icon="mdi-alert"
                base-color="warning"
                :href="url"
                target="_blank"
              >
                <v-list-item-subtitle class="wrap-subtitle">
                  {{ value.message }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </template>
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
    warnings: {type: Object, default: () => ({})},
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
    hasWarnings() {
      return this.warnings && Object.keys(this.warnings).length;
    },
    textColor() {
      if (this.hasErrors) {
        return 'error';
      }
      if (this.hasWarnings) {
        return 'warning';
      }
      return this.total > 0 && this.completed == this.total ? 'success' : 'primary';
    },
    textStyle() {
      if (this.hasErrors) {
        return 'color: rgb(var(--v-theme-error))';
      }
      return this.hasWarnings ? 'color: rgb(var(--v-theme-warning))' : '';
    },
  },
}
</script>

<style scoped>
.v-list-item .wrap-subtitle {
  white-space: normal;
  -webkit-line-clamp: unset;
  line-clamp: unset;
}
</style>
