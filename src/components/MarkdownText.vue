<script setup>
import {md2html, isBBlocksUri, bblockIdFromUri} from "@/lib/utils";
import bblockService from "@/services/bblock.service";
import {reactive} from "vue";
import { useBBlockNavigation } from "@/composables/bblock-navigation";
import RelatedBuildingBlockDialog from "@/components/bblock/RelatedBuildingBlockDialog.vue";

const props = defineProps({
  baseUrl: String,
  content: String,
  currentBBlockId: String,
  // Set to false when `content` is already-rendered HTML (e.g. the caller needed to
  // post-process it, such as demoting heading levels) to avoid re-running it through marked().
  parse: {
    type: Boolean,
    default: true,
  },
});

const { openBBlock } = useBBlockNavigation();

const errorMessage = reactive({
  visible: false,
  text: '',
});

const relatedBBlock = reactive({
  show: false,
  metadata: null,
});

const resolveBBlock = (url) => bblockService.getBBlocks(true)
  .then(bblocks => {
    const bblockId = bblockIdFromUri(url);
    const bblock = bblocks[bblockId];
    if (!bblock) {
      errorMessage.text = `Cannot find building block "${bblockId}"`;
      errorMessage.visible = true;
      console.log('Unknown bblock', bblockId);
    }
    return bblock;
  });

// The click target may be a descendant of the link (e.g. a <code> inside an <a>), so walk
// up to the nearest anchor/img rather than reading e.target directly.
const getUrlFromEvent = (e) => {
  const anchor = e.target?.closest?.('a');
  if (anchor) {
    return anchor.href;
  }
  const img = e.target?.closest?.('img');
  return img ? img.src : null;
};

// Middle-click / ctrl+click: open the target directly in a new tab, same as a normal link.
const auxclick = (e) => {
  const url = getUrlFromEvent(e);
  if (e.button === 1 && isBBlocksUri(url)) {
    e.preventDefault();
    resolveBBlock(url).then(bblock => {
      if (bblock) {
        openBBlock(bblock, true);
      }
    });
  }
};

// Regular click: show the same "related building block" popup used elsewhere in the app
// (e.g. dependency graph nodes), rather than navigating away immediately.
const interceptLinks = (e) => {
  const url = getUrlFromEvent(e);
  if (isBBlocksUri(url)) {
    e.preventDefault();
    resolveBBlock(url).then(bblock => {
      if (bblock) {
        relatedBBlock.metadata = bblock;
        relatedBBlock.show = true;
      }
    });
  }
};

</script>
<template>
  <div class="markdown-text">
    <div
      v-if="props.content"
      v-html="props.parse ? md2html(props.content, props.baseUrl) : props.content"
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
    <RelatedBuildingBlockDialog
      v-model="relatedBBlock.show"
      :bblock="relatedBBlock.metadata"
      :current-bblock-id="props.currentBBlockId"
    ></RelatedBuildingBlockDialog>
  </div>
</template>
