<template>
  <g>
    <rect
      v-if="itemClass === 'datatype'"
      :height="radius * scale * 2"
      :width="radius * scale * 2"
      :x="-radius * scale"
      :y="-radius * scale"
      :fill="fill"
      :stroke="stroke"
      class="v-ng-shape-rect"
    >
      <title v-text="getItemClassLabel(itemClass)"></title>
    </rect>
    <polygon
      v-else-if="['parameter', 'path'].includes(itemClass)"
      :points="resize(points.triangle, radius * scale)"
      :fill="fill"
      :stroke="stroke"
      :transform="itemClass === 'path' ? rotate180 : ''"
    >
      <title v-text="getItemClassLabel(itemClass)"></title>
    </polygon>
    <polygon
      v-else-if="itemClass === 'api'"
      :points="resize(points.hexagon, radius * scale * 1.1)"
      :fill="fill"
      :stroke="stroke"
    >
      <title v-text="getItemClassLabel(itemClass)"></title>
    </polygon>
    <g v-else-if="itemClass === 'model'">
      <!-- Solid rounded square with the tables cut out of it. A mask rather than white shapes,
           so the cut-outs stay legible on the light register colors too. -->
      <mask :id="maskId">
        <rect v-bind="modelBox" fill="white" />
        <g
          fill="black" stroke="black" :stroke-width="radius * scale * 0.09" stroke-linejoin="round"
          :transform="`translate(${radius * scale * MODEL_GLYPH_OFFSET_X} 0)`"
        >
          <path :d="tableLinks" fill="none" />
          <rect
            v-for="(t, i) in tableRects"
            :key="i"
            :x="t.x" :y="t.y" :width="t.w" :height="t.h"
          />
        </g>
      </mask>
      <rect v-bind="modelBox" :fill="fill === 'none' ? '#444' : fill" :mask="`url(#${maskId})`" />
      <title v-text="getItemClassLabel(itemClass)"></title>
    </g>
    <circle
      v-else
      :r="radius * scale"
      :fill="itemClass ? fill : 'white'"
      :stroke="itemClass ? stroke : '#444'"
      :stroke-dasharray="itemClass ? 0 : 2"
    >
      <title v-text="itemClass ? getItemClassLabel(itemClass) : ('Unknown Building Block' + (unknownReason ? `. ${unknownReason}` : ''))"></title>
    </circle>
    <text v-if="!itemClass"
          x="0" :y="radius * scale * 0.1"
          text-anchor="middle" dominant-baseline="middle"
          :font-size="`${radius * scale * 1.3}px`" font-weight="bold" color="#444">?</text>
  </g>
</template>
<script>
import {getLabel as getItemClassLabel} from "@/models/itemClass";

// Model icon geometry, in units of the node radius. The icon is a rounded square
// with three staggered tables cut out, chained by elbow links (ER-diagram style).
// The box has the same half-side as the datatype square (and corners rounded to tell them
// apart), so edge arrowheads, which stop at the node radius, aren't hidden underneath it.
const MODEL_BOX_RADIUS = 0.3;
// The ink is left-heavy (two tables on the left, one on the right), so nudge it right
const MODEL_GLYPH_OFFSET_X = 0.1;
const MODEL_TABLE_W = 0.66;
const MODEL_TABLE_H = 0.38;
const MODEL_TABLES = [[-0.36, -0.58], [0.36, 0], [-0.36, 0.58]]; // [cx, cy]
const MODEL_LINKS = 'M -0.5,-0.39 V 0 H 0.03 M 0.2,0.19 V 0.58 H -0.03';
let modelMaskCounter = 0;

export default {
  props: {
    itemClass: {
      type: String,
    },
    // Extra explanation appended to the tooltip of unknown (unresolved) building blocks
    unknownReason: {
      type: String,
    },
    radius: {
      type: Number,
      required: true,
    },
    scale: {
      type: Number,
      default: 1,
    },
    fill: {
      type: String,
      default: 'none',
    },
    stroke: {
      type: String,
      default: '#999',
    },
  },
  data() {
    return {
      points: {
        triangle: [[0, -1], [1.155, 1], [-1.155, 1]],
        hexagon: [[-1, 0], [-0.5, -0.866], [0.5, -0.866], [1, 0], [0.5, 0.866], [-0.5, 0.866]],
      },
      MODEL_GLYPH_OFFSET_X,
      maskId: `model-mask-${++modelMaskCounter}`,
      rotate180: 'rotate(180, 0.5, 0.5)',
    };
  },
  methods: {
    getItemClassLabel,
    resize(points, size) {
      return points.map(p => p.map(c => c * size));
    },
  },
  computed: {
    modelBox() {
      const r = this.radius * this.scale;
      return {x: -r, y: -r, width: r * 2, height: r * 2, rx: r * MODEL_BOX_RADIUS};
    },
    tableRects() {
      const r = this.radius * this.scale;
      return MODEL_TABLES.map(([cx, cy]) => ({
        x: (cx - MODEL_TABLE_W / 2) * r,
        y: (cy - MODEL_TABLE_H / 2) * r,
        w: MODEL_TABLE_W * r,
        h: MODEL_TABLE_H * r,
      }));
    },
    tableLinks() {
      // Scale the unit-radius path commands to the current node size
      const r = this.radius * this.scale;
      return MODEL_LINKS.replace(/-?\d*\.?\d+/g, n => String(parseFloat(n) * r));
    },
  },
}
</script>
