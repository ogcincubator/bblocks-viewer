import { useRouter } from 'vue-router';
import bblockService from '@/services/bblock.service';

export function useBBlockNavigation() {
  const router = useRouter();

  function getBBlockUrl(bblock) {
    if (bblockService.isShown(bblock)) {
      return router.resolve({ name: 'BuildingBlock', params: { id: bblock.itemIdentifier } }).href;
    } else if (bblock.documentation?.['bblocks-viewer']) {
      return bblock.documentation['bblocks-viewer'].url;
    }
    return null;
  }

  function canOpenBBlock(bblock) {
    return bblockService.isShown(bblock) || !!bblock.documentation?.['bblocks-viewer'];
  }

  function openBBlock(bblock, newWindow = false) {
    if (bblockService.isShown(bblock)) {
      const route = { name: 'BuildingBlock', params: { id: bblock.itemIdentifier } };
      if (newWindow) {
        window.open(router.resolve(route).href, '_blank');
      } else {
        router.push(route);
      }
    } else if (bblock.documentation?.['bblocks-viewer']) {
      window.open(bblock.documentation['bblocks-viewer'].url, '_blank');
    }
  }

  return { getBBlockUrl, canOpenBBlock, openBBlock };
}
