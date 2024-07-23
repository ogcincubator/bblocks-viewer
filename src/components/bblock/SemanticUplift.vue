<template>
  <div class="px-2">
    <v-alert v-if="!contextOnly" variant="tonal" type="info" class="mb-2">
      This Building Block requires additional steps before of after applying
      its JSON-LD context to JSON objects.
    </v-alert>
    <semantic-uplift-steps
      :steps="steps.pre"
      :bblock="bblock"
      title="Preprocessing steps"
    >
      <template #text>
        Before applying the JSON-LD context, the following transformations are necessary on the input JSON document.
      </template>
    </semantic-uplift-steps>
    <v-card title="JSON-LD context">
      <v-card-text>
        <json-ld-context-viewer :bblock="bblock"></json-ld-context-viewer>
      </v-card-text>
    </v-card>
    <semantic-uplift-steps
      :steps="steps.post"
      :bblock="bblock"
      title="Postprocessing steps"
    >
      <template #text>
        After applying the JSON-LD context, the following transformations on the resulting RDF graph are necessary.
      </template>
    </semantic-uplift-steps>
    <semantic-uplift-steps
      :steps="steps.unknown"
      :bblock="bblock"
      title="Unknown steps"
    >
      <template #text>
        The following steps are also declared in the building block, but we do not know where they should be applied.
      </template>
    </semantic-uplift-steps>
  </div>
</template>

<script>
import JsonLdContextViewer from "@/components/bblock/JsonLdContextViewer.vue";
import SemanticUpliftSteps from "@/components/bblock/SemanticUpliftSteps.vue";

const KNOWN_STEPS = {
  jq: {
    stage: 'pre',
    label: 'JQ transformation',
    url: 'https://jqlang.github.io/jq/manual/',
    description: 'JQ is a language to manipulate JSON data',
  },
  shacl: {
    stage: 'post',
    label: 'SHACL Rule',
    url: 'https://www.w3.org/TR/shacl-af/#rules',
    description: 'SHACL entailments that are added to the uplifted graph',
  },
  'sparql-update': {
    stage: 'post',
    label: 'SPARQL Update',
    url: 'https://www.w3.org/TR/2013/REC-sparql11-update-20130321/#updateLanguage',
    description: 'The SPARQL Update queries are applied to the uplifted graph',
  },
  'sparql-construct': {
    stage: 'post',
    label: 'SPARQL CONSTRUCT',
    url: 'https://www.w3.org/TR/sparql11-query/#construct',
    description: 'The uplifted graph will be replaced with the output of this SPARQL CONSTRUCT query',
  },
};

export default {
  components: {
    SemanticUpliftSteps,
    JsonLdContextViewer,
  },
  props: {
    bblock: {
      type: Object,
      required: true,
    },
  },
  methods: {
    openUrl(url) {
      window.open(url);
    },
  },
  computed: {
    contextOnly() {
      return !this.bblock?.semanticUplift?.additionalSteps?.length;
    },
    steps() {
      const steps = this?.bblock?.semanticUplift?.additionalSteps;
      const result = {
        pre: [],
        post: [],
        unknown: [],
      }
      if (steps) {
        for (let step of steps) {
          const copy = Object.assign({}, step);
          const known = KNOWN_STEPS[step.type];
          if (known) {
            Object.assign(copy, known);
          }
          let stage = step.stage || 'unknown';
          result[stage].push(copy);
        }
      }
      return result;
    },
  },
}
</script>
