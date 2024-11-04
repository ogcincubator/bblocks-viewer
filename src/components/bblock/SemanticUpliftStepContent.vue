<template>
  <div class="semantic-uplift-step-content">
    <div class="ml-3">
      <div v-if="url" class="d-flex align-center mb-2">
        <copy-text-field url :text="url"></copy-text-field>
      </div>
    </div>
    <code-viewer
      v-if="code"
      :language="language"
      :code="code"
      :autolink="false"
      :open-urls="false"
    >
    </code-viewer>
    <v-alert v-if="error" type="error" title="Error loading resource">
      An error was encountered while loading the remote resource ({{ error }}).
    </v-alert>
    <div class="text-center my-2">
      <v-progress-circular v-if="loading" size="32" indeterminate></v-progress-circular>
    </div>
  </div>
</template>
<script>
import bblockService from "@/services/bblock.service";
import CodeViewer from "@/components/CodeViewer.vue";
import CopyTextField from "@/components/CopyTextField.vue";

export default {
  components: {CopyTextField, CodeViewer},
  props: {
    bblock: {
      type: Object,
      required: true,
    },
    step: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      code: null,
      loading: false,
      error: null,
    };
  },
  watch: {
    step: {
      handler() {
        this.code = null;
        this.error = null;
        if (!this.step) {
          return;
        }
        if (this.step.code) {
          this.code = this.step.code;
        } else {
          this.loading = true;
          bblockService.fetchDocumentByUrl(this.bblock, this.step.ref)
            .then(data => this.code = data)
            .catch(error => {
              this.error = error;
              console.log(error);
            })
            .finally(() => this.loading = false);
        }
      },
      immediate: true,
    },
  },
  computed: {
    language() {
      if (this.step.type === 'shacl') {
        return 'turtle';
      }
      if (this.step.type.startsWith('sparql-')) {
        return 'sparql';
      }
      if (this.step.type === 'jq') {
        return 'jq';
      }
      return 'text';
    },
    url() {
      return this.step.ref || null;
    },
  },
}
</script>
