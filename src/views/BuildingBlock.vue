<template>
  <div>
    <v-breadcrumbs>
      <v-breadcrumbs-item :to="{ name: 'Home' }" title="Building Blocks list"></v-breadcrumbs-item>
      <v-breadcrumbs-divider></v-breadcrumbs-divider>
      <v-breadcrumbs-item>
        <div v-if="bblockName">{{ bblockName }}</div>
        <v-progress-circular
          v-if="loading"
          color="primary"
          indeterminate
          size="18"
        ></v-progress-circular>
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <building-block
      :bblock-id="$route.params.id"
      @load="this.bblockName = $event.name"
      @update:loading="loading = $event"/>
  </div>
</template>

<script>
import BuildingBlock from "@/components/BuildingBlock.vue";
import bblockService from "@/services/bblock.service";

export default {
  components: {BuildingBlock},
  data() {
    return {
      bblockName: null,
      loading: false,
    };
  },
  watch: {
    "$route.params.id": {
      handler(v) {
        if (v) {
          bblockService.getBBlocks().then(bblocks => {
            if (bblocks[v]) {
              this.bblockName = bblocks[v].name;
            }
          })
        }
      },
      immediate: true,
    },
  },
}
</script>
