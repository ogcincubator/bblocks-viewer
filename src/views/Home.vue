<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <em>Filters coming soon</em>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="stretch">
      <v-col
        v-for="bblock of buildingBlocks" :key="bblock.itemIdentifier"
        md="6"
      >
        <v-card class="fill-height" :to="{ name: 'BuildingBlock', params: { id: bblock.itemIdentifier } }">
          <v-card-title>{{ bblock.name }} <small>v{{ bblock.version }}</small></v-card-title>
          <v-card-subtitle style="text-transform: capitalize">{{ bblock.status }}, {{ bblock.maturity }}</v-card-subtitle>
          <v-card-text>
            <div class="abstract">
              {{ trim(bblock.abstract, 200) }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="bblockDialog" width="1200" class="top-dialog">
      <building-block :bblock="bblockView">
        <template v-slot:bottom>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="bblockDialog = false">Close</v-btn>
          </v-card-actions>
        </template>
      </building-block>
    </v-dialog>

    <v-overlay
      :model-value="loading"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import BuildingBlock from "@/views/BuildingBlock";
import bblockService from "@/services/bblock.service";
import RegisterLoadingProgress from "@/components/RegisterLoadingProgress.vue";

export default {
  components: {RegisterLoadingProgress, BuildingBlock},
  data() {
    return {
      loading: false,
      buildingBlocks: null,
      bblockDialog: false,
      bblockView: null,
      registerProgress: {
        completed: 0,
        total: 0,
      },
      showRegisterLoadingProgress: false,
    };
  },
  mounted() {
    this.loading = true;
    bblockService.getBBlocks()
      .then(resp => {
        this.buildingBlocks = resp;
        Object.values(this.buildingBlocks).sort((a, b) => {
          const na = a.name.toLowerCase(), nb = b.name.toLowerCase();
          return na < nb ? -1 : (na > nb ? 1 : 0);
        });
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    trim(s, l, ellipsis='…') {
      if (!s || s.length <= l) {
        return s;
      }
      return `${s.substr(0, l - 1)}${ellipsis}`;
    },
    viewBBlock(bblock) {
      this.bblockView = bblock;
      this.bblockDialog = true;
    },
  },
}
</script>

<style lang="scss">
.top-dialog {
  align-items: start !important;
}
.abstract {
  line-clamp: 2;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
}
</style>
