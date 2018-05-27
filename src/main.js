// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './assets/css/common.less'
import './assets/css/reset.css'
import './assets/css/var.less'
import './assets/transition.less'

import installElementCmpts from './components/elementCmpts'
import installFunctionCmpts from './components/functionCmpts'

installElementCmpts(Vue)
installFunctionCmpts(Vue)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
