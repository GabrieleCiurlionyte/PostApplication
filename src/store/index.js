import Vue from 'vue';
import Vuex from 'vuex';
import modalWindowStore from './modules/modalWindowStore';
import systemMessageStore from './modules/systemMessageStore';
import articleStore from './modules/articleStore';
Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        modalWindowStore,
        systemMessageStore,
        articleStore,
    },
})