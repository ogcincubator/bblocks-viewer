<template>
  <div>
    <v-breadcrumbs>
      <v-breadcrumbs-item :to="{ name: 'Home' }" title="Building Blocks list"></v-breadcrumbs-item>
      <v-breadcrumbs-divider></v-breadcrumbs-divider>
      <v-breadcrumbs-item>
        <div v-if="bblockName">{{ bblockName }}</div>
        <v-progress-circular
          v-else
          color="primary"
          indeterminate
          size="18"
        ></v-progress-circular>
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <building-block :bblock-id="$route.params.id" @load="this.bblockName = $event.name"/>
  </div>
</template>

<script>
import BuildingBlock from "@/components/BuildingBlock.vue";

export default {
  components: {BuildingBlock},
  data() {
    return {
      bblockName: null,
    };
  },
}
</script>
