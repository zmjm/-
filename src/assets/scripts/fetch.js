/**
 * Author: Alex(https://github.com/zlalex);
 * ConContact: zhouliang1006@126.com
 * (c) 2017 - 2018 by Nanjing 
 */
import axios from 'axios';
import configs from './axiosConfig';
import {
    LOCALHOST,
    EXPRESS_HREF,
    STATUSNAME,
    SUCCESSCODE,
    CALLBACKDATA,
    ERRORCODE
} from './config';

const fetch = axios.create(configs);

const $fetch = function(option, express) {
    let url = express ? (EXPRESS_HREF + option.url) : (LOCALHOST + option.url) || '',
        type = option.type || 'post',
        data = option.data || {};

    const callback = function(res) {
        let code = res[STATUSNAME];

        switch (code) {
            case SUCCESSCODE:
                if (res.token) {
                    document.cookie = "sense_token=" + res.token;
                }
                break;
            case ERRORCODE:
                // window.location.href = '/';
                break;
            default:
        }
    }

    return new Promise((resolve, reject) => {
        // 此处需要优化
        if (type === 'get') {
            fetch.get(url, {
                params: data
            }).then(res => {
                callback(res.data);
                resolve(res.data[CALLBACKDATA] || res.data);
            }).catch(err => {
                reject(err);
            })
        } else {
            fetch.post(url, data).then(res => {
                callback(res.data);
                resolve(res.data[CALLBACKDATA] || res.data);
            }).catch(err => {
                reject(err);
            })
        }
    })
}

export default $fetch