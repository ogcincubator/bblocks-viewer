<script setup>
import {md2html} from "@/lib/utils";
import bblockService from "@/services/bblock.service";
import {reactive} from "vue";
import { useRouter } from 'vue-router'

const props = defineProps({
  baseUrl: String,
  content: String,
});

const router = useRouter();

const errorMessage = reactive({
  visible: false,
  text: '',
});

const openBBlock = (bblock, newWindow = false) => {
  if (bblockService.isShown(bblock)) {
    const route = {
      name: 'BuildingBlock',
      params: {
        id: bblock.itemIdentifier,
      },
    };
    if (newWindow) {
      window.open(router.resolve(route).href, '_blank')
    } else {
      router.push(route);
    }
  } else if (bblock.documentation?.['bblocks-viewer']) {
    const url = bblock.documentation['bblocks-viewer'].url;
    if (newWindow) {
      window.open(url, '_blank');
    } else {
      window.location.href = url;
    }
  }
};

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
