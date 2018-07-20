const Mock = require('mockjs');
const Random = Mock.Random;

module.exports = Mock.mock({
    'code|1': '0000',
    'message|1': '请求成功！',
    'result|4': {
        'pageCount': 20,
        'pageNum': 1,
        'pageSize': 20,
        'data|20': [{
            'eqpCode|1-20': 1,
            "planNum":100,
            'successRate|1-100': 1,
            'custName': '测试用户',
            'custProductNo|1-200': 1,
            'bomName': '测试名称',
            "holeNum|3-4":1,
            'mouldCode|201-400': 201,
            'moldingCycle|1-20': 1,
            'mouldCavityCode|1-20': 1,
            'detailStatus|0-3':1,
            'billNo|401-600': 401,
            'standardTime|1-10':1,
            'lastTime|1-10':1,
            'planMaterial|1000-2000':1,
            'actualMaterial|1000-2000':1,
            'planNam|10000-20000': 10000,
            'finishQuantity|601-801': 601,
            'failRate|-0-0.2-3':2,
            'unfinishQuantity': 0,
            'standardCapacity': 4000,
            'tempName1': 'temp-01',
            'tempName2': 'temp-02',
            'planTime': Random.date('yyyy-MM-dd')
        }]
    }
})