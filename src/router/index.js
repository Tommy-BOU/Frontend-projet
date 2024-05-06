import { createRouter, createWebHistory } from 'vue-router'
import FilmsList from '@/views/FilmList.vue'
import HomeView from '@/views/HomeView.vue'
import FilmDetail from '@/views/FilmDetail.vue'
import RegisterUser from '@/views/RegisterUser.vue'
import LoginUser from '@/views/LoginUser.vue'
import FilmCategory from '@/views/FilmCategory.vue'
import PostComment from '@/views/PostComment.vue'
import FilmCrud from '@/views/FilmCrud.vue'
import CategoryCrud from '@/views/CategoryCrud.vue'
import CommentCrud from '@/views/CommentCrud.vue'
import UserCrud from '@/views/UserCrud.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/films',
    name: 'filmsList',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: FilmsList
  },
  {
    path: '/films/:id',
    name: 'filmDetail',
    component: FilmDetail
  },
  {
    path: '/category/:id',
    name: 'category',
    component : FilmCategory

  },
  {
    path: '/register',
    name: 'register',
    component: RegisterUser
  },
  {
    path: '/login',
    name: 'login',
    component: LoginUser
  },
  {
    path: '/comment/:id',
    name: 'comment',
    component: PostComment
  },
  {
    path: '/film/crud',
    name: 'filmCrud',
    component: FilmCrud
  }
  ,
  {
    path: '/category/crud',
    name: 'categoryCrud',
    component: CategoryCrud
  },
  {
    path: '/comment/crud',
    name: 'commentCrud',
    component: CommentCrud
  },
  {
    path: '/user/crud',
    name: 'userCrud',
    component: UserCrud
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
