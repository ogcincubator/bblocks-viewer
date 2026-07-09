<template>
  <v-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" max-width="800">
    <template #default="{ isActive }">
      <v-card v-if="bblock">
        <v-card-title style="white-space: normal">
          {{ bblock.name }}
        </v-card-title>
        <v-card-subtitle>
          <code>{{ bblock.itemIdentifier }}</code>
          <v-chip class="ml-sm-3 mx-1" size="small" variant="flat">{{ getItemClassLabel(bblock.itemClass) }}</v-chip>
        </v-card-subtitle>
        <v-card-text>
          {{ bblock.abstract }}
          <p class="my-2 text-body-2" v-if="bblock.itemIdentifier === currentBBlockId">This is the current building block.</p>
          <v-divider class="my-2"></v-divider>
          <div v-if="bblock.register">
            From register:
            <color-circle :color="bblock.register.color" class="mr-1"></color-circle>
            <strong>{{ bblock.register.name }}</strong>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :href="relatedBBlockLink"
            v-if="bblock.itemIdentifier !== currentBBlockId && (bblock.local || showImported || bblock.documentation?.['bblocks-viewer'])"
            @click.prevent="open()"
          >
            Go to Building Block
          </v-btn>
          <v-btn @click="isActive.value = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import ColorCircle from '@/components/ColorCircle.vue';
import { getLabel as getItemClassLabel } from '@/models/itemClass';
import bblockService from '@/services/bblock.service';
import configService from '@/services/config.service';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  bblock: {
    type: Object,
    default: null,
  },
  currentBBlockId: {
    type: String,
    default: null,
  },
});
const emit = defineEmits(['update:modelValue']);

const router = useRouter();
const showImported = !!configService.config.showImported;

const relatedBBlockLink = computed(() => props.bblock?.documentation?.['bblocks-viewer']?.url);

function open() {
  if (props.bblock) {
    if (bblockService.isShown(props.bblock)) {
      router.push({ name: 'BuildingBlock', params: { id: props.bblock.itemIdentifier } });
    } else if (props.bblock.documentation?.['bblocks-viewer']) {
      window.open(props.bblock.documentation['bblocks-viewer'].url);
    }
  }
  emit('update:modelValue', false);
}
</script>
