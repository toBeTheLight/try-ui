// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false

import FastClick from 'fastclick'
import '@/assets/js/rem'
import '@/assets/css/reset.css'

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body)
  }, false)
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
