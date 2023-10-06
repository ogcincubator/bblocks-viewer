// Composables
import {createRouter, createWebHistory} from 'vue-router'
import bblockService from "@/services/bblock.service";

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
        path: 'bblock/:id',
        name: 'BuildingBlock',
        component: () => import(/* webpackChunkName: "core" */ '@/views/BuildingBlock.vue'),
        beforeEnter: async (to) => {
          const bblocks = await bblockService.getBBlocks();
          if (!bblocks[to.params.id]) {
            return "404";
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
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
