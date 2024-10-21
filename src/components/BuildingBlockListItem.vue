<template>
  <v-card
    class="fill-height d-flex flex-column building-block"
  >
    <v-card-title class="d-flex pb-0 bblock-name flex-column flex-sm-row align-start">
      <div>{{ bblock.name }} <small>v{{ bblock.version }}</small></div>
      <v-spacer></v-spacer>
      <div>
        <status-chip class="my-1 mt-sm-0" :status="bblock.status"></status-chip>
      </div>
    </v-card-title>
    <v-card-subtitle class="text-caption" :title="bblock.itemIdentifier">
      <code>{{ bblock.itemIdentifier }}</code>
    </v-card-subtitle>
    <v-card-text>
      <div class="abstract">
        {{ trim(bblock.abstract, 200) }}
      </div>
    </v-card-text>
    <div class="bblock-bottom mb-2 mx-2">
      <div class="tags mb-2 ml-2" v-if="bblock.tags?.length">
        <span class="tags-title mr-1 mb-1 text-caption">Tags:</span>
        <span class="tag mr-1 mb-1 text-caption" v-for="tag in bblock.tags" v-text="tag" :key="tag"></span>
      </div>
      <div class="d-flex flex-column flex-sm-row align-start">
        <div>
          <v-chip
            variant="flat"
            :color="bblock.register.color"
            :title="`${bblock.register.name}\n${bblock.register.url}`"
          >
            <span class="text-truncate">
              {{ bblock.register.name }}
            </span>
          </v-chip>
        </div>
        <v-spacer></v-spacer>
        <div>
          <v-chip color="default" variant="flat" class="mt-2 mt-sm-0">
            {{ getItemClassLabel(bblock.itemClass) }}
          </v-chip>
        </div>
      </div>
    </div>
  </v-card>
</template>
<script>
import {getLabel as getItemClassLabel} from "@/models/itemClass";
import StatusChip from "@/components/StatusChip.vue";

export default {
  components: {
    StatusChip,
  },
  props: {
    bblock: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getItemClassLabel,
    trim(s, l, ellipsis = '…') {
      if (!s || s.length <= l) {
        return s;
      }
      return `${s.substr(0, l - 1)}${ellipsis}`;
    },
  },
}
</script>
