import Vue from 'vue'
import Router from 'vue-router'
import demo from '@e/demo'
import nav from '@e/nav'
import pagesScroll from '@e/pages-scroll/pages-scroll'

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
      path: '/pages-scroll',
      name: 'pages-scroll',
      component: pagesScroll
    }
  ]
})
