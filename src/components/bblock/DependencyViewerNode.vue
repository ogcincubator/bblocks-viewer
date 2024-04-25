<template>
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
  <circle
    v-else
    :r="radius * scale"
    :fill="fill"
    :stroke="stroke"
  >
    <title v-text="getItemClassLabel(itemClass)"></title>
  </circle>
</template>
<script>
import {getLabel as getItemClassLabel} from "@/models/itemClass";
export default {
  props: {
    itemClass: {
      type: String,
      required: true,
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
      default: '',
    },
  },
  data() {
    return {
      points: {
        triangle: [[0, -1], [1.155, 1], [-1.155, 1]],
        hexagon: [[-1, 0], [-0.5, -0.866], [0.5, -0.866], [1, 0], [0.5, 0.866], [-0.5, 0.866]],
      },
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
