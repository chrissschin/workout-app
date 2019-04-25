import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Dashboard from '@/components/Dashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      //user id will be slugify first name and last name
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
})
