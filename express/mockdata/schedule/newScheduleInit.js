const Mock = require('mockjs');
const Random = Mock.Random;

module.exports = Mock.mock({
    'code': '0000',
    'message': '请求成功！',
    'result': {
        'pageCount': 0,
        'pageNum': 1,
        'pageSize': 20,
        'data|20': [{
            'eqpCode|1-20': 1,
            'custName': '测试用户',
            'custProductNo|1-200': 1,
            'productNm': '测试名称',
            'mouldCode|201-400': 201,
            'moldingCycle|1-20': 1,
            'mouldCavityCode|1-20': 1,
            'billNo|401-600': 401,
            'planNam|10000-20000': 10000,
            'finishQuantity|601-801': 601,
            'unfinishQuantity': 0,
            'standardCapacity': 4000,
            'jishu|0-1': 0,
            'zhijian|0-1': 0,
            'tempName1': 'temp-01',
            'tempName2': 'temp-02',
            'status|0-1': 0,
            'scheduleCycle|1-7': 0,
            'planTime': '2018/6/11-2018/6/16',
            'scheduleDate': [1528905600000, 1528992000000, 1529078400000, 1529164800000, 1529251200000, 1529337600000, 1529424000000]
        }]
    }
})