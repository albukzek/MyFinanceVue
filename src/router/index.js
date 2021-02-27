import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Categories from '../views/Categories.vue'
import Detail from '../views/Detail.vue'
import History from '../views/Hystory.vue'
import Planning from '../views/Planning.vue'
import Profile from '../views/Profile.vue'
import Record from '../views/Record.vue'
import Register from '../views/Register.vue'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {layout: 'main', auth:true},
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'empty'},
    component: Login
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {layout: 'main', auth:true},
    component: Categories
  }
  ,
  {
    path: '/detail',
    name: 'detail',
    meta: {layout: 'main', auth:true},
    component: Detail
  }
  ,
  {
    path: '/history',
    name: 'history',
    meta: {layout: 'main', auth:true},
    component: History
  }
  ,
  {
    path: '/planning',
    name: 'planning',
    meta: {layout: 'main', auth:true},
    component: Planning
  }
  ,
  {
    path: '/profile',
    name: 'profile',
    meta: {layout: 'main', auth:true},
    component: Profile
  }
  ,
  {
    path: '/record',
    name: 'record',
    meta: {layout: 'main', auth:true},
    component: Record
  }
  ,
  {
    path: '/register',
    name: 'register',
    meta: {layout: 'empty'},
    component: Register
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)=>{
  const currentUser = firebase.auth().currentUser
  const requiredAuth = to.matched.some(record => record.meta.auth)

  if( requiredAuth && !currentUser ){
    next('/login?message=login')
  } else {
    next()
  }

})

export default router
