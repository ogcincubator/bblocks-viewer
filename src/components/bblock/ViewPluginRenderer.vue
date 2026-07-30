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
  try {
    props.instance.render(el);
  } catch (e) {
    // Same PluginClass.viewName ?? PluginClass.name fallback ExampleViewer.vue uses for tab labels,
    // so the banner names the plugin the same way the user already sees it in the tab.
    const pluginName = props.instance.constructor?.viewName ?? props.instance.constructor?.name ?? 'Custom';
    console.error(`View plugin "${pluginName}" threw while rendering`, e);
    // render() can throw after partially building its DOM (e.g. a three.js canvas already
    // attached before the error) — destroy() gives it a chance to release that (WebGL context,
    // animation loop) before we wipe el out from under it. renderedEl is nulled so the later
    // destroy(renderedEl) calls (tab switch, unmount) don't call destroy() a second time on
    // state the plugin has already torn down.
    try {
      props.instance.destroy?.(el);
    } catch (destroyError) {
      console.error(`View plugin "${pluginName}" also threw while cleaning up after a failed render`, destroyError);
    }
    renderedEl = null;
    el.replaceChildren();
    showRenderError(el, pluginName);
  }
}

function showRenderError(el, pluginName) {
  const alert = document.createElement('div');
  alert.className = 'd-flex align-center pa-4 bg-error rounded';
  const icon = document.createElement('i');
  icon.className = 'mdi mdi-alert-circle-outline mr-2';
  const text = document.createElement('span');
  text.textContent = `"${pluginName}" failed to render this view. See the browser console for details.`;
  alert.append(icon, text);
  el.appendChild(alert);
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
