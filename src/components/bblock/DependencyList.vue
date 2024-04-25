<template>
  <div class="dependency-list">
    <v-card v-for="itemClass of itemClasses" :key="itemClass" class="ma-2">
      <v-card-title
        class="text-subtitle-1"
      >
        {{ itemClass.label }}
      </v-card-title>
      <v-list-item v-for="dependency in dependencies[itemClass.value]"
                   :key="dependency.itemIdentifier"
                   prepend-icon="mdi-open-in-new"
                   @click="openBBlock(dependency)"
      >
        <v-list-item-title>
          {{ dependency.name }}
          <small class="ml-2">{{ dependency.itemIdentifier }}</small>
        </v-list-item-title>
        <v-list-item-subtitle v-if="dependency.abstract">
          {{ dependency.abstract }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-card>
  </div>
</template>
<script>
import {itemClasses} from "@/models/itemClass";
import bblockService from "@/services/bblock.service";

export default {
  props: {
    bblock: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      allBBlocks: null,
    };
  },
  mounted() {
    bblockService.getBBlocks(true).then(bblocks => {
      this.allBBlocks = bblocks;
    });
  },
  methods: {
    openBBlock(bblock) {
      if (bblockService.isShown(bblock)) {
        this.$router.push({
          name: 'BuildingBlock',
          params: {
            id: bblock.itemIdentifier,
          },
        });
      } else if (bblock.documentation?.['bblocks-viewer']) {
        window.open(bblock.documentation['bblocks-viewer'].url);
      }
    }
  },
  computed: {
    dependencies() {
      if (!this.bblock || !this.allBBlocks) {
        return {};
      }
      const result = {};
      for (const depId of this.bblock.dependsOn) {
        const dep = this.allBBlocks[depId];
        if (!dep) {
          continue;
        }
        if (result[dep.itemClass]) {
          result[dep.itemClass].push(dep);
        } else {
          result[dep.itemClass] = [dep];
        }
      }
      return result;
    },
    itemClasses() {
      return itemClasses.filter(c => !!this.dependencies[c.value]);
    },
  },
}
</script>
