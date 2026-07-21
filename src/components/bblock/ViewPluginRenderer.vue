<template>
  <div>
    <div ref="boxEl" style="height: 300px"></div>
    <div class="d-flex mt-2">
      <v-spacer></v-spacer>
      <v-btn
        prepend-icon="mdi-fullscreen"
        class="ml-1"
        color="primary"
        variant="flat"
        @click="fullscreen = true"
      >
        Full screen
      </v-btn>
    </div>
    <v-dialog fullscreen v-model="fullscreen">
      <v-card>
        <v-toolbar color="primary">
          <v-toolbar-title class="flex-grow-1">{{ label }}</v-toolbar-title>
          <v-btn icon @click="fullscreen = false"><v-icon>mdi-close</v-icon></v-btn>
        </v-toolbar>
        <v-card-text style="height: calc(100vh - 64px); padding: 0">
          <div ref="fullscreenBoxEl" style="height: 100%"></div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
import {nextTick, onBeforeUnmount, ref, watch} from 'vue';

const props = defineProps({
  instance: {type: Object, required: true},
  label: {type: String, default: ''},
});

const boxEl = ref(null);
const fullscreenBoxEl = ref(null);
const fullscreen = ref(false);

// The plugin only ever owns one rendered <div> at a time — this tracks which of the two
// (inline box vs fullscreen dialog box) that currently is, so we can destroy() the right one
// before mounting into the other.
let renderedEl = null;

function mountInto(el) {
  if (!el) return;
  if (renderedEl && renderedEl !== el) {
    props.instance.destroy?.(renderedEl);
  }
  renderedEl = el;
  props.instance.render(el);
}

function teardown() {
  if (renderedEl) {
    props.instance.destroy?.(renderedEl);
    renderedEl = null;
  }
}

watch(boxEl, (el) => {
  if (el && !fullscreen.value) mountInto(el);
});

watch(fullscreen, async (isFullscreen) => {
  await nextTick();
  if (isFullscreen) {
    mountInto(fullscreenBoxEl.value);
  } else if (boxEl.value) {
    mountInto(boxEl.value);
  }
});

watch(() => props.instance, (newInstance, oldInstance) => {
  const el = fullscreen.value ? fullscreenBoxEl.value : boxEl.value;
  if (oldInstance && renderedEl) {
    oldInstance.destroy?.(renderedEl);
    renderedEl = null;
  }
  if (newInstance && el) mountInto(el);
});

onBeforeUnmount(teardown);
</script>
