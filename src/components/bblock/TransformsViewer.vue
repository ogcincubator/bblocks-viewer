<template>
  <div class="transforms-viewer px-1" v-if="transforms?.length">

    <slot name="intro-text">
      <p class="mb-2">The following transforms are defined for this Building Block:</p>
    </slot>

    <v-card v-for="transform of transforms" :key="transform.id" class="my-2" :id="`transform-panel-${transform.id}`">
      <v-card-title class="d-flex align-center">
        <a
          class="transform-copy-link"
          :href="getTransformLink(transform.id)"
          title="Copy link to this transform"
          @click.prevent="copyTransformLink(transform.id)"
        ><v-icon>mdi-link-variant</v-icon></a>
        <code>{{ transform.id }}</code>
      </v-card-title>
      <v-card-text>
        <transform-info :transform="transform" :source-files-url="bblock.sourceFiles" />
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup>
import {computed, nextTick, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useNavigationStore} from "@/stores/navigation";
import {copyToClipboard} from "@/lib/utils";
import TransformInfo from "@/components/bblock/TransformInfo.vue";

const props = defineProps({
  bblock: {
    type: Object,
    required: true,
  },
  active: Boolean,
});

const navigationStore = useNavigationStore();
const route = useRoute();
const router = useRouter();

const transforms = computed(() => props.bblock?.transforms);

function scrollToTransform(transform) {
  const panel = document.getElementById(`transform-panel-${transform.id}`);
  if (!panel) {
    return;
  }
  const top = panel.getBoundingClientRect().top;
  const headerHeight = document.querySelector('header').offsetHeight;
  window.scrollTo(0, window.scrollY + top - headerHeight);
}

function parseRouteRest(rest) {
  const match = /^transform-(.+)$/.exec(rest?.[0] ?? '');
  return match ? decodeURIComponent(match[1]) : null;
}

function transformRouteLocation(transformId) {
  return {
    name: 'BuildingBlock',
    params: {id: props.bblock.itemIdentifier, section: 'transforms', rest: [`transform-${encodeURIComponent(transformId)}`]},
  };
}

async function processRouteTarget() {
  if (!props.active) {
    return;
  }
  const transformId = parseRouteRest(route.params.rest);
  if (!transformId || !transforms.value?.some(t => t.id === transformId)) {
    return;
  }
  await nextTick();
  scrollToTransform({id: transformId});
}

watch(() => route.params.rest, processRouteTarget);

function getTransformLink(transformId) {
  const resolved = router.resolve(transformRouteLocation(transformId));
  return window.location.origin + resolved.href;
}

function copyTransformLink(transformId) {
  copyToClipboard(getTransformLink(transformId));
}

function updateNavigation() {
  if (props.active && transforms.value?.length) {
    navigationStore.setItems(
      transforms.value.map(t => ({
        title: t.id,
        id: t.id,
        to: transformRouteLocation(t.id),
      })),
      scrollToTransform,
    );
  } else {
    navigationStore.clearItems();
  }
}

watch(() => props.bblock, () => {
  updateNavigation();
  processRouteTarget();
}, {immediate: true});
watch(() => props.active, (v) => {
  updateNavigation();
  if (v) {
    processRouteTarget();
  }
});
</script>
<style scoped lang="scss">
.transform-copy-link {
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  max-width: 0;
  opacity: 0;
  transition: max-width 0.2s ease, opacity 0.2s ease, margin-right 0.2s ease;
  text-decoration: none;
  color: inherit;
}

.v-card-title:hover .transform-copy-link,
.transform-copy-link:focus {
  max-width: 1.5em;
  opacity: 1;
  margin-right: 0.25em;
}
</style>
