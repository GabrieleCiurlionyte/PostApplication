import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const modalWindowStore = new Vuex.Store({
    state: {
        showModalWindow : false,
    },
})