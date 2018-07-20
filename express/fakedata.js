const fakeMenu = require('./mockdata/fakemenu');
const fakeTest = require('./mockdata/faketest');
const newScheduleInit = require('./mockdata/schedule/newScheduleInit');
const customData = require('./mockdata/schedule/customData');
const queryScheduleDetail = require('./mockdata/schedule/queryScheduleDetail');
const queryProductData = require('./mockdata/schedule/queryProductData');
const queryMouldCode = require('./mockdata/schedule/queryMouldCode');
const queryMachine = require('./mockdata/schedule/queryMachine');

const newSchedule = require('./mockdata/schedule/newSchedule');
const newWorkorderInit = require('./mockdata/workorder/newWorkorderInit')
module.exports = {
    mock: fakeTest,
    loginResponse: fakeMenu,
    newScheduleInit,
    newWorkorderInit,
    customData,
    queryScheduleDetail,
    queryMouldCode,
    queryProductData,
    queryMachine,
    newSchedule
}