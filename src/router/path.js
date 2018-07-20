const components = {
    index: resolve => require(['components/views/index'], resolve),
    login: resolve => require(['components/views/login/login'], resolve),
    defaultView: resolve => require(['components/views/index/default-view'], resolve),

    // 生产计划
    schedule: resolve => require(['components/views/schedule/schedules/schedule'], resolve),
    scheduleReview: resolve => require(['components/views/schedule/scheduleReview/scheduleReview'], resolve),

    // 工单监控
    observe: resolve => require(['components/views/observe'], resolve),
    production: resolve => require(['components/views/observe/production/production'], resolve),
    workorder: resolve => require(['components/views/observe/workorder/workorder'], resolve),

    // 系统管理
    system: resolve => require(['components/views/system'], resolve),
    role: resolve => require(['components/views/system/role/role'], resolve),
    structure: resolve => require(['components/views/system/structure/structure'], resolve),

    // 信息管理
    information: resolve => require(['components/views/information'], resolve),
    custom: resolve => require(['components/views/information/custom/custom'], resolve),
    bom: resolve => require(['components/views/information/bom/bom'], resolve),
    machine: resolve => require(['components/views/information/machine/machine'], resolve),
    material: resolve => require(['components/views/information/material/material'], resolve),
    mould: resolve => require(['components/views/information/mould/mould'], resolve),
    sop: resolve => require(['components/views/information/sop/sop'], resolve),
}

export default {
    name: 'path',
    index: components.index,
    login: components.login,

    defaultView: components.defaultView,

    scheduleReview: components.scheduleReview,
    schedule: components.schedule,

    observe: components.observe,
    production: components.production,
    workorder: components.workorder,

    information: components.information,
    bom: components.bom,
    custom: components.custom,
    machine: components.machine,
    material: components.material,
    mould: components.mould,
    sop: components.sop,

    system: components.system,
    role: components.role,
    structure: components.structure
}