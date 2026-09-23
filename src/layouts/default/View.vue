<template>
  <v-app-bar
    image="@/assets/lego.jpg"
  >
    <template v-slot:image>
      <v-img
        gradient="to top right, rgba(255,255,255,.8), rgba(255,255,255,.4)"
      ></v-img>
    </template>

    <v-app-bar-nav-icon
      v-if="mobile"
      variant="text"
      @click.stop="navigationDrawer = !navigationDrawer"
    ></v-app-bar-nav-icon>

    <v-app-bar-title class="text-center">{{ pageTitle }}</v-app-bar-title>

  </v-app-bar>
  <v-navigation-drawer
    v-model="navigationDrawerComputed"
  >
    <v-list>
      <v-list-item
        to="/"
        title="About this register"
      >
        <template v-if="localRegister?.gitRepository" #append>
          <v-tooltip text="Click to open this register's Git repository">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                :href="localRegister.gitRepository"
                target="_blank"
                icon
                size="small"
                variant="text"
                @click.stop
              >
                <github-icon viewBox="0 0 100 100" width="16" height="16" v-if="localRegister.gitHubRepository"/>
                <git-icon viewBox="0 0 100 100" width="16" height="16" v-else/>
              </v-btn>
            </template>
          </v-tooltip>
        </template>
      </v-list-item>
      <v-list-item
        v-for="(item, idx) of navigationItems"
        :key="idx"
        :to="item.to"
        :title="item.title"
      ></v-list-item>
      <div v-if="contextNavItems?.length" class="context-nav-group">
        <v-list-subheader title="On this page"></v-list-subheader>
        <v-list-item
          v-for="(item, idx) of contextNavItems"
          :key="idx"
          :to="item.to"
          @click="handleContextNavigationClick(item)"
          density="compact"
        >
          <v-list-item-title style="font-size: 90%">{{ item.title }}</v-list-item-title>
        </v-list-item>
      </div>
      <v-divider v-if="contextNavItems?.length && featuredBBlockGroups.length"></v-divider>
      <template v-for="group of featuredBBlockGroups" :key="group.label">
        <v-list-subheader :title="group.label"></v-list-subheader>
        <v-list-item
          v-for="bblock of group.bblocks"
          :key="bblock.identifier"
          :to="{ name: 'BuildingBlock', params: { id: bblock.itemIdentifier } }"
          density="compact"
        >
          <v-list-item-title style="font-size: 90%">{{ bblock.name }}</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
  <v-main>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"/>
      </transition>
    </router-view>
  </v-main>

  <v-card class="register-loading-progress"  v-if="showRegisterLoadingProgress">
    <v-card-text class="pa-1">
      <register-loading-progress
          v-bind="registerProgress"
          @hide="this.showRegisterLoadingProgress = false"></register-loading-progress>
    </v-card-text>
  </v-card>

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

</template>

<script>
import bblockService from "@/services/bblock.service";
import RegisterLoadingProgress from "@/components/RegisterLoadingProgress.vue";
import configService from "@/services/config.service";
import {useNavigationStore} from "@/stores/navigation";
import {mapState} from "pinia";
import GitIcon from '@/assets/git-icon.svg';
import GithubIcon from '@/assets/github-icon.svg';

export default {
  components: {RegisterLoadingProgress, GitIcon, GithubIcon},
  data() {
    return {
      registerProgress: {
        completed: 0,
        total: 0,
        failed: {},
      },
      loading: false,
      showRegisterLoadingProgress: false,
      pageTitle: configService.config.title,
      navigationDrawer: false,
      navigationItems: [
        { title: 'Building Blocks list', to: '/bblock' },
      ],
      featuredBBlocks: null,
      localRegister: null,
    };
  },
  mounted() {
    this.showRegisterLoadingProgress = true;
    this.loading = true;
    bblockService.onRegisterLoad((registers, loaded, failed) => {
      const total = Object.keys(registers).length;
      const totalFailed = Object.keys(failed).length;
      if (total > 0) {
        this.registerProgress.total = total;
        this.registerProgress.completed = loaded;
        Object.assign(this.registerProgress.failed, failed);

        if (totalFailed === 0 && total <= loaded) {
          setTimeout(() => {
            this.showRegisterLoadingProgress = false;
          }, 2000);
        }
      }
      this.loading = false;
    });
    bblockService.getBBlocks()
      .then(bblocks => this.featuredBBlocks = Object.values(bblocks).filter(b => b.highlighted)
        .sort((a, b) => a.name.localeCompare(b.name)))
    bblockService.getRegisters(false)
      .then(localRegister => {
        this.localRegister = localRegister;
      });
  },
  methods: {
    handleContextNavigationClick(item) {
      this.contextNavHandler && this.contextNavHandler(item);
    },
  },
  computed: {
    mobile() {
      return this.$vuetify.display.mobile;
    },
    // Splits the flat, already name-sorted `featuredBBlocks` list into per-`group`
    // sublists, so the sidebar can showcase e.g. "STAC Extensions" separately from
    // "STAC Core" instead of a single undifferentiated list. Blocks without a `group`
    // fall back to a generic header, kept last so it doesn't interleave with named
    // groups: "Other Featured Building Blocks" when named groups exist alongside it,
    // or plain "Featured Building Blocks" when the register doesn't use `group` at all.
    featuredBBlockGroups() {
      if (!this.featuredBBlocks?.length) {
        return [];
      }
      const hasNamedGroups = this.featuredBBlocks.some(b => b.group);
      // When some blocks declare a group, the leftover ungrouped ones need a label
      // that reads as a catch-all bucket alongside the named groups; when no block
      // declares a group at all, there's nothing to contrast it with, so the plain
      // label reads better.
      const UNGROUPED_LABEL = hasNamedGroups ? 'Other Featured Building Blocks' : 'Featured Building Blocks';
      const groups = new Map();
      for (const bblock of this.featuredBBlocks) {
        const label = bblock.group || UNGROUPED_LABEL;
        if (!groups.has(label)) {
          groups.set(label, []);
        }
        groups.get(label).push(bblock);
      }
      // Named groups are ordered alphabetically for determinism; the ungrouped
      // bucket always sorts last so ungrouped blocks don't interleave with
      // registers that do define named groups.
      return Array.from(groups, ([label, bblocks]) => ({ label, bblocks }))
        .sort((a, b) => {
          if (a.label === UNGROUPED_LABEL) return b.label === UNGROUPED_LABEL ? 0 : 1;
          if (b.label === UNGROUPED_LABEL) return -1;
          return a.label.localeCompare(b.label);
        });
    },
    navigationDrawerComputed: {
      get() {
        return !this.mobile || this.navigationDrawer;
      },
      set(v) {
        this.navigationDrawer = v;
      }
    },
    ...mapState(useNavigationStore, {
      contextNavItems: 'items',
      contextNavHandler: 'handler',
    }),
  },
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.v-card.register-loading-progress {
  position: fixed;
  bottom: 5px;
  right: 5px;
  width: 600px;
  max-width: 70%;
  padding: 0.5em;
}

.context-nav-group {
  border-left: 3px solid rgb(var(--v-theme-primary));
  background-color: rgba(var(--v-theme-primary), 0.06);
}
</style>
