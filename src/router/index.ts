import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home/index.vue'
import PostView from '@/views/PostView/index.vue'
import WhwList from '@/views/WhwList/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/post/:id',
    name: 'PostView',
    component: PostView
  },
  {
    path: '/whw_list',
    name: 'WhwListView',
    component: WhwList
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
