const express = require('express');

const portSetting = require('../config/index');

const globalApi = require('../src/assets/scripts/globalApi');

const fakedata = require('./fakedata');

const server = express();

const port = portSetting.dev.port + 1;

server.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");　
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// 查看所有请求地址
server.get('/', (req, res, next) => {
    res.send(JSON.stringify({
        message: 'Hello Front End Developer!',
        help: '点击右键查看源代码，获取格式化的地址信息',
        globalApi
    }, null, 4));
});

// 测试mock数据
server.get('/mock', (req, res, next) => {
    res.send(fakedata.mock);
});

// 登录后导航数据
server.post('/' + globalApi.login, (req, res, next) => {
    res.send(fakedata.loginResponse);
});


// 新MES接口监听
const mes2x = globalApi.mes2x;

Object.keys(mes2x).forEach(key => {
    server.post('/' + mes2x[key], (req, res, next) => {
        res.send(fakedata[key]);
        next();
    })
})

server.listen(port, _ => {
    console.log(port + ' is listen success!')
});