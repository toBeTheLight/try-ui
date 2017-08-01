import Vue from 'vue'
import Router from 'vue-router'
import demo from '@e/demo'
import nav from '@e/nav/nav'
import pageSwitch from '@e/page-switch/page-switch'

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
    },
    {
      path: '/page-switch',
      name: 'page-switch',
      component: pageSwitch
    }
  ]
})
