<template>
  <v-container class="bblock-list">
    <v-row v-if="localRegister">
      <v-col>
        <v-card :title="localRegister.name">
          <v-card-text
            @click="interceptLinks"
            class="markdown-text"
          >
            <div v-if="localRegister.abstract" class="abstract" v-html="md2html(localRegister.abstract)"></div>
            <div v-else class="text-medium-emphasis">
              This register has no description.
            </div>
            <div v-if="localRegister.description" class="full-description" v-html="md2html(localRegister.description)" ></div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-tooltip
              v-if="localRegister.validationReport"
              text="Click to open the validation report for this register"
            >
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon="mdi-clipboard-check-outline"
                  color="primary"
                  @click="openUrl(localRegister.validationReport)"
                >
                </v-btn>
              </template>
            </v-tooltip>
            <v-tooltip
              v-if="localRegister.gitRepository"
              text="Click to open this register's Git repository"
            >
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  color="primary"
                  @click="openUrl(localRegister.gitRepository)"
                  icon
                >
                  <github-icon viewBox="0 0 100 100" width="18" height="18" v-if="localRegister.gitHubRepository"/>
                  <git-icon viewBox="0 0 100 100" width="18" height="18" v-else/>
                </v-btn>
              </template>
            </v-tooltip>
          </v-card-actions>
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
import BuildingBlockFilters from "@/components/BuildingBlockFilters.vue";
import configService from "@/services/config.service";
import BuildingBlockListItem from "@/components/BuildingBlockListItem.vue";
import {interceptLinks, md2html} from "@/lib/utils";

import GitIcon from '@/assets/git-icon.svg';
import GithubIcon from '@/assets/github-icon.svg';

export default {
  components: {
    BuildingBlockListItem,
    BuildingBlockFilters,
    RegisterLoadingProgress,
    BuildingBlock,
    GitIcon,
    GithubIcon,
  },
  data() {
    return {
      loading: false,
      bblockDialog: false,
      bblockView: null,
      registerProgress: {
        completed: 0,
        total: 0,
      },
      GitIcon,
      showRegisterLoadingProgress: false,
      filterValues: null,
      localRegister: null,
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
    bblockService.getRegisters(false)
      .then(register => {
        this.localRegister = register;
      });
  },
  methods: {
    md2html,
    interceptLinks,
    openUrl(url) {
      window.open(url);
    },
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
            && !bblock.tags?.some(t => this.filterValues.tags.includes(t))) {
          return false;
        }
        return true;
    },
    showRegisterDescription(register) {
      this.moreInfoPopup.contents = md2html(register.description);
      this.moreInfoPopup.show = true;
    },
  },
  computed: {
    filteredBuildingBlocks() {
      if (!this.filterValues || !this.buildingBlocks) {
        return [];
      }
      const highlighted = [], nonHighlighted = [];
      this.buildingBlocks.forEach(bblock => {
        if (this.isVisible(bblock)) {
          (bblock.highlighted ? highlighted : nonHighlighted).push(bblock);
        }
      })
      return {
        highlighted, nonHighlighted,
      }
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
  p, ul, ol {
    margin-bottom: 0.4rem;
  }

  ul {
    padding-left: 2em;
  }
}
</style>
