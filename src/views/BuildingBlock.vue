<template>
  <div>
    <v-breadcrumbs>
      <v-breadcrumbs-item :to="{ name: 'BuildingBlockList' }">
          <v-icon size="small">mdi-home</v-icon>
          <span v-if="$vuetify.display.smAndUp">Building Blocks list</span>
      </v-breadcrumbs-item>
      <v-breadcrumbs-divider></v-breadcrumbs-divider>
      <v-breadcrumbs-item class="breadcrumb-bblock">
        <div v-if="bblockName" class="bblock-name">{{ bblockName }}</div>
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
<style lang="scss">
.v-breadcrumbs {
  overflow: hidden;
}
.breadcrumb-bblock {
  overflow: hidden;

  .bblock-name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
