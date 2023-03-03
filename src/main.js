import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import axios from 'axios';
import router from './router/router'
import vueDebounce from 'vue-debounce'
import apiRequestPlugin from './plugins/apiRequestPlugin';
import authorsPlugin from './plugins/authorsPlugin';
import {store} from "./store/index";

export const bus = new Vue();

Vue.use(Vuex);
Vue.use(vueDebounce);
Vue.use(apiRequestPlugin);
Vue.use(authorsPlugin);
Vue.use(store)

Vue.prototype.$http = axios;

new Vue({
  el: '#app',
  store,
  render: h => h(App),
  router: router,
})
