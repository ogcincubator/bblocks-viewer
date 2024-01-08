<template>
  <div class="dependency-viewer">
    <v-network-graph
        v-if="graphData"
        :nodes="graphData.nodes"
        :edges="graphData.edges"
        :layouts="graphData.layouts"
        :configs="configs"
        :event-handlers="eventHandlers"
        style="height: 400px"
      >
      <template #edge-label="{edge, ...slotProps}">
        <v-edge-label v-if="edge.type === 'profileOf'"
                      text="profileOf"
                      align="center"
                      vertical-align="above"
                      v-bind="slotProps"
        ></v-edge-label>
      </template>
    </v-network-graph>
    <div v-else>
      This building block has no dependencies.
    </div>
  </div>
</template>
<script>
import {VEdgeLabel, VNetworkGraph} from "v-network-graph";
import "v-network-graph/lib/style.css"
import bblockService from "@/services/bblock.service";
import dagre from "dagre";

const edgeColors = {
  profileOf: 'blue',
  dependsOn: '#aaa',
};

const nodeColors = {
  current: 'red',
  local: 'blue',
  remote: 'gray',
};

export default {
  components: {
    VEdgeLabel,
    VNetworkGraph,
  },
  props: {
    bblockId: {
      type: String,
      required: true,
    },
    nodeSize: {
      type: Number,
      default: 30,
    },
  },
  data() {
    return {
      allBBlocks: null,
      configs: {
        view: {
          autoPanAndZoomOnLoad: 'fit-content',
          scalingObjects: true,
        },
        node: {
          normal: {
            radius: this.nodeSize / 2,
            color: node => nodeColors[node.type],
          },
          hover: {
            color: node => nodeColors[node.type],
          },
          label: {
            directionAutoAdjustment: true,
          },
        },
        edge: {
          normal: {
            color: edge => edgeColors[edge.type],
            width: 2,
          },
          margin: 4,
          marker: {
            target: {
              type: 'arrow',
            },
          },
        },
      },
      eventHandlers: {
        "node:click": ({ node }) => {
          if (this.allBBlocks[node]?.local) {
            this.$router.push({
              name: 'BuildingBlock',
              params: {
                id: node,
              },
            });
          }
        },
      },
    };
  },
  mounted() {
    bblockService.getBBlocksMetadata(true).then(bblocks => {
      this.allBBlocks = bblocks;
    });
  },
  computed: {
    graphData() {
      if (!this.allBBlocks
          || !this.bblockId
          || !this.allBBlocks[this.bblockId]?.dependsOn?.length) {
        return null;
      }
      const g = {
        nodes: {},
        edges: {},
        layouts: {
          nodes: {},
        },
      };
      const dg = new dagre.graphlib.Graph();
      dg.setGraph({
        rankdir: 'TB',
        nodesep: this.nodeSize,
        edgesep: this.nodeSize,
        ranksep: this.nodeSize,
      });
      dg.setDefaultEdgeLabel(() => ({}));
      g.layouts.nodes[this.bblockId] = {
        x: 0,
        y: 0,
        fixed: true,
      };
      const seen = new Set(), pending = [this.bblockId];
      let curId;
      while (curId = pending.pop()) {
        if (seen.has(curId)) {
          continue;
        }
        let cur = this.allBBlocks[curId];
        if (!cur) {
          cur = {
            local: false,
            name: curId,
          };
        }
        let nodeType = cur['local'] ? 'local' : 'remote';
        if (curId === this.bblockId) {
          nodeType = 'current';
        }
        g.nodes[curId] = {
          id: curId,
          name: cur.name,
          type: nodeType,
        };
        dg.setNode(curId, {
          label: cur.name,
          width: Math.max(this.nodeSize, cur.name.length * 4),
          height: this.nodeSize + 12,
        });

        const addEdge = (dep, type) => {
          const edgeId = `${curId}-${dep}`;
          if (!g.edges[edgeId]) {
            g.edges[edgeId] = {
              source: curId,
              target: dep,
              type: type,
            };
            dg.setEdge(curId, dep);
          }
          if (!seen.has(dep)) {
            pending.push(dep);
          }
        }

        if (cur.profileOf) {
          const profileOf = Arrays.isArray(cur.profileOf) ? cur.profileOf : [cur.profileOf];
          profileOf.forEach(dep => addEdge(dep, 'profileOf'));
        }
        cur.dependsOn?.forEach(dep => addEdge(dep, 'dependsOn'));
        seen.add(curId);
      }

      dagre.layout(dg);

      dg.nodes().forEach(nodeId => {
        const dgNode = dg.node(nodeId);
        if (dgNode) {
          g.layouts.nodes[nodeId] = {
            x: dgNode.x,
            y: dgNode.y,
          };
        }
      });

      return g;
    }
  },
}
</script>
