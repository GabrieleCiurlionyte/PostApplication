import Vue from 'vue';
import Router from 'vue-router';
import Routes from "./routes";

Vue.use(Router);

const router = new Router({
    routes : Routes,
    mode: 'history',
})

export default router