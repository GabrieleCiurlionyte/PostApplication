import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import VueRouter from 'vue-router';
import Routes from "./router/routes.js"
import vueDebounce from 'vue-debounce'
import apiRequestPlugin from './plugins/apiRequestPlugin';
import { store } from './stores/systemMessageStore'

export const bus = new Vue();

Vue.use(vueDebounce);
Vue.use(apiRequestPlugin);

Vue.use(VueRouter);
const router = new VueRouter({
  routes: Routes,
  mode: 'history',
});

Vue.prototype.$http = axios;

new Vue({
  el: '#app',
  store,
  render: h => h(App),
  router: router,
})
