import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import VueRouter from 'vue-router';
import Routes from './routes.js';
import vueDebounce from 'vue-debounce'

export const bus = new Vue();

Vue.use(vueDebounce);

Vue.use(VueRouter);
const router = new VueRouter({
  routes: Routes,
  mode: 'history',
});

Vue.prototype.$http = axios;

new Vue({
  el: '#app',
  render: h => h(App),
  router: router,
})
