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

    <v-alert v-if="error" type="error" title="Error loading resource">
      An error was encountered while loading the ontology ({{ error }}).
    </v-alert>

    <div v-if="ontology && !loading">
      <div class="d-flex flex-column align-stretch pa-5" v-if="tab === 'content'">
        <div class="code-viewer-wrapper">
          <code-viewer
            language="turtle"
            :code="ontology.content"
          ></code-viewer>
        </div>
        <div class="jsonld-actions text-right mt-1">
          <copy-to-clipboard-button :text="ontology.content" color="primary">Copy to clipboard</copy-to-clipboard-button>
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
            {{ resource.getLabel(language, 'en', resource.uri) }}
            <small class="ml-2"><code>{{ resource.uri }}</code></small>
          </v-list-item>
        </v-list>
      </div>

      <div v-if="twoLevelResourceList?.length">
        <template v-for="category in twoLevelResourceList"
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
                {{ resource.getLabel(language, 'en', resource.uri) }}
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
import {readOntology, SKOS, RDFS, OWL, RDF} from "@/services/ontology.service"
import CopyToClipboardButton from "@/components/CopyToClipboardButton.vue";

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
  },
];

const PROPERTIES_CATEGORIES = [
  {
    label: 'RDF property',
    uri: RDF.Property,
  },
  {
    label: 'OWL Datatype Property',
    uri: OWL.DatatypeProperty,
  },
  {
    label: 'OWL Object Property',
    uri: OWL.ObjectProperty,
  },
];

export default {
  components: {
    CopyToClipboardButton,
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
      properties: [],
      language: navigator.language,
      error: null,
    };
  },
  methods: {
    load() {
      if (!this.bblock?.ontology) {
        return;
      }
      this.ontology = null;
      this.loading = true;
      this.classes = [];
      this.skosResources = [];
      this.error = null;
      readOntology(this.bblock, this.bblock.ontology)
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

          [[PROPERTIES_CATEGORIES, this.properties], [SKOS_CATEGORIES, this.skosResources]].forEach(([cats, list]) => {
              cats.forEach(c => {
              const resources = ontology.byClass[c.uri.id];
              if (resources?.length) {
                list.push({
                  label: c.label,
                  uri: c.uri.id,
                  resources: resources.map(r => ontology.resources[r]),
                });
              }
            });
          });
          console.log(this.properties, this.skosResources);
        })
        .catch(e => this.error = e)
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
      if (this.properties?.length) {
        tabs.push({label: 'Properties', id: 'properties'});
      }
      if (this.skosResources?.length) {
        tabs.push({label: 'SKOS', id: 'skos'});
      }
      return tabs;
    },
    twoLevelResourceList() {
      switch (this.tab) {
        case 'properties':
          return this.properties;
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
