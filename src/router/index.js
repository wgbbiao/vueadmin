import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import List from '@/components/List'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Index',
    component: Index,
    children: [{
      path: '/:app/:model',
      name: 'List',
      component: List
    }]
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }]
})
