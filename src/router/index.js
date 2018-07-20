import Vue from 'vue'
import Router from 'vue-router'
import path from './path'
Vue.use(Router);

export default new Router({
    routes: [{
            path: '/login',
            component: path.login
        },
        {
            path: '/index',
            redirect: '/'
        },
        {
            path: '/',
            component: path.index,
            children: [{
                    path: '/',
                    component: path.defaultView
                },
                {
                    path: 'scheduleReview',
                    component: path.scheduleReview
                },
                {
                    path: 'schedule',
                    component: path.schedule
                },
                {
                    path: 'observe',
                    component: path.observe,
                    children: [{
                            path: 'production',
                            component: path.production
                        },
                        {
                            path: 'workOrder',
                            component: path.workorder
                        }
                    ]
                },
                {
                    path: 'information',
                    component: path.information,
                    children: [{
                            path: '/',
                            component: path.custom
                        },
                        {
                            path: 'sop',
                            component: path.sop
                        },
                        {
                            path: 'bom',
                            component: path.bom
                        },
                        {
                            path: 'material',
                            component: path.material
                        },
                        {
                            path: 'machine',
                            component: path.machine
                        },
                        {
                            path: 'mould',
                            component: path.mould
                        }
                    ]
                },
                {
                    path: 'system',
                    component: path.system,
                    children: [{
                        path: '/',
                        component: path.structure
                    }, {
                        path: 'role',
                        component: path.role
                    }]
                }
            ]
        }
    ]
})