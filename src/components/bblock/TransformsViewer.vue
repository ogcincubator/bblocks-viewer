<template>
  <div class="transforms-viewer px-1" v-if="transforms?.length">

    <slot name="intro-text">
      <p class="mb-2">The following transforms are defined for this Building Block:</p>
    </slot>

    <v-card v-for="transform of transforms" :key="transform.id" class="my-2">
      <v-card-title><code>{{ transform.id }}</code></v-card-title>
      <v-card-text>
        <transform-info :transform="transform" :source-files-url="bblock.sourceFiles" />
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup>
import {computed} from "vue";
import TransformInfo from "@/components/bblock/TransformInfo.vue";

const props = defineProps({
  bblock: {
    type: Object,
    required: true,
  }
});

const transforms = computed(() => props.bblock?.transforms);

</script>
