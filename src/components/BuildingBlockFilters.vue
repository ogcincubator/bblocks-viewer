<template>
  <v-expansion-panels v-model="expanded" :class="{ 'no-animate': noAnimate }" class="building-block-filters">
    <v-expansion-panel title="Filters" value="expanded" eager>
      <v-expansion-panel-text>
        <div
          class="d-flex flex-wrap filter-wrapper"
          :class="$vuetify.display.mdAndUp ? 'size-md' : ''"
        >
          <div class="flex-grow-1 mx-1 filter-text mb-1">
            <v-text-field
              label="Name or identifier"
              v-model="textFilter"
              hide-details="auto"
              clearable
            >
            </v-text-field>
          </div>
          <div class="mx-1 filter-status mb-1" v-if="activeStatuses">
            <v-select
              label="Status"
              item-title="label"
              :items="activeStatuses"
              multiple
              v-model="statusFilter"
              hide-details="auto"
            >
              <template v-slot:prepend-item>
                <v-list-item class="all-none">
                  <v-btn variant="text" @click="selectAllStatuses">All</v-btn>
                  <v-btn variant="text" @click="selectOnlyStable">Only stable</v-btn>
                </v-list-item>
              </template>
              <template v-slot:selection="{item, index}">
                <status-chip v-if="index < 2" :status="item.value" class=""></status-chip>
                <span v-if="index === 2" class="text-grey text-caption align-self-center">
                  (+ {{ statusFilter.length - 2 }} others)
                </span>
              </template>
            </v-select>
          </div>
          <div v-if="registers.length > 1" class="mx-1 filter-registers mb-1">
            <v-select
              label="Registers"
              :items="registers"
              multiple
              v-model="registerFilter"
              item-title="name"
              item-value="url"
              hide-details="auto"
            >
              <template v-slot:prepend-item>
                <v-list-item class="all-none">
                  <v-btn variant="text" @click="selectRegisters(true)">All</v-btn>
                  <v-btn variant="text" @click="selectRegisters(false)">None</v-btn>
                </v-list-item>
              </template>
              <template v-slot:selection="{index}">
                <span v-if="index === 0">{{ registerFilter.length }} registers</span>
              </template>
            </v-select>
          </div>
          <div v-if="itemClasses?.length > 1" class="mx-1 filter-item-classes mb-1">
            <v-select
              label="Item classes"
              :items="itemClasses"
              multiple
              v-model="itemClassFilter"
              hide-details="auto"
              item-title="label"
              item-value="value"
            >
              <template v-slot:prepend-item>
                <v-list-item class="all-none">
                  <v-btn variant="text" @click="selectItemClasses(true)">All</v-btn>
                  <v-btn variant="text" @click="selectItemClasses(false)">None</v-btn>
                </v-list-item>
              </template>
              <template v-slot:selection="{item, index}">
                <v-chip
                  v-if="index < 3"
                  size="small"
                  variant="flat"
                >
                  {{ item.title }}
                </v-chip>
                <span v-if="index === 3" class="text-grey text-caption align-self-center">
                  (+ {{ statusFilter.length - 3 }} others)
                </span>
              </template>
            </v-select>
          </div>
          <div v-if="tags?.length" class="mx-1 filter-tags mb-1">
            <v-autocomplete
              label="Tags"
              :items="tags"
              multiple
              v-model="tagFilter"
              hide-details="auto"
              clearable
            >
            </v-autocomplete>
          </div>
          <v-spacer></v-spacer>
          <div class="mx-2 d-flex align-center filter-reset">
            <v-spacer></v-spacer>
            <v-btn @click="reset" :block="$vuetify.display.smAndDown">Reset</v-btn>
          </div>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>

import {statuses} from "@/models/status";
import {itemClasses} from "@/models/itemClass";
import StatusChip from "@/components/StatusChip.vue";
import bblockService from "@/services/bblock.service";
import {debounce} from "@/lib/utils";
import configService from "@/services/config.service";

