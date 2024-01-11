<template>
  <v-container class="bblock-list">
    <v-row>
      <v-col>
        <v-card elevation="10">
          <v-card-text>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra tortor at ante tempor pretium.
              Quisque
              imperdiet purus justo, eget volutpat justo vulputate ac. Fusce at tempor metus. Integer eleifend finibus
              lectus, non bibendum leo tincidunt eget. Nunc sollicitudin tortor odio, eu venenatis risus consectetur
              vitae.
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click.prevent="moreInfoPopup.show = true">Tell me more</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="validationReports?.length">
      <v-col>
        <v-card>
          <v-card-text v-if="validationReports.length > 1">
            There are validation reports available for the following registers.
          </v-card-text>
          <v-card-text v-else>
            There is a validation report available for this register.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              v-if="validationReports.length > 1"
              v-for="report in validationReports"
              @click="openUrl(report.url)"
            >
              {{ report.name }}
            </v-btn>
            <v-btn v-else @click="openUrl(validationReports[0].url)">
              See report
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
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
          <v-card-title class="d-flex pb-0 bblock-name">
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
            <div class="tags mb-2 ml-2" v-if="bblock.tags?.length">
              <span class="tags-title mr-1 mb-1 text-caption">Tags:</span>
              <span class="tag mr-1 mb-1 text-caption" v-for="tag in bblock.tags" v-text="tag"></span>
            </div>
            <div>
              <v-chip
                variant="flat"
                :color="bblock.register.color"
                :title="bblock.register.url"
              >
                {{ bblock.register.name }}
              </v-chip>
            </div>
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

    <v-dialog v-model="moreInfoPopup.show" max-width="750">
      <template #default="{ isActive }">
        <v-card>
          <v-card-title>About {{ moreInfoPopup.title }}</v-card-title>
          <v-card-text class="more-info">
            <p>
              Aenean non eros et sapien aliquet malesuada finibus in ex. Etiam eu sodales sem, lacinia pulvinar metus.
              Ut fringilla ut nulla nec porttitor. Aliquam arcu lacus, aliquet eu egestas sed, convallis eget diam. Sed
              odio metus, accumsan non turpis vitae, egestas tincidunt neque.
            </p>
            <p>
              Nullam id fringilla tellus. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Vivamus ut pharetra orci. Sed lobortis ac turpis et faucibus.
              Etiam bibendum sagittis orci, vel auctor risus semper et. Nullam id dolor quis diam porta interdum a id
              lorem.
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text="Close"
              @click="isActive.value = false"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
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
      moreInfoPopup: {
        show: false,
        title: configService.config.title,
      },
      validationReports: [],
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
    bblockService.getRegisters(configService.config.showImported)
      .then(registers => {
        this.validationReports = Object.values(registers).filter(r => !!r.validationReport)
          .map(r => ({ name: r.name, url: r.validationReport }));
      });
  },
  methods: {
    trim(s, l, ellipsis = '…') {
      if (!s || s.length <= l) {
        return s;
      }
      return `${s.substr(0, l - 1)}${ellipsis}`;
    },
    viewBBlock(bblock) {
      this.bblockView = bblock;
      this.bblockDialog = true;
    },
    openUrl(url) {
      window.open(url);
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
        console.log(this.filterValues.tags);
        if (this.filterValues.tags?.length
            && !bblock.tags?.some(t => this.filterValues.tags.includes(t))) {
          return false;
        }
        return true;
      });
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

}
</style>
