// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router/index.js'
import Mint from 'mint-ui'
import axios from 'axios';
import filters from './filters';
import store from './vuex/user.js'
import 'mint-ui/lib/style.css';
/* import keepAlick from 'keep-alive' */

Vue.config.productionTip = false
Vue.use(Mint);
Vue.prototype.$ajax = axios;

// 实例化Vue的filter
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store
}).$mount('#app');
