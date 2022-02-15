import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () =>import('../views/home/Home')
const Profile = () =>import('../views/profile/Profile')
const Login = () =>import('../views/login/Login.vue')
const Users = () =>import('../views/users/Users.vue')
const College = () =>import('../views/college/College.vue')
const CollegeAnalysis = () =>import('../views/analysis/CollegeAnalysis.vue')
const GradeAnalysis = () =>import('../views/analysis/GradeAnalysis.vue')


Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/profile',
    component:Profile,
  },
  {
    path:'/login',
    component:Login,
  },
  {
    path:'/users',
    component:Users
  },
  {
    path:'/college',
    component:College
  },
  {
    path:'/colegeanalysis',
    component:CollegeAnalysis
  },
  {
    path:'/gradeanalysis',
    component:GradeAnalysis
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
