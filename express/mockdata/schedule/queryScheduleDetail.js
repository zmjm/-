const Mock = require('mockjs');

module.exports = Mock.mock({
    'code': '0000',
    'data': [{
        'billNo|200-1000': 1,
        'custName': '测试数据',
        'custProductNo|200-1000': 1,
        'productNm|200-1000': 1,
        'mouldCode|200-1000': 1,
        'hemozhouqi|200-1000': 1,
        'xueshu|1-20': 1,
        'yuancailiao|1-20': 1,
        'yuanliaoname': '测试数据',
        'jihuashengchan|200-600': 1,
        'yiwancheng|200-1000': 1,
        'weiwancheng|200-1000': 1,
        'biaozhunchanneng|200-1000': 1,
        'time|1-10': 1,
        'startTime': '2018-06-13',
        'machine|1-10': 1,
        'timeover': '2018/6/13-2018/6/22',
        'machineData': [{
            'eqpId|200-1000': 1,
            'eqpCode|200-1000': 1
        }],
        'mouldData': [{
            'mouldId|200-1000': 1,
            'mouldCode|200-1000': 1,
            'moldingCycle': '测试数据',
        }]
    }]
})