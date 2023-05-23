<template>
  <v-app-bar
    image="http://blocks.ogc.org/assets/img/lego2.jpg"
  >
    <template v-slot:image>
      <v-img
        gradient="to top right, rgba(255,255,255,.8), rgba(255,255,255,.4)"
      ></v-img>
    </template>

    <v-app-bar-title class="text-center">OGC Building Blocks Viewer</v-app-bar-title>
  </v-app-bar>
  <v-main>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"/>
      </transition>
    </router-view>
  </v-main>
</template>

<script setup>
//
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
</style>
