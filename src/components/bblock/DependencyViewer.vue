<template>
  <div class="dependency-viewer">

    <div v-if="hasContent && graphData">
      <div class="text-right">
        <v-btn-toggle
          v-if="isSingleMode && !mode"
          v-model="activeMode"
          rounded="0"
          color="primary"
          group
          mandatory="force"
        >
          <v-btn v-if="extensionPoints" value="extensionPoints">Extension points</v-btn>
          <v-btn value="simplified">Simplified</v-btn>
          <v-btn value="full">Full</v-btn>
        </v-btn-toggle>
      </div>
      <v-network-graph
          :nodes="visibleNodes"
          :edges="visibleEdges"
          :layouts="graphData.layouts"
          :configs="configs"
          :event-handlers="eventHandlers"
          :style="{ height: graphHeight + 'px' }"
          ref="networkGraph"
        >
        <template #edge-label="{edge, hovered, ...slotProps}">
          <v-edge-label v-if="activeMode !== 'jsonld-context' && (hovered || showEdgeTypes.includes(edge.type))"
                        :text="edge.type"
                        align="center"
                        vertical-align="above"
                        v-bind="slotProps"
          ></v-edge-label>
        </template>
        <template #override-node="{ nodeId, scale, config, ...slotProps }">
          <graph-node
            v-if="activeMode !== 'jsonld-context'"
            :item-class="allBBlocks[nodeId]?.itemClass"
            :scale="scale"
            :radius="config.radius"
            :fill="config.color"
            v-bind="slotProps">
          </graph-node>
          <g v-else v-bind="slotProps">
            <circle :r="config.radius * scale" :fill="config.color"></circle>
          </g>
        </template>
        <!-- v-network-graph uses dominant-baseline="text-top" for above-node labels, which anchors
             the top of the em box to the computed y and causes text to extend into the node.
             We override it to "auto" (alphabetic baseline) so text extends away from the node. -->
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
      <div v-if="legendSpacerHeight" class="legend-spacer" :style="{ height: legendSpacerHeight + 'px' }"></div>
      <div v-if="registersLegend" class="legend d-flex flex-column" :class="{ 'md-and-up': $vuetify.display.mdAndUp }">
        <div
          class="d-flex legend-item-register"
          :class="{ 'item-register-hidden': hiddenRegisters.includes(register.url) }"
          v-for="register in graphData.usedRegisters"
          :key="register.url"
          @click="toggleRegister(register.url)"
          :title="(hiddenRegisters.includes(register.url) ? 'Show' : 'Hide') + ': ' + register.name"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="flex-0-0">
            <circle cx="10" cy="10" r="10" :fill="register.color"/>
          </svg>
          <div class="register-name">
            {{ register.name }}
          </div>
          <v-icon class="legend-eye ms-auto ps-1" size="16">
            {{ hiddenRegisters.includes(register.url) ? 'mdi-eye-off' : 'mdi-eye' }}
          </v-icon>
        </div>
      </div>
      <div v-if="itemClassLegend" class="legend legend-left d-flex flex-column" :class="{ 'md-and-up': $vuetify.display.mdAndUp }">
        <div
          class="d-flex legend-item-class"
          :class="{ 'item-class-hidden': hiddenItemClasses.includes(itemClass) }"
          v-for="(itemClassLabel, itemClass) in graphData.usedItemClasses"
          :key="itemClass"
          @click="toggleItemClass(itemClass)"
          :title="(hiddenItemClasses.includes(itemClass) ? 'Show' : 'Hide') + ': ' + itemClassLabel"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="-16 -16 32 32">
            <graph-node
              :item-class="itemClass"
              :radius="configs.node.normal.radius"
              stroke="black"
            />
          </svg>
          <div class="item-class-name">
            {{ itemClassLabel }}
          </div>
          <v-icon class="legend-eye ms-auto ps-1" size="16">
            {{ hiddenItemClasses.includes(itemClass) ? 'mdi-eye-off' : 'mdi-eye' }}
          </v-icon>
        </div>
      </div>
    </div>
    <div v-else-if="activeMode !== 'jsonld-context'">
      <template v-if="isSingleMode">This building block has no dependencies.</template>
      <template v-else-if="!bblocks.length">No building blocks to display.</template>
      <template v-else>No dependency relationships found between the current building blocks.</template>
    </div>
  </div>
