<template>
  <v-container class="about-register">
    <v-row v-if="localRegister">
      <v-col>
        <v-card :title="localRegister.name">
          <v-card-text>
            <MarkdownText v-if="localRegister.abstract" class="abstract" :content="localRegister.abstract"></MarkdownText>
            <div v-else class="text-medium-emphasis">
              This register has no description.
            </div>
            <MarkdownText class="full-description" :content="localRegister.description"></MarkdownText>
          </v-card-text>
          <v-card-subtitle>
            This register's metadata can be found at
            <a :href="localRegister.url" target="_blank" class="register-url">{{ localRegister.url }}</a>
            <copy-to-clipboard-button :text="localRegister.url" size="small"></copy-to-clipboard-button>
          </v-card-subtitle>
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
                  :href="localRegister.validationReport"
                  target="_blank"
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
                  :href="localRegister.gitRepository"
                  target="_blank"
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
                :key="register.url"
                :title="register.name"
                :subtitle="register.url"
                lines="two"
              >
                <template #prepend>
                  <color-circle :color="register.color" class="mr-3"></color-circle>
                  <v-tooltip v-if="register.fromCache" text="This register was loaded from cache and may be outdated">
                    <template #activator="{ props }">
                      <v-icon v-bind="props" color="warning">mdi-alert</v-icon>
                    </template>
                  </v-tooltip>
                </template>
                <template #append>
                  <v-tooltip
                    v-if="register.viewerURL"
                    text="Open this register's Building Blocks viewer"
                  >
                    <template #activator="{ props }">
                      <v-btn
                        v-bind="props"
                        :href="register.viewerURL"
                        target="_blank"
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
                        :href="register.gitRepository"
                        target="_blank"
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

import GitIcon from '@/assets/git-icon.svg';
import GithubIcon from '@/assets/github-icon.svg';
import MarkdownText from "@/components/MarkdownText.vue";
import CopyToClipboardButton from "@/components/CopyToClipboardButton.vue";

export default {
  components: {
    CopyToClipboardButton,
    MarkdownText,
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
    bblockService.getRegisters(false)
      .then(localRegister => {
        this.localRegister = localRegister;
      });
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
