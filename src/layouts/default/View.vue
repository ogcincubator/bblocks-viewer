<template>
  <v-app-bar
    image="http://blocks.ogc.org/assets/img/lego2.jpg"
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

    <v-app-bar-title class="text-center" v-text="pageTitle"></v-app-bar-title>

  </v-app-bar>
  <v-navigation-drawer
    v-model="navigationDrawerComputed"
  >
    <v-list>
      <v-list-item
        v-for="(item, idx) of navigationItems"
        :key="idx"
        :to="item.to"
        :title="item.title"
      ></v-list-item>
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

export default {
  components: {RegisterLoadingProgress},
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
        { title: 'About this register', to: '/' },
        { title: 'Building Blocks list', to: '/bblock' },
      ],
    };
  },
  mounted() {
    this.showRegisterLoadingProgress = true;
    this.loading = true;
    bblockService.onRegisterLoad((registers, loaded, failed) => {
      const total = Object.keys(registers).length;
      if (total > 0) {
        this.registerProgress.total = total;
        this.registerProgress.completed = loaded;
        Object.assign(this.registerProgress.failed, failed);

        if (total <= loaded) {
          setTimeout(() => {
            this.showRegisterLoadingProgress = false;
          }, 2000);
        }
      }
      this.loading = false;
    });
  },
  computed: {
    mobile() {
      return this.$vuetify.display.mobile;
    },
    navigationDrawerComputed: {
      get() {
        return !this.mobile || this.navigationDrawer;
      },
      set(v) {
        this.navigationDrawer = v;
      }
    },
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
</style>
