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
          <v-card-subtitle v-if="localRegister.license" class="register-license">
            Published under
            <a v-if="localRegister.license.url" :href="localRegister.license.url" target="_blank">{{ localRegister.license.name || 'View license' }}</a>
            <span v-else>{{ localRegister.license.name }}</span>
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
          <template #append>
            <v-btn-toggle
              v-model="importedRegistersView"
              divided
              mandatory
              density="compact"
              class="mr-2"
            >
              <v-btn prepend-icon="mdi-view-list" value="list" size="small">List</v-btn>
              <v-btn prepend-icon="mdi-graph" value="graph" size="small">Graph</v-btn>
            </v-btn-toggle>
          </template>
          <v-card-text>
            <v-list v-if="importedRegistersView === 'list'">
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
            <register-import-graph
              v-else
              :registers="allRegisters"
            ></register-import-graph>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="pluginTabItems.length">
      <v-col>
        <v-card title="Plugins">
          <v-card-subtitle>External plugins used by this register</v-card-subtitle>
          <v-tabs v-if="pluginTabItems.length > 1" v-model="pluginTab" density="compact">
            <v-tab v-for="item in pluginTabItems" :key="item.key" :value="item.key">{{ item.label }}</v-tab>
          </v-tabs>
          <v-divider v-if="pluginTabItems.length > 1" />
          <v-window v-model="pluginTab">
            <v-window-item value="transform" :transition="false" :reverse-transition="false">
              <v-card-text>
                <v-list>
                  <template v-for="plugin in localRegister.transformPlugins" :key="plugin.pip">
                    <template v-for="mod in plugin.modules" :key="mod.module">
                      <v-list-item
                        v-for="transformer in mod.transformers"
                        :key="transformer.class"
                        lines="two"
                      >
                        <template #title>
                          <code>{{ transformer.class }}</code>
                          <span class="text-medium-emphasis ml-1">in <code>{{ mod.module }}</code></span>
                          <v-chip
                            v-for="type in transformer.types"
                            :key="type"
                            size="x-small"
                            label
                            class="ml-2"
                          >{{ type }}</v-chip>
                        </template>
                        <template #subtitle>
                          <plugin-source :plugin="plugin"></plugin-source>
                        </template>
                      </v-list-item>
                    </template>
                  </template>
                </v-list>
              </v-card-text>
            </v-window-item>
            <v-window-item value="validator" :transition="false" :reverse-transition="false">
              <v-card-text>
                <v-list>
                  <template v-for="plugin in localRegister.validatorPlugins" :key="plugin.pip">
                    <template v-for="mod in plugin.modules" :key="mod.module">
                      <v-list-item
                        v-for="validator in mod.validators"
                        :key="validator.class"
                        lines="two"
                      >
                        <template #title>
                          <code>{{ validator.class }}</code>
                          <span class="text-medium-emphasis ml-1">in <code>{{ mod.module }}</code></span>
                          <v-chip
                            v-for="mimeType in validator.mimeTypes"
                            :key="mimeType"
                            size="x-small"
                            label
                            class="ml-2"
                          >{{ mimeType }}</v-chip>
                          <v-chip
                            v-for="ext in validator.fileExtensions"
                            :key="ext"
                            size="x-small"
                            label
                            variant="outlined"
                            class="ml-2"
                          >.{{ ext }}</v-chip>
                        </template>
                        <template #subtitle>
                          <plugin-source :plugin="plugin"></plugin-source>
                        </template>
                      </v-list-item>
                    </template>
                  </template>
                </v-list>
              </v-card-text>
            </v-window-item>
            <v-window-item value="build" :transition="false" :reverse-transition="false">
              <v-card-text>
                <v-list>
                  <template v-for="plugin in localRegister.buildPlugins" :key="plugin.pip">
                    <v-list-item
                      v-for="cls in plugin.classes"
                      :key="cls"
                      lines="two"
                    >
                      <template #title><code>{{ cls }}</code></template>
                      <template #subtitle>
                        <plugin-source :plugin="plugin"></plugin-source>
                      </template>
                    </v-list-item>
                  </template>
                </v-list>
              </v-card-text>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import bblockService from "@/services/bblock.service";
import ColorCircle from "@/components/ColorCircle.vue";
import RegisterImportGraph from "@/components/RegisterImportGraph.vue";

import GitIcon from '@/assets/git-icon.svg';
import GithubIcon from '@/assets/github-icon.svg';
import MarkdownText from "@/components/MarkdownText.vue";
import CopyToClipboardButton from "@/components/CopyToClipboardButton.vue";
import PluginSource from "@/components/PluginSource.vue";

export default {
  components: {
    CopyToClipboardButton,
    MarkdownText,
    GitIcon,
    GithubIcon,
    ColorCircle,
    RegisterImportGraph,
    PluginSource,
  },
  data() {
    return {
      importedRegisters: [],
      allRegisters: {},
      localRegister: null,
      importedRegistersView: localStorage.getItem('homeImportedRegistersView') || 'list',
      pluginTab: null,
    };
  },
  computed: {
    // One tab per plugin category actually present in this register, in a fixed display order.
    pluginTabItems() {
      return [
        { key: 'transform', label: 'Transformers', data: this.localRegister?.transformPlugins },
        { key: 'validator', label: 'Validators', data: this.localRegister?.validatorPlugins },
        { key: 'build', label: 'Build', data: this.localRegister?.buildPlugins },
      ].filter(item => item.data?.length);
    },
  },
  watch: {
    importedRegistersView(v) {
      localStorage.setItem('homeImportedRegistersView', v);
    },
    pluginTabItems(items) {
      if (!items.some(item => item.key === this.pluginTab)) {
        this.pluginTab = items[0]?.key ?? null;
      }
    },
  },
  mounted() {
    bblockService.getRegisters(false)
      .then(localRegister => {
        this.localRegister = localRegister;
      });
    bblockService.getRegisters(true)
      .then(registers => {
        this.allRegisters = registers;
        for (let register of Object.values(registers)) {
          if (register.local) {
            this.localRegister = register;
          } else {
            this.importedRegisters.push(register);
          }
        }
      });
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
