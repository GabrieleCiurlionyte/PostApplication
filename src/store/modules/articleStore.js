import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default{
    namespaced: true,
    state: {
        articles: [],
        currentPage : 1,
        lastPage : 1,
    },
    mutations: {
        updateArticles(state, articles) {
            state.articles = articles;
            console.log("Articles updated from the store");
            console.log(articles);
        },
        changeCurrentPage(state, page) {
            state.currentPage = page;
            console.log("Changed current page");
        },
        changeLastPage(state, page) {
            state.lastPage = page;
            console.log("Changed last page");
        },
    },
}
