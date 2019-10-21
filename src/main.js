// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'//引入store
import Qs from 'qs'
import VueResource from 'vue-resource'
import {JSEncrypt} from 'jsencrypt'

Vue.prototype.qs = Qs;
Vue.use(VueResource);
Vue.http.options.withCredentials = true;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
