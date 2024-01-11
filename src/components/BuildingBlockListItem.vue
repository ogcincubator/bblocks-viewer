<template>
  <v-card
    class="fill-height d-flex flex-column building-block"
  >
    <v-card-title class="d-flex pb-0 bblock-name">
      <div>{{ bblock.name }} <small>v{{ bblock.version }}</small></div>
      <v-spacer></v-spacer>
      <status-chip :status="bblock.status"></status-chip>
    </v-card-title>
    <v-card-subtitle class="text-caption">
      <code>{{ bblock.itemIdentifier }}</code>
    </v-card-subtitle>
    <v-card-text>
      <div class="abstract">
        {{ trim(bblock.abstract, 200) }}
      </div>
    </v-card-text>
    <div class="bblock-bottom mb-2 ml-2">
      <div class="tags mb-2 ml-2" v-if="bblock.tags?.length">
        <span class="tags-title mr-1 mb-1 text-caption">Tags:</span>
        <span class="tag mr-1 mb-1 text-caption" v-for="tag in bblock.tags" v-text="tag"></span>
      </div>
      <div>
        <v-chip
          variant="flat"
          :color="bblock.register.color"
          :title="bblock.register.url"
        >
          {{ bblock.register.name }}
        </v-chip>
      </div>
    </div>
  </v-card>
</template>
<script>
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
    trim(s, l, ellipsis = '…') {
      if (!s || s.length <= l) {
        return s;
      }
      return `${s.substr(0, l - 1)}${ellipsis}`;
    },
  },
}
</script>
