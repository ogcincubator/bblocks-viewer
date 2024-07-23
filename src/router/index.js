// Composables
import {createRouter, createWebHistory} from 'vue-router'
import bblockService from "@/services/bblock.service";
import configService from "@/services/config.service";

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "core" */ '@/views/Home.vue'),
      },
      {
        path: 'bblock',
        name: 'BuildingBlockList',
        component: () => import(/* webpackChunkName: "core" */ '@/views/BuildingBlockList.vue'),
      },
      {
        path: 'bblock/:id/:section?',
        name: 'BuildingBlock',
        component: () => import(/* webpackChunkName: "core" */ '@/views/BuildingBlock.vue'),
        beforeEnter: async (to) => {
          const bblocks = await bblockService.getBBlocks(configService.config.showImported);
          if (!bblocks[to.params.id] || !bblockService.isShown(bblocks[to.params.id])) {
            return "404";
          }
          if (to.params.section === 'json-ld') {
            return {
              name: 'BuildingBlock',
              params: {
                id: to.params.id,
                section: 'semantic-uplift',
              }
            }
          }
        },
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import(/* webpackChunkName: "core" */ '@/views/NotFound.vue'),
      },
    ],
  },
];

export const persistQuery = (to, from, next) => {
  const newQueryParams = Object.entries(from.query)
    .filter(e => !to.query.hasOwnProperty(e[0]));

  if (!newQueryParams.length) {
    next();
  } else {
    const newQuery = Object.assign(Object.fromEntries(newQueryParams), to.query);
    next({...to, query: newQuery});
  }
}

const router = createRouter({
  history: createWebHistory(configService.config.baseUrl),
  routes,
})

router.beforeEach(persistQuery);

export default router
