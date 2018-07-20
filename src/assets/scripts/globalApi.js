/**
 * Author: Alex(https://github.com/zlalex);
 * ConContact: zhouliang1006@126.com
 * (c) 2017 - 2018 by Nanjing 
 */

// prefix value: post, layui, execute
let prefix = 'layui';

module.exports = {
    name: 'globalApi',
    login: 'memberAccount/toLogin',
    mes2: {
        queryWorkPlan: `${prefix}/queryWorkPlanCommand`,
        delete: `${prefix}/deleteWorkplanDetailExecuteByIdCommand`,
        operation: `execute/issueWorkplanDetailExecuteCommand`,

        createPlans: `${prefix}/addWeekCmd`,
        observeInfo: `${prefix}/queryWorkPlanDetailExecuteByworkplanWeekIdCmd`,
        detailInfo: `${prefix}/queryWorkplanDetailExecuteByIdCommand`, // edit && detail api
        orderInfo: `${prefix}/queryWorkPlanBillExecuteByDetailIdCmd`,

        workorderInfo:`${prefix}/queryWorkPlanDetailExecuteCmd`,

        getCustom: `${prefix}/addWeekClickCmd`,
        getProduct: `${prefix}/queryProductValueByCustIdCmd`,
        getMouldCode: `${prefix}/queryMouldByProductIdCommandCmd`,
        getMachine: `${prefix}/queryProductValueByMouldIdCmd`,
        queryWeekDate: `${prefix}/queryWeekDateByWeekIdCmd`,
        saveScheduleDetails: "execute/saveWorkplanDetailExecuteCommand",
        newScheduleInit: `${prefix}/queryInitWeekPlanCommand`,
        bomAddSelect:`${prefix}/saveProductBeforeCmd`,
        saveBom:`${prefix}/saveProductCmd`,
        saveNewmaterial:`execute/saveMaterialCmd`,
        queryCustom: `${prefix}/queryCustCmd`,
        rowDeatileClick: `${prefix}/queryWorkplanBillExecuteInfoByWorkplanDetailExecuteIdCommand`,
        changeScheduleCycle: `execute/changePlanScheduleCommand`,
        passSchedule: `${prefix}/pauseWorkplanDetailExecuteCommand`,
        queryBillNo: `${prefix}/queryWorkplanDetailExecuteByBillNoCommand`
    },

    mes2x: {
        newScheduleInit: `${prefix}/queryInitWeekPlanCommand`,
        newWorkorderInit:`${prefix}/queryInitWorkorderCommand`,       
        customData: `${prefix}/getCustomData`,
        queryScheduleDetail: `${prefix}/queryScheduleDetail`,
        queryProductData: `${prefix}/queryProductData`,
        queryMouldCode: `${prefix}/queryMouldCode`,
        queryMachine: `${prefix}/queryMachine`,
        newSchedule: `${prefix}/newSchedule`

    }
}