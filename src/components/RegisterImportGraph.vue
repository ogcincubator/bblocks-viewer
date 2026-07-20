<template>
  <div class="register-import-graph" ref="el">
    <v-network-graph
      v-if="graphData"
      :nodes="graphData.nodes"
      :edges="graphData.edges"
      :layouts="graphData.layouts"
      :configs="configs"
      :event-handlers="eventHandlers"
      :style="{ height: graphHeight + 'px' }"
      ref="networkGraph"
    >
      <template #override-node="{ nodeId, config }">
        <circle :r="config.radius" :fill="config.color" style="cursor: pointer" />
        <title>{{ registers[nodeId]?.url }}</title>
      </template>
      <template #override-node-label="{ x, y, text, textAnchor, dominantBaseline, config: labelConfig, scale, class: labelClass }">
        <text
          :x="x"
          :y="y"
          :text-anchor="textAnchor"
          :dominant-baseline="dominantBaseline === 'text-top' ? 'auto' : dominantBaseline"
          :font-size="labelConfig.fontSize * scale"
          :fill="labelConfig.color"
          :class="labelClass"
        >{{ text }}</text>
      </template>
    </v-network-graph>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { VNetworkGraph } from 'v-network-graph';
import 'v-network-graph/lib/style.css';
import { computeForceLayout } from '@/lib/graph-layout';

const props = defineProps({
  registers: {
    type: Object,
    required: true,
  },
  nodeSize: {
    type: Number,
    default: 30,
  },
  height: {
    type: Number,
    default: 500,
  },
});

const networkGraph = ref(null);
const el = ref(null);
const containerWidth = ref(null);
let resizeObserver = null;
let resizeDebounce = null;

// Same rationale as DependencyViewer.vue: measure available width so the
// radial layout can stretch to fill a wide viewport instead of staying
// roughly circular and wasting its sides.
onMounted(() => {
  resizeObserver = new ResizeObserver(entries => {
    const width = entries[0]?.contentRect?.width;
    if (!width) return;
    clearTimeout(resizeDebounce);
    resizeDebounce = setTimeout(() => {
      if (!containerWidth.value || Math.abs(width - containerWidth.value) > 40) {
        containerWidth.value = width;
      }
    }, 250);
  });
  if (el.value) resizeObserver.observe(el.value);
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  clearTimeout(resizeDebounce);
});

const aspectRatio = computed(() => {
  if (!containerWidth.value) return 1;
  return Math.min(2.2, Math.max(1, containerWidth.value / props.height));
});

function buildGraph() {
  const g = { nodes: {}, edges: {}, layouts: { nodes: {} } };
  const layoutNodes = [];

  for (const [url, register] of Object.entries(props.registers)) {
    const name = register.name || url;
    g.nodes[url] = { id: url, name, color: register.color };
    layoutNodes.push({ id: url, width: Math.max(props.nodeSize, name.length * 5.2), height: props.nodeSize + 12 });
  }

  for (const [url, register] of Object.entries(props.registers)) {
    if (Array.isArray(register.imports)) {
      for (const importUrl of register.imports) {
        if (props.registers[importUrl]) {
          const edgeId = `${url}-${importUrl}`;
          if (!g.edges[edgeId]) {
            g.edges[edgeId] = { source: url, target: importUrl };
          }
        }
      }
    }
  }

  const layoutEdges = Object.values(g.edges).map(e => ({ source: e.source, target: e.target }));
  g.layouts.nodes = computeForceLayout(layoutNodes, layoutEdges, {
    nodeSize: props.nodeSize,
    aspectRatio: aspectRatio.value,
  });

  return g;
}

const graphData = computed(() => {
  if (!props.registers || !Object.keys(props.registers).length) return null;
  return buildGraph();
});

const graphHeight = computed(() => {
  const nodes = graphData.value?.layouts?.nodes;
  if (!nodes) return props.height;
  const ys = Object.values(nodes).map(n => n.y);
  if (!ys.length) return props.height;
  const ySpan = Math.max(...ys) - Math.min(...ys);
  return Math.min(props.height, Math.max(200, ySpan + props.nodeSize * 6));
});

const configs = {
  view: {
    autoPanAndZoomOnLoad: 'fit-content',
    scalingObjects: false,
  },
  node: {
    normal: {
      radius: props.nodeSize / 2,
      color: node => node.color,
    },
    hover: {
      color: node => node.color,
      cursor: 'pointer',
    },
    label: {
      directionAutoAdjustment: true,
    },
  },
  edge: {
    normal: {
      color: '#aaa',
      width: 2,
    },
    hover: {
      color: '#888',
    },
    margin: 4,
    marker: {
      target: { type: 'arrow' },
    },
  },
};

const eventHandlers = {
  'node:click': ({ node }) => {
    const register = props.registers[node];
    const url = register?.viewerURL || register?.gitRepository;
    if (url) window.open(url, '_blank');
  },
};
</script>
