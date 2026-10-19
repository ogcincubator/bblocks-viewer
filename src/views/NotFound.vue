<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>404 - not found</v-card-title>
          <v-card-text>
            <span v-if="$route.params.pathMatch.length > 1 && $route.params.pathMatch[0] == 'bblock'">
              The requested building block (<code>{{ $route.params.pathMatch[1] }}</code>) could not be found.
            </span>
            <span v-else>
              The requested URL could not be found.
            </span>
            <v-alert
              v-if="failedRegisterUrls.length && $route.params.pathMatch[0] == 'bblock'"
              type="warning"
              variant="tonal"
              class="mt-4"
              title="Some registers failed to load"
            >
              The requested building block may belong to one of these registers:
              <ul class="ml-6 mt-1">
                <li v-for="url in failedRegisterUrls" :key="url">{{ url }}</li>
              </ul>
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import bblockService from '@/services/bblock.service';
import configService from '@/services/config.service';

const failedRegisterUrls = ref([]);

onMounted(() => {
  if (!configService.config.showImported) {
    return;
  }
  bblockService.getBBlocks(true)
    .then(() => {
      failedRegisterUrls.value = Object.keys(bblockService.getFailedRegisters());
    })
    .catch(() => {});
});
</script>
