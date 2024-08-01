import { defineStore } from 'pinia';

export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    items: [],
    handler: null,
  }),
  actions: {
    clearItems() {
      this.items = [];
      this.handler = null;
    },
    setItems(items, handler) {
      console.log('setting new items');
      this.items = items;
      this.handler = handler;
    },
  },
});
