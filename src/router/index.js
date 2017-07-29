import Vue from 'vue'
import Router from 'vue-router'
import demo from '@e/demo'
import nav from '@e/nav'

Vue.use(Router)

export default new Router({
  routes:
  [
    {
      path: '/',
      name: 'demo',
      component: demo
    },
    {
      path: '/nav',
      name: 'nav',
      component: nav
    }
  ]
})
