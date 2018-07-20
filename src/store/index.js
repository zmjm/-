import Vue from 'vue';
import Vuex from 'vuex';
import dialog from './modules/dialog';
import crumbs from './modules/crumbs';
import tabsCrumbs from './modules/tabsCrumbs';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        dialog,
        crumbs,
        tabsCrumbs
    }
})