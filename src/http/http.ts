import axios from 'axios';
import map from '../protobuf/map';
import { Uint8ArryToString, pbEncode, pbDecode, getUrlPath } from '../util';
import { getParamValue } from '@/util';
import store from '@/store';
import config from './config';

let wxAlias = getParamValue('alias');
let wxId = '';
let cmdId = 1;

const http = axios.create({
    baseURL: `http://${config.origin}`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    responseType: 'arraybuffer'
});

http.interceptors.request.use(config => {
    let path = getUrlPath(config.url as string);
    let urlConfig = map[path];
    let pb = urlConfig && urlConfig.request;
    let wrap = urlConfig && urlConfig.wrap;
    let baseReq: any;
    if (wrap) {
        baseReq = {
            wxAlias,
            wxId,
            cmdId
        };
        if (store) {
            let loginInfo = store.getState().loginInfo;
            if (loginInfo.wxAlias) {
                baseReq.wxAlias = loginInfo.wxAlias;
            }
            if (loginInfo.wxId) {
                baseReq.wxId = loginInfo.wxId;
            }
        }
        baseReq.data = pbEncode(pb, config.data);
    } else {
        baseReq = config.data;
    }
    let reqData = pbEncode('wpb.BaseRequest', baseReq);
    reqData = btoa(Uint8ArryToString(reqData));
    let form = new FormData();
    form.append('body', reqData);
    config.data = form;
    return config;
});

http.interceptors.response.use(response => {
    let res = pbDecode('wpb.BaseResponse', new Uint8Array(response.data));
    if (res.ret === 200) {
        if (res.data) {
            let path = getUrlPath(response.config.url as string);
            let pb = map[path].response;
            let data = pbDecode(pb, res.data);
            return data;
        } else {
            return null;
        }
    } else {
        return Promise.reject(new Error(res.errMsg));
    }
});


export default http;