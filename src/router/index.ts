import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home/index.vue'
import PostView from '@/views/PostView/index.vue'

import Gallery from '@/views/Gallery/index.vue'
import UserDetail from '@/views/UserDetail/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: PostView
  },
  {
    path: '/newpost',
    name: 'PostWrite',
    component: () => import('@/views/PostWrite/index.vue')
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: Gallery
  },
  {
    path: '/user/:id',
    name: 'UserDetail',
    component: UserDetail
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
