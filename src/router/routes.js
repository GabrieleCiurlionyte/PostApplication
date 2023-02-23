import postPage from '../views/postPage.vue';
import postDetailPage from '../views/postDetailPage.vue';
import errorPage from "../views/404Page.vue";


export default [
    {path:'/', component: postPage},
    {path:'/detailPage/:id', component: postDetailPage},
    {path:'/error', component: errorPage},
] 