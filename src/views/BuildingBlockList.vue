<template>
  <v-container class="bblock-list">
    <v-row>
      <v-col>
        <building-block-filters
          @filter-change="this.filterValues = $event"
        ></building-block-filters>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-center text-md-right">
        <v-btn-toggle
          v-model="displayMode"
          divided
          mandatory
        >
          <v-btn prepend-icon="mdi-view-list" value="list">List</v-btn>
          <v-btn prepend-icon="mdi-file-tree" value="tree">Tree</v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-row v-if="displayMode === 'tree'">
      <v-col cols="12">
        <building-blocks-tree :bblocks="filteredBuildingBlocksList"></building-blocks-tree>
      </v-col>
    </v-row>
    <v-row v-if="displayMode === 'list' && filteredBuildingBlocks?.highlighted?.length" align="stretch">
      <v-col cols="12">
        <h2>Highlighted Building Blocks</h2>
      </v-col>
      <v-col
        v-for="bblock of filteredBuildingBlocks.highlighted" :key="bblock.itemIdentifier"
        md="6"
      >
        <building-block-list-item
          :bblock="bblock"
          :to="{ name: 'BuildingBlock', params: { id: bblock.itemIdentifier } }"
          class="highlighted-bblock"
        ></building-block-list-item>
      </v-col>
      <v-divider></v-divider>
    </v-row>
    <v-row v-if="displayMode === 'list'" align="stretch">
      <v-col
        v-for="bblock of filteredBuildingBlocks.nonHighlighted" :key="bblock.itemIdentifier"
        md="6"
      >
        <building-block-list-item
          :bblock="bblock"
          :to="{ name: 'BuildingBlock', params: { id: bblock.itemIdentifier } }"
        ></building-block-list-item>
      </v-col>
    </v-row>
    <v-row v-if="buildingBlocks && !filteredBuildingBlocks.nonHighlighted.length && !filteredBuildingBlocks.highlighted.length">
      <v-col>
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
import bblockService from "@/services/bblock.service";
import BuildingBlockFilters from "@/components/BuildingBlockFilters.vue";
import configService from "@/services/config.service";
import BuildingBlockListItem from "@/components/BuildingBlockListItem.vue";
import BuildingBlocksTree from "@/components/BuildingBlocksTree.vue";

export default {
  components: {
    BuildingBlocksTree,
    BuildingBlockListItem,
    BuildingBlockFilters,
  },
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
      displayMode: 'list',
    };
  },
  mounted() {
    this.loading = true;
    bblockService.getBBlocks(configService.config.showImported)
      .then(resp => {
        this.buildingBlocks = Object.values(resp)
          .filter(bblockService.isShown)
          .sort((a, b) => {
            const na = a.itemIdentifier.toLowerCase(), nb = b.itemIdentifier.toLowerCase();
            return na < nb ? -1 : (na > nb ? 1 : 0);
          });
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    isVisible(bblock) {
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
        if (this.filterValues.tags?.length
            && !bblock.tags?.some(t => this.filterValues.tags.includes(t.toLowerCase()))) {
          return false;
        }
        if (!this.filterValues.itemClasses.includes(bblock.itemClass)) {
          return false;
        }
        return true;
    },
  },
  computed: {
    filteredBuildingBlocks() {
      const highlighted = [], nonHighlighted = [];
      if (this.filterValues && this.buildingBlocks) {
        this.buildingBlocks.forEach(bblock => {
          if (this.isVisible(bblock)) {
            (bblock.highlighted ? highlighted : nonHighlighted).push(bblock);
          }
        });
      }
      return {
        highlighted, nonHighlighted,
      }
    },
    filteredBuildingBlocksList() {
      return [...this.filteredBuildingBlocks.highlighted, ...this.filteredBuildingBlocks.nonHighlighted];
    },
  },
}
</script>

<style lang="scss">
.bblock-list {
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

  .bblock-name {
    white-space: normal !important;
  }

  .more-info p {
    margin-bottom: 0.6rem;
  }

  .tags {

    .tags-title {
      font-weight: bold;
    }

    .tag {
      &:after {
        content: ",";
      }

      &:last-child:after {
        content: "";
      }
    }
  }

  .highlighted-bblock {
    background-color: #ffffdd;
  }
}

.markdown-text {
  p {
    margin-bottom: 0.4rem;
  }
}
</style>
