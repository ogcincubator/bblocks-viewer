<template>
  <v-container>
    <v-row>
      <v-col>
        <building-block-filters
          @filter-change="this.filterValues = $event"
        ></building-block-filters>
      </v-col>
    </v-row>
    <v-row align="stretch">
      <v-col
        v-for="bblock of filteredBuildingBlocks" :key="bblock.itemIdentifier"
        md="6"
      >
        <v-card
          class="fill-height d-flex flex-column"
          :to="{ name: 'BuildingBlock', params: { id: bblock.itemIdentifier } }"
        >
          <v-card-title class="d-flex pb-0">
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
            <v-chip
              variant="flat"
              :color="bblock.register.color"
              :title="bblock.register.url"
            >
              {{ bblock.register.name }}
            </v-chip>
          </div>
        </v-card>
      </v-col>
      <v-col v-if="buildingBlocks && !filteredBuildingBlocks.length">
        <v-card>
          <v-card-title v-if="buildingBlocks.length">No building blocks match the current filters</v-card-title>
          <v-card-title v-else>No building blocks were found in the register.</v-card-title>
        </v-card>
      </v-col>
    </v-row>

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
import StatusChip from "@/components/StatusChip.vue";
import BuildingBlockFilters from "@/components/BuildingBlockFilters.vue";
import {statuses} from "@/models/status";
import configService from "@/services/config.service";

export default {
  components: {BuildingBlockFilters, RegisterLoadingProgress, BuildingBlock, StatusChip},
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
      filterValues: null,
    };
  },
  mounted() {
    this.loading = true;
    bblockService.getBBlocks(configService.config.showImported)
      .then(resp => {
        this.buildingBlocks = Object.values(resp).sort((a, b) => {
          const na = a.itemIdentifier.toLowerCase(), nb = b.itemIdentifier.toLowerCase();
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
  computed: {
    filteredBuildingBlocks() {
      if (!this.filterValues || !this.buildingBlocks) {
        return [];
      }
      return this.buildingBlocks.filter(bblock => {
        if (this.filterValues.text) {
          const f = this.filterValues.text.trim().toLowerCase();
          if (bblock.itemIdentifier.toLowerCase().indexOf(f) < 0
                && bblock.name.toLowerCase().indexOf(f) < 0) {
                  return false;
          }
        }
        if (!this.filterValues.status.includes(bblock.status)) {
          return false;
        }
        if (this.filterValues.registers !== null &&
            !this.filterValues.registers.includes(bblock.register.url)) {
          return false;
        }
        return true;
      });
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
