import axios from 'axios';
import map from '../protobuf/map';
import { Uint8ArryToString, StringToUint8Array, pbEncode, pbDecode, getUrlPath } from '../util';

const http = axios.create({
    baseURL: 'http://192.168.1.161:8000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
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
    if (response.data.code === 200) {
        let data = StringToUint8Array(atob(response.data.data));
        let path = getUrlPath(response.config.url as string);
        let pb = map[path].response;
        data = pbDecode(pb, data);
        return data as any;
    } else {
        return Promise.reject(new Error(response.data.msg)) as any;
    }
});


export default http;