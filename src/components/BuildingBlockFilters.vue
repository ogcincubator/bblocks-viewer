<template>
  <v-expansion-panels v-model="expanded" :class="{ 'no-animate': noAnimate }">
    <v-expansion-panel title="Filters" value="expanded" eager>
      <v-expansion-panel-text>
        <div
          class="d-flex flex-wrap filter-wrapper justify-end"
          :class="$vuetify.display.mdAndUp ? 'size-md' : ''"
        >
          <div class="flex-grow-1 mx-2 filter-text mb-1">
            <v-text-field
              label="Name or identifier"
              v-model="textFilter"
              hide-details="auto"
              clearable
            >
            </v-text-field>
          </div>
          <div class="mx-2 filter-status mb-1" v-if="activeStatuses">
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
              <template v-slot:selection="{item}">
                <status-chip :status="item.value" class="mb-1"></status-chip>
              </template>
            </v-select>
          </div>
          <div v-if="registers.length > 1" class="mx-2 filter-registers mb-1">
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
              <template v-slot:selection="{item}">
                <v-chip
                  v-if="item.raw"
                  size="small"
                  variant="flat"
                  :color="item.raw.color"
                  class="mb-1"
                >
                  {{ item.title }}
                </v-chip>
              </template>
            </v-select>
          </div>
          <div v-if="tags?.length" class="mx-2 filter-tags mb-1">
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
      Object.values(bblocks).forEach(bblock => {
        activeStatuses.add(bblock.status);
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
      })
    },
  },
  watch: {
    registerFilter() {
      this.emitFilter();
    },
    statusFilter() {
      this.emitFilter();
    },
    textFilter(v) {
      this.debouncedTextFilter(v);
    },
    tagFilter() {
      this.emitFilter();
    },
    defaultStatuses() {
      this.statusFilter = this.defaultStatuses.slice();
    },
  },
}
</script>
<style lang="scss">
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

    .filter-tags {
      width: 40%;
    }
  }
}

.no-animate {
  .v-expansion-panel, .v-expansion-panel-title, .v-expansion-panel-text {
    transition: none !important;
  }
}
</style>
