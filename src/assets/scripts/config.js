/**
 * Author: Alex(https://github.com/zlalex);
 * ConContact: zhouliang1006@126.com
 * (c) 2017 - 2018 by Nanjing 
 */

// -- Location Setting --
// const LOCATION_HREF = '/';
// const LOCATION_HREF = 'http://localhost:3001/';
const LOCATION_HREF = 'http://192.168.168.23:8760/';
const EXPRESS_HREF = 'http://localhost:3001/';
const LOCALHOST = LOCATION_HREF + '';

// -- RegEx Object --
const TELREG = /^[1][3,4,5,7,8][0-9]{9}$/;

const MAILREG = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

// -- Request Response Setting --
const CALLBACKDATA = 'result';

const CALLBACKMSG = 'msg';

const STATUSNAME = 'code';

const SUCCESSCODE = '0000';

const ERRORCODE = '0001';

export {
    LOCATION_HREF,
    EXPRESS_HREF,
    LOCALHOST,
    TELREG,
    MAILREG,
    CALLBACKDATA,
    CALLBACKMSG,
    STATUSNAME,
    SUCCESSCODE,
    ERRORCODE
}