<template>
  <iframe
    ref="iframeEl"
    :src="src"
    sandbox="allow-same-origin"
    :style="{ width: '100%', height: height + 'px', border: 'none', display: 'block', resize: 'vertical', overflow: 'auto' }"
    @load="onLoad"
  ></iframe>
</template>
<script setup>
import { ref } from 'vue';

const props = defineProps({
  src: { type: String, required: true },
  fallbackHeight: { type: Number, default: 300 },
  maxHeight: { type: Number, default: 600 },
});

const iframeEl = ref(null);
const height = ref(props.fallbackHeight);

function onLoad() {
  try {
    const doc = iframeEl.value?.contentDocument;
    if (!doc) return;
    const h = doc.documentElement?.scrollHeight || doc.body?.scrollHeight;
    if (h) {
      height.value = Math.min(h, props.maxHeight);
    }
  } catch {
    // cross-origin — keep fallback height
  }
}
</script>
