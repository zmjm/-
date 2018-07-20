module.exports = {
    "success": true,
    "tipMsg": "成功",
    "data": {
        "menuList": [{
            "menuName": "计划管理",
            "icon": "fa-calendar",
            "menuList": [{
                    "menuName": "生产计划",
                    "url": "/schedule",
                    "icon": null,
                    "menuList": []
                },
                {
                    "menuName": "生产计划2",
                    "url": "/scheduleReview",
                    "icon": null,
                    "menuList": []
                }
            ]
        }, {
            "menuName": "生产执行",
            "icon": "fa-cube",
            "menuList": [{
                "menuName": "生产监控",
                "url": "/observe/production",
                "icon": null,
                "menuList": []
            }, {
                "menuName": "工单监控",
                "url": "/observe/workOrder",
                "icon": null,
                "menuList": []
            }]
        }, {
            "menuName": "库存管理",
            "icon": "fa-stack-exchange",
            "menuList": [{
                "menuName": "货品管理",
                "url": "/repertory/",
                "icon": null,
                "menuList": []
            }, {
                "menuName": "出入库单",
                "url": "/repertory/warehouse",
                "icon": null,
                "menuList": []
            }, {
                "menuName": "出入库明细",
                "url": "/repertory/warehouseDetail",
                "icon": null,
                "menuList": []
            }]
        }, {
            "menuName": "系统管理",
            "icon": "fa-cog",
            "menuList": [{
                "menuName": "组织管理",
                "url": "/system/",
                "icon": null,
                "menuList": []
            }, {
                "menuName": "角色管理",
                "url": "/system/role",
                "icon": null,
                "menuList": []
            }]
        }, {
            "menuName": "信息设置",
            "icon": "fa-info-circle",
            "menuList": [{
                "menuName": "客户管理",
                "url": "/information/",
                "icon": null,
                "menuList": []
            }, {

                "menuName": "设备信息",
                "url": "/information/machine",
                "icon": null,
                "menuList": []
            }, {
                "menuName": "产品BOM",
                "url": "/information/bom",
                "icon": null,
                "menuList": []
            }, {
                "menuName": "产品SOP",
                "url": "/information/sop",
                "icon": null,
                "menuList": []
            }, {
                "menuName": "模具信息",
                "url": "/information/mould",
                "icon": null,
                "menuList": []
            }, {
                "menuName": "原材料信息",
                "url": "/information/material",
                "icon": null,
                "menuList": []
            }]
        }],
        "data": {
            "empNo": null,
            "empName": "Admin",
        }
    },
    "status": "0"
}
