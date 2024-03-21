<template>
  <v-container class="about-register">
    <v-row v-if="localRegister">
      <v-col>
        <v-card :title="localRegister.name">
          <v-card-text
            @click="interceptLinks"
            class="markdown-text"
          >
            <div v-if="localRegister.abstract" class="abstract markdown-text" v-html="md2html(localRegister.abstract)"></div>
            <div v-else class="text-medium-emphasis">
              This register has no description.
            </div>
            <div v-if="localRegister.description" class="full-description markdown-text" v-html="md2html(localRegister.description)" ></div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" prepend-icon="mdi-format-list-text" to="/bblock">
              View Building Blocks
            </v-btn>
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
    <v-row v-if="localRegister && importedRegisters.length">
      <v-col>
        <v-card title="Imported registers">
          <v-card-subtitle>{{ localRegister.name }} imports the following Building Block registers</v-card-subtitle>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="register in importedRegisters"
                :title="register.name"
                :subtitle="register.url"
                lines="two"
              >
                <template #prepend>
                  <color-circle :color="register.color" class="mr-3"></color-circle>
                </template>
                <template #append>
                  <v-tooltip
                    v-if="register.viewerURL"
                    text="Open this register's Building Blocks viewer"
                  >
                    <template #activator="{ props }">
                      <v-btn
                        v-bind="props"
                        @click.prevent="openUrl(register.viewerURL)"
                        icon
                        variant="flat"
                      >
                        <v-icon color="primary">mdi-format-list-text</v-icon>
                      </v-btn>
                    </template>
                  </v-tooltip>
                  <v-tooltip
                    v-if="register.gitRepository"
                    text="View this register's Git repository"
                  >
                    <template #activator="{ props }">
                      <v-btn
                        v-bind="props"
                        @click.prevent="openUrl(register.gitRepository)"
                        icon
                        variant="flat"
                      >
                        <github-icon viewBox="0 0 100 100" width="18" height="18" v-if="register.gitHubRepository"/>
                        <git-icon viewBox="0 0 100 100" width="18" height="18" v-else/>
                      </v-btn>
                    </template>
                  </v-tooltip>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import bblockService from "@/services/bblock.service";
import ColorCircle from "@/components/ColorCircle.vue";
import {interceptLinks, md2html} from "@/lib/utils";

import GitIcon from '@/assets/git-icon.svg';
import GithubIcon from '@/assets/github-icon.svg';

export default {
  components: {
    GitIcon,
    GithubIcon,
    ColorCircle,
  },
  data() {
    return {
      importedRegisters: [],
      localRegister: null,
    };
  },
  mounted() {
    bblockService.getRegisters(true)
      .then(registers => {
        for (let register of Object.values(registers)) {
          if (register.local) {
            this.localRegister = register;
          } else {
            this.importedRegisters.push(register);
          }
        }
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
</style>
