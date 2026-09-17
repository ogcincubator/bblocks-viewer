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
      <template v-for="group of bblockGroups" :key="group.label">
        <v-list-subheader :title="group.label" class="featured-group-heading"></v-list-subheader>
        <v-list-item
          v-for="bblock of group.highlighted"
          :key="bblock.itemIdentifier"
          :to="{ name: 'BuildingBlock', params: { id: bblock.itemIdentifier } }"
          density="compact"
        >
          <v-list-item-title style="font-size: 90%">{{ bblock.name }}</v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="group.other.length"
          density="compact"
          class="more-toggle-item"
          @click="toggleGroup(group)"
        >
          <template #prepend>
            <v-icon size="14">{{ isGroupExpanded(group) ? 'mdi-chevron-down' : 'mdi-chevron-right' }}</v-icon>
          </template>
          <v-list-item-title style="font-size: 90%">{{ isGroupExpanded(group) ? 'Show fewer' : `${group.other.length} more…` }}</v-list-item-title>
        </v-list-item>
        <template v-if="group.other.length && isGroupExpanded(group)">
          <v-list-item
            v-for="bblock of group.other"
            :key="bblock.itemIdentifier"
            :to="{ name: 'BuildingBlock', params: { id: bblock.itemIdentifier } }"
            density="compact"
          >
            <v-list-item-title style="font-size: 90%">{{ bblock.name }}</v-list-item-title>
          </v-list-item>
        </template>
      </template>
      <template v-if="contextNavItems?.length">
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
import {groupBBlocks, OTHER_GROUP} from "@/utils/bblock-groups";

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
      navBBlocks: null,
      localRegister: null,
      expandedGroups: {},
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
      .then(bblocks => this.navBBlocks = Object.values(bblocks)
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
    // Same collapse/expand logic as the Building Blocks list view's groups: each
    // group's highlighted blocks are always shown, the rest sit behind a "more…"
    // toggle that defaults open only for the ungrouped catch-all bucket. `in` (not
    // hasOwnProperty) so Vue's reactivity tracking actually picks up the check.
    isGroupExpanded(group) {
      if (group.label in this.expandedGroups) {
        return this.expandedGroups[group.label];
      }
      return group.isUngrouped;
    },
    toggleGroup(group) {
      this.expandedGroups[group.label] = !this.isGroupExpanded(group);
    },
  },
  computed: {
    mobile() {
      return this.$vuetify.display.mobile;
    },
    // Splits the flat, already name-sorted `navBBlocks` list into per-`group` sublists —
    // same grouping/highlighting rules as the Building Blocks list view (see
    // utils/bblock-groups.js), so the sidebar shows the same picture at a glance: each
    // group's highlighted block(s) directly, the rest behind "more…".
    bblockGroups() {
      if (!this.navBBlocks?.length) {
        return [];
      }
      return groupBBlocks(this.navBBlocks, OTHER_GROUP);
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

// Matches the group-heading treatment used on the Building Blocks list view (a solid
// primary-color bar) so a group reads the same way wherever it appears, instead of
// blending into the drawer's plain gray subheader default. Group labels here are the
// same short names as the list view's ("API", "Paths", "Other"), so the default
// single-line ellipsis from .v-list-subheader__text is never actually exercised.
.v-list-subheader.featured-group-heading {
  min-height: 0;
  height: auto;
  margin: 6px 8px 4px;
  padding: 0;
  border-radius: 4px;
  overflow: hidden;

  .v-list-subheader__text {
    padding: 3px 10px;
    background-color: rgb(var(--v-theme-primary));
    color: rgb(var(--v-theme-on-primary));
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    opacity: 1;
  }
}

// The "N more…" row that reveals a group's non-highlighted blocks — same role as the
// list view's .more-toggle button, styled to read as a control rather than a nav link.
.v-list-item.more-toggle-item {
  cursor: pointer;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
}
</style>