export default {
  components: {StatusChip},
  props: {
    defaultStatuses: {
      type: Array,
      default: statuses.map(s => s.value),
    },
  },
  data() {
    return {
      loading: false,
      textFilter: '',
      statuses,
      activeStatuses: null,
      statusFilter: [],
      registers: [],
      registerFilter: [],
      expanded: false,
      noAnimate: true,
      tags: null,
      tagFilter: [],
      itemClasses: [],
      itemClassFilter: [],
    };
  },
  mounted() {
    this.loading = true;
    if (configService.config.showImported) {
      bblockService.getRegisters(true).then(registers => {
        if (Object.keys(registers).length > 1) {
          this.registers = Object.values(registers)
            .filter(bblockService.isShown)
            .sort((a, b) => a.local !== b.local ? (a.local ? -1 : 1) : a.name.localeCompare(b.name))
            .map(r => ({name: r.name, url: r.url, color: r.color}));
          this.registerFilter = this.registers.map(g => g.url);
        } else {
          this.registers = [];
          this.registerFilter = null;
        }
      });
    }
    bblockService.getBBlocks(configService.config.showImported).then(bblocks => {
      const activeStatuses = new Set();
      const allTags = {};
      const activeItemClasses = new Set();
      Object.values(bblocks).forEach(bblock => {
        activeStatuses.add(bblock.status);
        activeItemClasses.add(bblock.itemClass);
        bblock.tags?.forEach(tag => {
          tag = tag.trim().toLowerCase();
          allTags[tag] = allTags[tag] ? allTags[tag] + 1 : 1;
        });
      });
      this.tags = Object.keys(allTags).sort();
      this.activeStatuses = statuses.filter(s => activeStatuses.has(s.value));
      if (this.defaultStatuses) {
        this.statusFilter = this.defaultStatuses.filter(s => activeStatuses.has(s));
      }
      this.itemClasses = itemClasses.filter(i => activeItemClasses.has(i.value));
      this.selectItemClasses(true);
    })
      .finally(() => this.loading = false);
    this.expanded = this.$vuetify.display.mdAndUp ? 'expanded' : null;
    setTimeout(() => this.noAnimate = false, 350);

    this.debouncedTextFilter = debounce(v => {
      this.emitFilter();
    }, 300);
    this.emitFilter();
  },
  methods: {
    selectAllStatuses() {
      this.statusFilter = statuses.map(s => s.value);
    },
    selectOnlyStable() {
      this.statusFilter = ['stable'];
    },
    selectRegisters(all) {
      if (all) {
        this.registerFilter = this.registers.map(g => g.url);
      } else {
        this.registerFilter.length = 0;
      }
    },
    selectItemClasses(all) {
      if (all) {
        this.itemClassFilter = this.itemClasses.map(i => i.value);
      } else {
        this.itemClassFilter.length = 0;
      }
    },
    reset() {
      this.textFilter = '';
      this.statusFilter = this.defaultStatuses.slice();
      this.selectRegisters(true);
    },
    emitFilter() {
      this.$emit('filter-change', {
        text: this.textFilter,
        registers: this.registers.length ? this.registerFilter : null,
        status: this.statusFilter,
        tags: this.tagFilter,
        itemClasses: this.itemClassFilter,
      })
    },
  },
  computed: {
    immediateFilters() {
      return [this.registerFilter, this.statusFilter, this.tagFilter, this.itemClassFilter];
    }
  },
  watch: {
    immediateFilters() {
      this.emitFilter();
    },
    textFilter(v) {
      this.debouncedTextFilter(v);
    },
  },
}
</script>
<style lang="scss">
.building-block-filters {
  .v-expansion-panel--active > .v-expansion-panel-title {
    min-height: 0;
  }

  .filter-wrapper {
    > * {
      width: 100%;
      margin-bottom: 0.5rem;
    }

    &.size-md {
      > * {
        width: initial;
        margin-bottom: 0;
      }

      .filter-text {
        min-width: 50%;
      }

      .filter-status {
        width: 25%;
      }

      .filter-registers {
        width: 50%;
      }

      .filter-item-classes {
        width: 30%;
      }

      .filter-tags {
        width: 40%;
      }
    }
  }

  &.no-animate {
    .v-expansion-panel, .v-expansion-panel-title, .v-expansion-panel-text {
      transition: none !important;
    }
  }

  .v-select .v-field__input {
    padding-bottom: 0;
  }
}
</style>
