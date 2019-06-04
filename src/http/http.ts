import axios from 'axios';
import map from '../protobuf/map';
import { Uint8ArryToString, pbEncode, pbDecode, getUrlPath } from '../util';

const http = axios.create({
    baseURL: 'http://hero.lukou.com:8000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    responseType: 'arraybuffer'
});

http.interceptors.request.use(config => {
    let path = getUrlPath(config.url as string);
    let pb = map[path].request;
    config.data.data = pbEncode(pb, config.data.data);
    let reqData = pbEncode('wpb.BaseRequest', config.data);
    reqData = btoa(Uint8ArryToString(reqData));
    let form = new FormData();
    form.append('body', reqData);
    config.data = form;
    return config;
});

http.interceptors.response.use(response => {
    let res = pbDecode('wpb.BaseResponse', new Uint8Array(response.data));
    if (res.ret === 200) {
        let path = getUrlPath(response.config.url as string);
        let pb = map[path].response;
        let data = pbDecode(pb, res.data);
        return data;
    } else {
        return Promise.reject(new Error(res.errMsg));
    }
});


export default http;