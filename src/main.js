import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';

export const bus = new Vue();

Vue.prototype.$http = axios;

new Vue({
  el: '#app',
  render: h => h(App)
})