</template>
<script>
import {VEdgeLabel, VNetworkGraph} from "v-network-graph";
import "v-network-graph/lib/style.css"
import bblockService from "@/services/bblock.service";
import GraphNode from "@/components/bblock/GraphNode.vue";
import { buildSingleGraph, buildMultiGraph, buildJsonLdContextSourceGraph } from "@/lib/dependency-graph";

const edgeColors = {
  isProfileOf: 'blue',
  dependsOn: '#aaa',
  extends: 'red',
  extensionSource: '#ff5a5a',
  extensionTarget: '#ff8e03',
};

const showEdgeTypes = ['isProfileOf', 'extensionBase', 'extensionSource', 'extensionTarget', 'extends'];

export default {
  components: {
    GraphNode,
    VEdgeLabel,
    VNetworkGraph,
  },
  props: {
    // String: single-bblock mode (BFS from that ID, simplified/full/extensionPoints/jsonld-context
    //   tabs shown unless mode is fixed via the mode prop)
    // Array<string>: multi-bblock mode (all IDs as nodes, local-to-local edges only, no tabs)
    bblocks: {
      type: [String, Array],
      required: true,
    },
    nodeSize: {
      type: Number,
      default: 30,
    },
    height: {
      type: Number,
      default: 400,
    },
    // Fixes the graph mode and disables auto-switching (extensionPoints detection, datatype
    // hiding). Adds a 'jsonld-context' mode that traces where the assembled JSON-LD context
    // comes from, skipping over dependencies without their own sourceLdContext.
    mode: {
      type: String,
      default: null,
    },
    itemClassLegend: {
      type: Boolean,
      default: true,
    },
    registersLegend: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      allBBlocks: null,
      activeMode: this.mode || 'simplified',
      configs: {
        view: {
          autoPanAndZoomOnLoad: 'fit-content',
          scalingObjects: false,
        },
        node: {
          normal: {
            radius: this.nodeSize / 2,
            color: node => node.color,
          },
          hover: {
            color: node => node.color,
          },
          label: {
            directionAutoAdjustment: true,
          },
        },
        edge: {
          normal: {
            color: edge => edgeColors[edge.type] || '#aaa',
            width: 2,
            dasharray: edge => edge.type === 'extends' ? "2" : "0",
          },
          hover: {
            color: edge => edgeColors[edge.type] || '#888',
          },
          margin: 4,
          marker: {
            target: {
              type: 'arrow',
            },
          },
          label: {
            fontSize: 8,
          },
        },
      },
      eventHandlers: {
        "node:click": ({ node }) => {
          this.$emit('node:click', node);
        },
        "edge:click": ({ edges }) => {
          const edgeType = this.graphData?.edges?.[edges[0]]?.type;
          if (edgeType) {
            window.open(`https://ogcincubator.github.io/bblocks-docs/overview/relationships#type-${edgeType}`)
          }
        },
      },
      showEdgeTypes,
      hiddenItemClasses: [],
      hiddenRegisters: [],
    };
  },
  mounted() {
    bblockService.getBBlocks(true).then(bblocks => {
      this.allBBlocks = bblocks;
    });
  },
  methods: {
    toggleItemClass(itemClass) {
      const idx = this.hiddenItemClasses.indexOf(itemClass);
      if (idx === -1) {
        this.hiddenItemClasses.push(itemClass);
      } else {
        this.hiddenItemClasses.splice(idx, 1);
      }
    },
    toggleRegister(registerUrl) {
      const idx = this.hiddenRegisters.indexOf(registerUrl);
      if (idx === -1) {
        this.hiddenRegisters.push(registerUrl);
      } else {
        this.hiddenRegisters.splice(idx, 1);
      }
    },
  },
  computed: {
    isSingleMode() {
      return typeof this.bblocks === 'string';
    },
    bblockId() {
      return this.isSingleMode ? this.bblocks : null;
    },
    bblock() {
      if (this.isSingleMode && this.allBBlocks) {
        return this.allBBlocks[this.bblockId];
      }
      return null;
    },
    hasDependencies() {
      return !!this.bblock?.dependsOn?.length;
    },
    extensionPoints() {
      return this.bblock?.extensionPoints;
    },
    graphHeight() {
      const nodes = this.graphData?.layouts?.nodes;
      if (!nodes) return this.height;
      const ys = Object.values(nodes).map(n => n.y);
      if (!ys.length) return this.height;
      const ySpan = Math.max(...ys) - Math.min(...ys);
      return Math.min(this.height, Math.max(200, ySpan + this.nodeSize * 6));
    },
    // In jsonld-context mode the graph is narrower (side-by-side layout), so the
    // absolutely-positioned legend needs real reserved space below the auto-fit graph canvas
    // instead of overlapping the lowest row of nodes.
    legendSpacerHeight() {
      if (this.activeMode !== 'jsonld-context' || !(this.registersLegend || this.itemClassLegend)) {
        return 0;
      }
      return 72;
    },
    hasContent() {
      if (!this.graphData) return false;
      if (this.activeMode === 'jsonld-context') return Object.keys(this.graphData.nodes).length > 1;
      if (this.isSingleMode) return this.hasDependencies;
      return Object.keys(this.graphData.edges).length > 0;
    },
    visibleNodes() {
      if (!this.graphData?.nodes) {
        return {};
      }
      if (!this.hiddenItemClasses.length && !this.hiddenRegisters.length) {
        return this.graphData.nodes;
      }
      return Object.fromEntries(
        Object.entries(this.graphData.nodes).filter(([nodeId]) => {
          const bblock = this.allBBlocks?.[nodeId];
          if (bblock?.itemClass && this.hiddenItemClasses.includes(bblock.itemClass)) return false;
          if (bblock?.register?.url && this.hiddenRegisters.includes(bblock.register.url)) return false;
          return true;
        })
      );
    },
    visibleEdges() {
      if (!this.graphData?.edges || (!this.hiddenItemClasses.length && !this.hiddenRegisters.length)) {
        return this.graphData?.edges || {};
      }
      const visibleNodeIds = new Set(Object.keys(this.visibleNodes));
      return Object.fromEntries(
        Object.entries(this.graphData.edges).filter(([, edge]) =>
          visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target)
        )
      );
    },
    graphData() {
      if (!this.allBBlocks) return null;
      if (this.activeMode === 'jsonld-context') {
        if (!this.isSingleMode) return null;
        return buildJsonLdContextSourceGraph(this.bblockId, this.allBBlocks, this.nodeSize);
      }
      if (this.isSingleMode) {
        if (!this.hasDependencies) return null;
        return buildSingleGraph(this.bblockId, this.allBBlocks, this.activeMode, this.nodeSize);
      }
      if (!this.bblocks.length) return null;
      return buildMultiGraph(this.bblocks, this.allBBlocks, this.nodeSize);
    },
  },
  watch: {
    bblock(v) {
      if (this.mode) return; // mode fixed externally: skip auto-switching
      if (this.extensionPoints) {
        this.activeMode = 'extensionPoints';
      }
      if (v?.itemClass !== 'datatype') {
        this.hiddenItemClasses = ['datatype'];
      }
    },
    graphData(v) {
      if (v && this.$refs.networkGraph) {
        this.$refs.networkGraph.fitToContents();
      }
    },
    hasContent: {
      handler(v) {
        this.$emit('has-content', v);
      },
      immediate: true,
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
  padding: 0.4rem 0.6rem;
  font-size: 14px;

  &.md-and-up {
    width: 300px;
    position: absolute;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.7);
  }

  &.legend-left {
    right: initial;
    left: 0;
  }

  > div {
    margin-bottom: 0.15rem;
  }

  svg {
    width: 16px;
    height: 16px;
    margin-right: 0.4rem;
  }

  text {
    font-size: 14px;
  }

  .register-name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .legend-item-class,
  .legend-item-register {
    cursor: pointer;
    user-select: none;
    transition: opacity 0.2s;

    .legend-eye {
      opacity: 0.6;
      transition: opacity 0.2s;
    }

    &:hover {
      .legend-eye {
        opacity: 1;
      }
    }
  }

  .legend-item-class.item-class-hidden,
  .legend-item-register.item-register-hidden {
    opacity: 0.4;

    .legend-eye {
      opacity: 1;
    }
  }
}
</style>
<style lang="scss">
.dependency-viewer {
  .v-ng-layer-edges {
    .v-ng-line-background {
      cursor: help;
    }
  }
}
</style>
