import {ref, toValue, watchEffect} from 'vue';
import bblockService from "@/services/bblock.service";

export function useFetchDocument(bblock, property) {
  const loading = ref(false);
  const contents = ref(null);
  const error = ref(null);

  watchEffect(() => {
    contents.value = null;
    error.value = null;

    const propertyValue = toValue(property);
    const bblockValue = toValue(bblock);
    if (bblockValue && propertyValue) {
      loading.value = true;
      bblockService.fetchDocument(bblockValue, propertyValue)
        .then(data => contents.value = data)
        .catch(err => error.value = err)
        .finally(() => loading.value = false);
    }
  });

  return {contents, loading, error};
}

export function useFetchDocumentByUrl(bblock, url) {
  const loading = ref(false);
  const contents = ref(null);
  const error = ref(null);

  const urlValue = toValue(url);
  const bblockValue = toValue(bblock);
  watchEffect(() => {
    contents.value = null;
    error.value = null;
    if (bblock && url) {
      loading.value = true;
      bblockService.fetchDocumentByUrl(bblockValue, urlValue)
        .then(data => contents.value = data)
        .catch(err => error.value = err)
        .finally(() => loading.value = false);
    }
  });

  return {contents, loading, error};
}
