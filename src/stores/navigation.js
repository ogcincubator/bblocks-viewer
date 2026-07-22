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
      this.items = items;
      this.handler = handler;
    },
  },
});
