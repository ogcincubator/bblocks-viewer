<template>
  <div ref="el"></div>
</template>
<script setup>
import {onBeforeUnmount, ref, watch} from 'vue';

// Mounts a matched tab plugin's render()/destroy() lifecycle into a bare container — unlike
// ViewPluginRenderer.vue there's no fullscreen-toggle chrome, since the plugin already owns the
// whole tab body. See .claude/tab-plugins-design.md "Resolved items" #1.
const props = defineProps({
  instance: {type: Object, required: true},
  label: {type: String, default: 'Custom'},
});

const el = ref(null);
let renderedEl = null;

function mountInto(target) {
  if (!target) return;
  renderedEl = target;
  try {
    props.instance.render(target);
  } catch (e) {
    console.error(`Tab plugin "${props.label}" threw while rendering`, e);
    try {
      props.instance.destroy?.(target);
    } catch (destroyError) {
      console.error(`Tab plugin "${props.label}" also threw while cleaning up after a failed render`, destroyError);
    }
    renderedEl = null;
    target.replaceChildren();
    showRenderError(target);
  }
}

function showRenderError(target) {
  const alert = document.createElement('div');
  alert.className = 'd-flex align-center pa-4 bg-error rounded';
  const icon = document.createElement('i');
  icon.className = 'mdi mdi-alert-circle-outline mr-2';
  const text = document.createElement('span');
  text.textContent = `"${props.label}" failed to render this tab. See the browser console for details.`;
  alert.append(icon, text);
  target.appendChild(alert);
}

watch(el, (target) => {
  if (target) mountInto(target);
});

onBeforeUnmount(() => {
  if (renderedEl) {
    props.instance.destroy?.(renderedEl);
    renderedEl = null;
  }
});
</script>
