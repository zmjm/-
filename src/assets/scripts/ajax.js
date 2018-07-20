/**
 * Author: Alex(https://github.com/zlalex);
 * ConContact: zhouliang1006@126.com
 * (c) 2017 - 2018 by Nanjing 
 */
import axios from 'axios';
import configs from './axiosConfig';
import { Tools } from './tools';
import {
    LOCALHOST,
    STATUSNAME,
    SUCCESSCODE,
    ERRORCODE
} from './config';

const $tools = new Tools();
const ajaxConfig = $tools.cloneObj(configs);

ajaxConfig.transformRequest = [function(data, headers) {
    let json = JSON.stringify(data);

    return json;
}];

ajaxConfig.headers = {
    "Content-Type": "application/json;charset=UTF-8"
};

const ajax = axios.create(ajaxConfig);
const $ajax = function(option) {
    let url = (LOCALHOST + option.url) || '',
        type = option.type || 'post',
        data = option.data || {},
        success = option.success || function() {},
        fail = option.fail || function() {},
        error = option.error || function(res) {
            alert(res.msg || res.result);
        };

    const callback = function(res) {
        let code = res[STATUSNAME];

        switch (code) {
            case SUCCESSCODE:
                if (res.token) {
                    document.cookie = "sense_token=" + res.token;
                }
                success(res);
                break;
            case ERRORCODE:
                error(res);

                // window.location.href = '/';
                break;
            default:
                error(res);
        }
    }

    if (type === 'get') {
        ajax.get(url, {
            params: data
        }).then(res => {
            callback(res.data);
        }).catch(err => {
            fail(err);
        })
    } else {
        ajax.post(url, data).then(res => {
            callback(res.data);
        }).catch(err => {
            fail(err);
        })
    }
}

export default $ajax