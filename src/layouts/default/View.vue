<template>
  <v-app-bar
    image="http://blocks.ogc.org/assets/img/lego2.jpg"
  >
    <template v-slot:image>
      <v-img
        gradient="to top right, rgba(255,255,255,.8), rgba(255,255,255,.4)"
      ></v-img>
    </template>

    <v-app-bar-title class="text-center" v-text="pageTitle"></v-app-bar-title>
  </v-app-bar>
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
      },
      showRegisterLoadingProgress: false,
      pageTitle: configService.config.title,
    };
  },
  mounted() {
    this.showRegisterLoadingProgress = true;
    bblockService.onRegisterLoad((registers, loaded) => {
      const total = Object.keys(registers).length;
      if (total > 0) {
        this.registerProgress.total = total;
        this.registerProgress.completed = loaded;

        if (total <= loaded) {
          setTimeout(() => {
            this.showRegisterLoadingProgress = false;
          }, 2000);
        }
      }
    });
  },
}
</script>

<style>
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
  //background-color: rgba(0, 0, 0, 0.6);
  padding: 0.5em;
  //color: white;
}
</style>
