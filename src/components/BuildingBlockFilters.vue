<template>
  <v-expansion-panels v-model="expanded">
    <v-expansion-panel title="Filters" value="expanded">
      <v-expansion-panel-text>
        <div
          class="d-flex flex-wrap flex-md-nowrap filter-wrapper"
          :class="$vuetify.display.mdAndUp ? 'size-md' : ''"
        >
          <div class="flex-grow-1 mx-2 filter-text">
            <v-text-field
              label="Name or identifier"
              v-model="textFilter"
              hide-details="auto"
            >
            </v-text-field>
          </div>
          <div class="mx-2 filter-status">
            <v-select
              label="Status"
              item-title="label"
              :items="statuses"
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
                <status-chip :status="item.value"></status-chip>
              </template>
            </v-select>
          </div>
          <div v-if="groups.length" class="mx-2 filter-groups">
            <v-select
              label="Group"
              :items="groups"
              multiple
              v-model="groupFilter"
              item-title="label"
              hide-details="auto"
            >
              <template v-slot:prepend-item>
                <v-list-item class="all-none">
                  <v-btn variant="text" @click="selectGroups(true)">All</v-btn>
                  <v-btn variant="text" @click="selectGroups(false)">None</v-btn>
                </v-list-item>
              </template>
              <template v-slot:selection="{item}">
                <v-chip size="small" variant="flat" :color="item.raw.color">{{ item.title }}</v-chip>
              </template>
            </v-select>
          </div>
          <div class="mx-2 d-flex align-center filter-reset">
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

export default {
  components: {StatusChip},
  props: {
    defaultStatuses: {
      type: Array,
      default: ['stable'],
    },
  },
  data() {
    return {
      textFilter: '',
      statuses,
      statusFilter: this.defaultStatuses.slice(),
      groups: [],
      groupFilter: [],
      expanded: false,
    };
  },
  mounted() {
    bblockService.getGroups().then(groups => {
      this.groups = groups;
      this.groupFilter = groups.map(g => g.label);
    });
    this.expanded = this.$vuetify.display.mdAndUp ? 'expanded' : null;

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
    selectGroups(all) {
      if (all) {
        this.groupFilter = this.groups.map(g => g.label);
      } else {
        this.groupFilter.length = 0;
      }
    },
    reset() {
      this.textFilter = '';
      this.statusFilter = this.defaultStatuses.slice();
      this.selectGroups(true);
    },
    emitFilter() {
      this.$emit('filter-change', {
        text: this.textFilter,
        groups: this.groups.length ? this.groupFilter : null,
        status: this.statusFilter,
      })
    },
  },
  watch: {
    groupFilter() {
      this.emitFilter();
    },
    statusFilter() {
      this.emitFilter();
    },
    textFilter(v) {
      this.debouncedTextFilter(v);
    },
    defaultStatuses() {
      this.statusFilter = this.defaultStatuses.slice();
    },
  },
}
</script>
<style>
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

    .filter-status, .filter-groups {
      width: 25%;
    }
  }
}

</style>
