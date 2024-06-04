<template>
  <div class="ontology-viewer">
    <div class="ml-3 mb-5">
      <div class="d-flex align-center mb-2">
        <copy-text-field url :text="bblock.ontology"></copy-text-field>
      </div>
    </div>

    <div class="text-right my-2" v-if="tabs.length > 1">
      <v-btn-toggle
        v-model="tab"
        rounded="0"
        color="primary"
        group
        mandatory="force"
      >
        <v-btn v-for="tabEntry of tabs" :key="tabEntry.id" :value="tabEntry.id">
          {{ tabEntry.label }}
        </v-btn>
      </v-btn-toggle>
    </div>

    <v-progress-circular v-if="loading" size="64" class="pa-5"></v-progress-circular>

    <div v-if="ontology && !loading">
      <div class="d-flex flex-column align-stretch pa-5" v-if="tab === 'content'">
        <div class="code-viewer-wrapper">
          <code-viewer
            language="turtle"
            :code="ontology.content"
          ></code-viewer>
        </div>
        <div class="jsonld-actions text-right mt-1">
          <v-btn
            prepend-icon="mdi-clipboard"
            @click="copyToClipboard(ontology.content)"
            color="primary"
            variant="flat"
          >
            Copy to clipboard
          </v-btn>
        </div>
      </div>

      <div v-if="tab === 'classes' && classes?.length">
        <v-list>
          <v-list-item v-for="resource in classes"
                       :key="resource.uri"
                       :href="resource.uri"
                       target="_blank"
                       prepend-icon="mdi-open-in-new"
          >
            {{ resource.getLabel() }}
            <small class="ml-2"><code>{{ resource.uri }}</code></small>
          </v-list-item>
        </v-list>
      </div>

      <div v-if="tab === 'skos' && skosResources?.length">
        <template v-for="category in resourceList"
          :key="category.uri">
          <v-card
            v-if="category.resources?.length"
            class="ma-2"
          >
            <v-card-title
              class="text-subtitle-1"
            >
              {{ category.label }}
              <small class="ml-2"><code>{{ category.uri }}</code></small>
            </v-card-title>
            <v-list-item v-for="resource in category.resources"
                         :key="resource.uri"
                         :href="resource.uri"
                         target="_blank"
                         prepend-icon="mdi-open-in-new"
            >
              <v-list-item-title>
                {{ resource.getLabel() }}
                <small class="ml-2"><code>{{ resource.uri }}</code></small>
              </v-list-item-title>
            </v-list-item>
          </v-card>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import CopyTextField from "@/components/CopyTextField.vue";
import CodeViewer from "@/components/CodeViewer.vue";
import {copyToClipboard} from "@/lib/utils";
import { readOntology, SKOS, RDFS, OWL } from "@/services/ontology.service"

const SKOS_CATEGORIES = [
  {
    label: 'Concept Scheme',
    uri: SKOS.ConceptScheme,
  },
  {
    label: 'Collection',
    uri: SKOS.Collection,
  },
  {
    label: 'Concept',
    uri: SKOS.Concept,
  }
];

export default {
  components: {
    CopyTextField,
    CodeViewer,
  },
  props: {
    bblock: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      ontology: null,
      loading: false,
      tab: 'content',
      skosResources: [],
      classes: [],
    };
  },
  methods: {
    copyToClipboard,
    load() {
      if (!this.bblock?.ontology) {
        return;
      }
      this.ontology = null;
      this.loading = true;
      this.classes = [];
      this.skosResources = [];
      readOntology(this.bblock.ontology)
        .then(ontology => {
          if (!ontology.content?.trim()) {
            this.ontology = null;
            return;
          }
          this.ontology = ontology;
          [OWL.Class, RDFS.Class].forEach(c => {
            const resources = ontology.byClass[c.id];
            resources?.length && this.classes.push(...resources.map(r => ontology.resources[r]));
          });
          SKOS_CATEGORIES.forEach(c => {
            const resources = ontology.byClass[c.uri.id];
            if (resources?.length) {
              this.skosResources.push({
                label: c.label,
                uri: c.uri.id,
                resources: resources.map(r => ontology.resources[r]),
              });
            }
          });
        })
        .finally(() => this.loading = false);
    },
  },
  computed: {
    tabs() {
      const tabs = [];
      if (this.ontology) {
        tabs.push({
          label: 'Content',
          id: 'content',
        });
      }
      if (this.classes?.length) {
        tabs.push({label: 'Classes', id: 'classes'});
      }
      if (this.skosResources?.length) {
        tabs.push({label: 'SKOS', id: 'skos'});
      }
      return tabs;
    },
    resourceList() {
      switch (this.tab) {
        case 'classes':
          return this.classes;
        case 'skos':
          return this.skosResources;
      }
      return null;
    },
  },
  watch: {
    bblock: {
      handler() {
        this.content = null;
        this.resources = null;
        this.byClass = null;
        this.prefixes = null;
        this.tab = 'content';
        this.load();
      },
      immediate: true,
    },
  },
}
</script>
<style>
.opaque-tooltip .v-overlay__content {
  background: rgba(66, 66, 66, 1) !important;
}
</style>
