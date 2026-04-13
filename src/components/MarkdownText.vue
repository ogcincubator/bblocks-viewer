<script setup>
import {md2html} from "@/lib/utils";
import bblockService from "@/services/bblock.service";
import {reactive} from "vue";
import { useBBlockNavigation } from "@/composables/bblock-navigation";

const props = defineProps({
  baseUrl: String,
  content: String,
});

const { openBBlock } = useBBlockNavigation();

const errorMessage = reactive({
  visible: false,
  text: '',
});

const interceptLinks = (e, newWindow = false) => {
  let url = null;
  if (e.target?.href) {
    url = e.target.href;
  } else if (e.target.tagName.toLowerCase() === 'img') {
    url = e.target.src;
  }
  if (url?.startsWith('bblocks://')) {
    e.preventDefault();
    bblockService.getBBlocks(true)
      .then(bblocks => {
        const bblockId = url.replace(/^bblocks:\/\//, '');
        const bblock = bblocks[bblockId];
        if (bblock) {
          openBBlock(bblock, newWindow);
        } else {
          errorMessage.text = `Cannot find building block "${bblockId}"`;
          errorMessage.visible = true;
          console.log('Unknown bblock', bblockId);
        }
      });
  }
};

const auxclick = (e) => {
  if (e.button === 1) {
    interceptLinks(e, true);
  }
};

</script>
<template>
  <div class="markdown-text">
    <div
      v-if="props.content"
      v-html="md2html(props.content, props.baseUrl)"
      @click="interceptLinks"
      @auxclick="auxclick"
    ></div>
    <v-snackbar
        v-model="errorMessage.visible"
        timeout="5000"
        color="red-accent-4"
      >
      {{ errorMessage.text }}

      <template v-slot:actions>
        <v-btn
          variant="text"
          @click="errorMessage.visible = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
