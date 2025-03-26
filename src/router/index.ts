import { createRouter, createWebHistory } from 'vue-router'
import SpellsView from '../views/SpellsView.vue'
import SpellDetailsView from '../views/SpellDetailsView.vue'
import FavouritesView from '@/views/FavouritesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SpellsView,
    },
    {
      path: '/spell/:id',
      name: 'spell-details',
      component: SpellDetailsView,
      props: true,
    },
    {
      path: '/favourites',
      name: 'favourites',
      component: FavouritesView,
    },
  ],
})

export default router
