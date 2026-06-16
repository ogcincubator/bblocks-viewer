<template>
  <div class="register-import-graph">
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
import { ref, computed } from 'vue';
import dagre from 'dagre';
import { VNetworkGraph } from 'v-network-graph';
import 'v-network-graph/lib/style.css';

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

function buildGraph() {
  const g = { nodes: {}, edges: {}, layouts: { nodes: {} } };
  const dg = new dagre.graphlib.Graph();
  dg.setGraph({ rankdir: 'TB', nodesep: props.nodeSize, edgesep: props.nodeSize, ranksep: props.nodeSize });
  dg.setDefaultEdgeLabel(() => ({}));

  for (const [url, register] of Object.entries(props.registers)) {
    const name = register.name || url;
    g.nodes[url] = { id: url, name, color: register.color };
    dg.setNode(url, {
      label: name,
      width: Math.max(props.nodeSize, name.length * 5.2),
      height: props.nodeSize + 12,
    });
  }

  for (const [url, register] of Object.entries(props.registers)) {
    if (Array.isArray(register.imports)) {
      for (const importUrl of register.imports) {
        if (props.registers[importUrl]) {
          const edgeId = `${url}-${importUrl}`;
          if (!g.edges[edgeId]) {
            g.edges[edgeId] = { source: url, target: importUrl };
            dg.setEdge(url, importUrl);
          }
        }
      }
    }
  }

  dagre.layout(dg);
  dg.nodes().forEach(nodeId => {
    const dgNode = dg.node(nodeId);
    if (dgNode) g.layouts.nodes[nodeId] = { x: dgNode.x, y: dgNode.y };
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
