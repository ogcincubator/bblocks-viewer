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
    <path
      v-else-if="itemClass === 'model'"
      :d="MODEL_PATH"
      :transform="`scale(${radius * scale * 2 / MODEL_PATH_WIDTH}) translate(-12 -13)`"
      :fill="fill === 'none' ? '#444' : fill"
      :stroke="stroke"
      stroke-width="0.8"
      stroke-linejoin="round"
    >
      <title v-text="getItemClassLabel(itemClass)"></title>
    </path>
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

// Model icon: the open book (mdi-book-open-variant) also used for "described by" links,
// as a 24x24 path centered on (12, 13). Its width (~22 units) is mapped to the node diameter.
const MODEL_PATH = 'M17.48 14.34Q18.7 14.34 20.02 14.58V16.08Q19.08 15.84 17.48 15.84Q14.67 15.84 12.98 16.83V15.14Q14.77 14.34 17.48 14.34ZM12.98 12.47Q14.91 11.67 17.48 11.67Q18.75 11.67 20.02 11.91V13.41Q19.08 13.17 17.48 13.17Q14.67 13.17 12.98 14.16ZM17.48 10.5Q14.62 10.5 12.98 11.48V9.84Q14.86 9 17.48 9Q18.66 9 20.02 9.23V10.78Q18.89 10.5 17.48 10.5ZM21 18.52V6.98Q19.41 6.52 17.48 6.52Q14.44 6.52 12 8.02V19.5Q14.44 18 17.48 18Q19.31 18 21 18.52ZM17.48 4.5Q21.05 4.5 23.02 6V20.58Q23.02 20.77 22.83 20.93Q22.64 21.09 22.5 21.09Q22.36 21.09 22.27 21.05Q20.34 20.02 17.48 20.02Q14.44 20.02 12 21.52Q9.98 20.02 6.52 20.02Q4.03 20.02 1.73 21.05L1.5 21.14Q1.31 21.14 1.15 21Q0.98 20.86 0.98 20.67V6Q3 4.5 6.49 4.5Q9.98 4.5 12 6Q14.02 4.5 17.48 4.5Z';
const MODEL_PATH_WIDTH = 22;

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
      MODEL_PATH,
      MODEL_PATH_WIDTH,
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
  },
}
</script>
