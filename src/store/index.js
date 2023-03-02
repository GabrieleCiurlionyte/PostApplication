import Vue from 'vue';
import Vuex from 'vuex';
import modalWindowStore from './modules/modalWindowStore'
import systemMessageStore from '../Mixins/systemMessageMixin'
Vue.use(Vuex);


export default new Vuex.Store({
    modules: {
        modalWindowStore,
        systemMessageStore,
    },
})