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
          <v-btn prepend-icon="mdi-graph" value="graph">Graph</v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-row v-if="displayMode === 'graph'">
      <v-col cols="12">
        <dependency-viewer
          :bblocks="filteredBuildingBlocksList.map(b => b.itemIdentifier)"
          :height="700"
          @node:click="id => $router.push({ name: 'BuildingBlock', params: { id } })"
        ></dependency-viewer>
      </v-col>
    </v-row>
    <v-row v-if="displayMode === 'tree'">
      <v-col cols="12">
        <building-blocks-tree :bblocks="filteredBuildingBlocksList"></building-blocks-tree>
      </v-col>
    </v-row>
    <template v-if="displayMode === 'list'">
      <v-row v-if="groupsWithMore.length">
        <v-col cols="12" class="list-toolbar d-flex align-center">
          <span class="text-medium-emphasis text-body-2">{{ filteredBuildingBlocksList.length }} building block{{ filteredBuildingBlocksList.length === 1 ? '' : 's' }}</span>
          <v-spacer></v-spacer>
          <v-btn
            size="small" variant="text" density="comfortable"
            prepend-icon="mdi-arrow-expand-vertical"
            @click="expandAllGroups"
          >Expand all</v-btn>
          <v-btn
            size="small" variant="text" density="comfortable"
            prepend-icon="mdi-arrow-collapse-vertical"
            @click="collapseAllGroups"
          >Collapse all</v-btn>
        </v-col>
      </v-row>
      <v-row
        v-for="group in groupedBuildingBlocks"
        :key="group.label"
        align="stretch"
        class="bblock-group mb-4"
      >
        <v-col cols="12">
          <h2 class="group-heading">{{ group.label }}</h2>
        </v-col>
        <v-col
          v-for="bblock of group.highlighted" :key="bblock.itemIdentifier"
          md="6"
          class="bblock-item-col"
        >
          <building-block-list-item
            :bblock="bblock"
            :to="{ name: 'BuildingBlock', params: { id: bblock.itemIdentifier } }"
            class="highlighted-bblock"
          ></building-block-list-item>
        </v-col>
        <v-col cols="12" v-if="group.other.length" class="more-toggle-col">
          <v-btn
            variant="text"
            density="comfortable"
            class="more-toggle"
            :prepend-icon="isGroupExpanded(group) ? 'mdi-chevron-down' : 'mdi-chevron-right'"
            @click="toggleGroup(group)"
          >
            {{ isGroupExpanded(group) ? 'Show fewer' : `${group.other.length} more…` }}
          </v-btn>
        </v-col>
        <template v-if="group.other.length && isGroupExpanded(group)">
          <v-col
            v-for="bblock of group.other" :key="bblock.itemIdentifier"
            md="6"
            class="bblock-item-col"
          >
            <building-block-list-item
              :bblock="bblock"
              :to="{ name: 'BuildingBlock', params: { id: bblock.itemIdentifier } }"
            ></building-block-list-item>
          </v-col>
        </template>
      </v-row>
      <v-row v-if="buildingBlocks && !groupedBuildingBlocks.length">
        <v-col>
          <v-card>
            <v-card-title v-if="buildingBlocks.length">No building blocks match the current filters</v-card-title>
            <v-card-title v-else>No building blocks were found in the register.</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </template>

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
import DependencyViewer from "@/components/bblock/DependencyViewer.vue";
import {groupBBlocks, OTHER_GROUP} from "@/utils/bblock-groups";

export default {
  components: {
    BuildingBlocksTree,
    BuildingBlockListItem,
    BuildingBlockFilters,
    DependencyViewer,
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
      displayMode: localStorage.getItem('bblockListDisplayMode') || 'list',
      expandedGroups: {},
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
    // The "Other" catch-all group (blocks with no `group` set) defaults to expanded —
    // unlike named groups, there's no curated highlight to show in its place — until the
    // user explicitly toggles it or uses Expand/Collapse all, at which point the explicit
    // entry in expandedGroups takes over.
    isGroupExpanded(group) {
      // `in` (not hasOwnProperty) so Vue's reactivity tracking picks this up — a
      // hasOwnProperty call on a reactive object isn't tracked, which silently breaks
      // re-rendering when expandedGroups changes.
      if (group.label in this.expandedGroups) {
        return this.expandedGroups[group.label];
      }
      return group.isUngrouped;
    },
    toggleGroup(group) {
      this.expandedGroups[group.label] = !this.isGroupExpanded(group);
    },
    expandAllGroups() {
      for (const group of this.groupedBuildingBlocks) {
        this.expandedGroups[group.label] = true;
      }
    },
    collapseAllGroups() {
      for (const group of this.groupedBuildingBlocks) {
        this.expandedGroups[group.label] = false;
      }
    },
  },
  watch: {
    displayMode(v) {
      localStorage.setItem('bblockListDisplayMode', v);
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
    // Groups visible blocks by their `group` metadata field, keeping each group's items in their
    // original (alphabetical by identifier) order and splitting highlighted from non-highlighted so
    // the template can show the former up front and the latter behind a "more…" toggle.
    groupedBuildingBlocks() {
      if (!this.filterValues || !this.buildingBlocks) {
        return [];
      }
      return groupBBlocks(this.buildingBlocks.filter(b => this.isVisible(b)), OTHER_GROUP);
    },
    // Only groups that actually have something to hide need the Expand/Collapse all
    // toolbar at all — a register whose groups are entirely highlighted has nothing for
    // it to do.
    groupsWithMore() {
      return this.groupedBuildingBlocks.filter(group => group.other.length);
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

  .list-toolbar {
    padding: 0 0.25rem;
  }

  .bblock-group {
    // Tints the whole group's content area so it reads as one panel under its heading,
    // distinct from the plain page background and from neighbouring groups.
    background-color: rgba(var(--v-theme-primary), 0.06);
    border-radius: 6px;
    padding-bottom: 12px;
    overflow: hidden;

    .group-heading {
      margin: 0;
      padding: 10px 16px;
      background-color: rgb(var(--v-theme-primary));
      color: rgb(var(--v-theme-on-primary));
      font-size: 1rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    // A colored accent edge per item card — reads as a bullet/list marker tying each
    // block back to its group heading, and holds up regardless of card height.
    .bblock-item-col .building-block {
      border-left: 4px solid rgb(var(--v-theme-primary));
    }

    .more-toggle-col {
      padding-top: 0;
    }

    .more-toggle {
      text-transform: none;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
}

.markdown-text {
  p {
    margin-bottom: 0.4rem;
  }
}
</style>
