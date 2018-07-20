// import framework && plugins
import Vue from 'vue'
import router from 'router'

// import components
import root from 'components/root'
import elementUI from 'components/element-ui'
import layoutPackage from 'components/packages/layout'
import themes from 'components/packages/themes'
import calendar from 'v-calendar'

import { Loading } from 'element-ui';
Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;

// import project scripts
import 'assets/scripts/common'
import store from './store'
import { Tools } from 'assets/scripts/tools'

const globalApi = require('assets/scripts/globalApi');

window.$tools = new Tools();
window.globalApi = globalApi;

// import project styles
import 'assets/styles/include.styl'
import 'font-awesome/css/font-awesome.min.css'
import 'v-calendar/lib/v-calendar.min.css'

// setting
Vue.use(elementUI);
Vue.use(layoutPackage);
Vue.use(themes);
Vue.use(calendar, {
    title: 'MMMM YYYY',
    weekdays: 'W',
    navMonths: 'MMM',
    input: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD'],
    dayPopover: 'L',
    locale: 'zh-CN'
});

Vue.config.productionTip = false;

new Vue({
    el: '#root',
    router,
    store,
    components: { root },
    template: '<root/>'
})