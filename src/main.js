// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import api from './libs/api.js'

Vue.prototype.$api = api
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg-core.css'

Vue.use(VueFormGenerator)

Vue.config.productionTip = false

// var UserMixin = {
//   created: function() {
//     const ssStorage = window.sessionStorage
//     if (ssStorage.jwt_token) {
//       const jwtTokenArr = ssStorage.jwt_token.split('.')
//       const payload = JSON.parse(new Buffer(jwtTokenArr[1], 'base64').toString())
//       const now = Math.round(new Date().getTime() / 1000)
//       if (payload['exp'] > now) {} else {
//         window.location.href = '#/login'
//         return
//       }
//     } else {
//       window.location.href = '#/login'
//       return
//     }
//   },
//   methods: {
//     loadmoreHeight: function(gap) {
//       if (gap) {
//         return (document.documentElement.clientHeight - gap) + 'px'
//       }
//       return document.documentElement.clientHeight + 'px'
//     }
//   }
// }

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  // mixins: [UserMixin],
  components: { App }
})
