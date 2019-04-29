import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Dashboard from '@/components/Dashboard'
import Test from '@/components/Test'
// import AddWorkoutFrom from '@/components/AddWorkoutForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    }, 
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
})
