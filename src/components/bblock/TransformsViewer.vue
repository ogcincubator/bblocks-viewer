<template>
  <div class="transforms-viewer px-1" v-if="transforms?.length">

    <slot name="intro-text">
      <p class="mb-2">The following transforms are defined for this Building Block:</p>
    </slot>

    <v-card v-for="transform of transforms" :key="transform.id" class="my-2">
      <v-card-title>
        <code>{{ transform.id }}</code>
      </v-card-title>
      <v-card-text>
        <MarkdownText class="description" :content="transform.description" :base-url="bblock.sourceFiles"></MarkdownText>
        <v-row class="my-2">
          <v-col md="4">
            <div class="font-weight-bold">Inputs</div>
            <ul class="pl-5" v-if="transform?.inputs?.mediaTypes?.length">
              <li v-for="item in transform.inputs.mediaTypes" :key="item.id">
                <span v-if="item.label">{{ item.label }} ({{ item.mimeType }})</span>
                <span v-else>{{ item.mimeType }}</span>
              </li>
            </ul>
            <div v-else class="text-disabled">No input media types have been defined.</div>
          </v-col>
          <v-col md="4">
            <div class="font-weight-bold">Output media types</div>
            <ul class="pl-5" v-if="transform?.outputs?.mediaTypes?.length">
              <li v-for="item in transform.outputs.mediaTypes" :key="item.id">
                <span v-if="item.label">{{ item.label }} ({{ item.mimeType }})</span>
                <span v-else>{{ item.mimeType }}</span>
              </li>
            </ul>
            <div v-else class="text-disabled">No output media types have been defined.</div>
          </v-col>
          <v-col md="4">
            <div class="font-weight-bold">Output profiles</div>
            <ul class="pl-5" v-if="transform?.outputs?.profiles?.length">
              <li v-for="item in transform.outputs.profiles" :key="item.id">
                {{ item.label }} ({{ item.mimeType }})
              </li>
            </ul>
            <div v-else class="text-disabled">No output profiles have been defined.</div>
          </v-col>
        </v-row>

        <div class="code-viewer-wrapper">
          <code-viewer
            :code="transform.code"
          ></code-viewer>
        </div>
        <div class="text-right mt-1">
          <copy-to-clipboard-button :text="transform.code" color="primary">
            Copy to Clipboard
          </copy-to-clipboard-button>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup>
import {computed} from "vue";
import CodeViewer from "@/components/CodeViewer.vue";
import CopyToClipboardButton from "@/components/CopyToClipboardButton.vue";
import MarkdownText from "@/components/MarkdownText.vue";

const props = defineProps({
  bblock: {
    type: Object,
    required: true,
  }
});

const transforms = computed(() => props.bblock?.transforms);

</script>
<style lang="scss" scoped>
.description p {
  margin-bottom: 0.7em;
}
</style>
