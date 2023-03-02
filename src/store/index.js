import Vue from 'vue';
import Vuex from 'vuex';
import modalWindowStore from './modules/modalWindowStore'
import systemMessageStore from './modules/systemMessageStore'
Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        modalWindowStore,
        systemMessageStore,
    },
})