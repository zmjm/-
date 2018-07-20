/**
 * Author: Alex(https://github.com/zlalex);
 * ConContact: zhouliang1006@126.com
 * (c) 2017 - 2018 by Nanjing 
 */
import elementUI from 'components/element-ui';
import Vue from 'vue';
import ajax from './ajax';
import fetch from './fetch';

import {
    CALLBACKDATA,
    CALLBACKMSG,
    STATUSNAME,
    SUCCESSCODE,
} from './config';

import { Tools } from './tools';
const $tools = new Tools();

Vue.prototype.$message = elementUI.Message;
Vue.prototype.fetch = fetch;
Vue.prototype.extend = $tools.extend;
Vue.prototype.extend({
    sole: false,
    screenFlag: false,
    $tableHeight: 0,
    $alert(message, callback) {
        $tools.isStr(message) && elementUI.MessageBox.alert(message, '提示', {
            confirmButtonText: '确认',
            callback: action => {
                $tools.isFunc(callback) && callback(action);
            }
        })
    },

    $confirm(message, success, cancel) {
        ($tools.isObj(message) || $tools.isStr(message)) && elementUI.MessageBox.confirm(message.message || message, message.title || '提示', {
            confirmButtonText: message.choose || '确认',
            cancelButtonText: message.another || '取消',
            showClose: $tools.isFalse(message.close) ? false : true,
            type: 'warning'
        }).then(_ => {
            $tools.isFunc(success) && success();
        }).catch(_ => {
            $tools.isFunc(cancel) && cancel();
        })
    },

    $screenFull() {
        let docElem = document.documentElement;

        this.screenFlag = !this.screenFlag;
        !docElem.webkitRequestFullscreen ? "" : this.screenFlag ? docElem.webkitRequestFullscreen() : document.webkitExitFullscreen();
    },

    $goRoute(path, param) {
        $tools.isObj(param) ? this.$router.push({
            path: path,
            query: param
        }) : this.$router.push(path);
    },

    $notEmpty(obj) {
        let that = this,
            key;

        if (!$tools.isObj(obj)) {
            throw ('argument type error!')
            return false
        }

        for (key in obj) {
            if ($tools.isUndef(obj[key]) || obj[key] === '') {
                that.$alert('请完善表单信息！')
                return false
            }
        }

        return true
    },

    $ajax(param) {
        let that = this;

        if (that.sole) {
            return false
        }

        that.sole = true;
        ajax({
            url: param.url,
            type: param.type,
            data: param.data,
            success(res) {
                that.sole = false;
                param.success(res[CALLBACKDATA]);
            },
            error(res) {
                that.sole = false;
                that.$alert(res[CALLBACKDATA] || '请求错误！');
            },
            fail(res) {
                that.sole = false;
                that.$alert(res[CALLBACKDATA] || '请求错误！');
            }
        })
    }
})