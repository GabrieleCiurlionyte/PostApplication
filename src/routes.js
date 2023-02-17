import postPage from './views/postPage.vue';
import postDetailPage from './views/postDetailPage.vue';

export default [
    {path:'/', component: postPage},
    {path:'/detailPage/:id', component: postDetailPage},
] 