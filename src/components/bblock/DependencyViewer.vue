<template>
  <div class="dependency-viewer">
    <div v-if="hasDependencies">
      <div class="text-right">
        <v-btn-toggle
          v-model="mode"
          rounded="0"
          color="primary"
          group
        >
          <v-btn value="simplified">Simplified</v-btn>
          <v-btn value="full">Full</v-btn>
        </v-btn-toggle>
      </div>
      <v-network-graph
          :nodes="graphData.nodes"
          :edges="graphData.edges"
          :layouts="graphData.layouts"
          :configs="configs"
          :event-handlers="eventHandlers"
          style="height: 400px"
          ref="networkGraph"
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
      <div class="legend d-flex flex-column" :class="{ 'md-and-up': $vuetify.display.mdAndUp }">
        <div class="d-flex">
          <svg xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="10" :fill="nodeColors.current"/>
          </svg>
          <div>
            This building block
          </div>
        </div>
        <div class="d-flex">
          <svg xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="10" :fill="nodeColors.local"/>
          </svg>
          <div>
            Building block in this register
          </div>
        </div>
        <div class="d-flex">
          <svg xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="10" :fill="nodeColors.remote"/>
          </svg>
          <div>
            Imported building block
          </div>
        </div>
      </div>
    </div>
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
import {has} from "immutable";

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
      mode: 'simplified',
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
      nodeColors,
    };
  },
  mounted() {
    bblockService.getBBlocks(true).then(bblocks => {
      this.allBBlocks = bblocks;
    });
  },
  computed: {
    hasDependencies() {
      return this.allBBlocks
        && this.bblockId
        && this.allBBlocks[this.bblockId]?.dependsOn?.length;
    },
    graphData() {
      if (!this.hasDependencies) {
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

        if (this.mode === 'full' || cur.local) {
          if (cur.profileOf) {
            const profileOf = Arrays.isArray(cur.profileOf) ? cur.profileOf : [cur.profileOf];
            profileOf.forEach(dep => addEdge(dep, 'profileOf'));
          }
          cur.dependsOn?.forEach(dep => addEdge(dep, 'dependsOn'));
        }

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
    },
  },
  watch: {
    graphData(v) {
      if (v && this.$refs.networkGraph) {
        this.$refs.networkGraph.fitToContents();
      }
    },
  }
}
</script>
<style scoped lang="scss">

.dependency-viewer {
  position: relative;
}

.legend {
  border-radius: 3px;
  border: 1px solid #eee;
  padding: 0.6rem;

  &.md-and-up {
    width: 250px;
    position: absolute;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.7)
  }

  > div {
    margin-bottom: 0.25rem;
  }

  svg {
    width: 20px;
    height: 20px;
    margin-right: 0.4rem;
  }

  text {
    font-size: 14px;
  }
}
</style>
