import http from './http';
import { getParamValue } from '@/util';

let shortWxId = getParamValue('alias');
let wxId = getParamValue('id');
let cmdId = 1;

interface Param {
    cmdId?: number,
    wxId?: string,
    seq?: number,
    data?: any,
    realWxId?: string
}

let BaseRequesParam = {
    cmdId,
    wxId,
    shortWxId
};

export function fetchQrCode (param: Param) : Promise<any> {
    return http.post('/api/v1/login_qrcode', {...BaseRequesParam, ...param});
}

export function fetchLoginStatus (param: Param) : Promise<any> {
    return http.post('/api/v1/login_status', {...BaseRequesParam, ...param});
}

export function fetchAccountList (param: Param) : Promise<any> {
    return http.post('/api/v1/account/list', {...BaseRequesParam, ...param});
}

export function fetchSessionList (param: Param) : Promise<any> {
    return http.post('/api/v1/session/list', {...BaseRequesParam, ...param});
}

export function fetchFriendList (param: Param) : Promise<any> {
    return http.post('/api/v1/friend/list', {...BaseRequesParam, ...param});
}

export function fetchGroupList (param: Param) : Promise<any> {
    return http.post('/api/v1/group/list', {...BaseRequesParam, ...param});
}

export function fetchFriendApplyList (param: Param) : Promise<any> {
    return http.post('/api/v1/friend_apply/list', {...BaseRequesParam, ...param});
}

export function fetchMessageList (param: Param) : Promise<any> {
    return http.post('/api/v1/message/list', {...BaseRequesParam, ...param});
}

export function fetchClientList (param: Param) : Promise<any> {
    return http.post('/api/v1/client/list', {...BaseRequesParam, ...param});
}

export function fetchAccountDetail (param: Param) : Promise<any> {
    return http.post('/api/v1/account/detail', {...BaseRequesParam, ...param});
}

export function fetchCreateSession (param: Param) : Promise<any> {
    return http.post('/api/v1/session/create', {...BaseRequesParam, ...param});
}

export function fetchSendTextMessage (param: Param) : Promise<any> {
    return http.post('/api/v1/send_text', {...BaseRequesParam, ...param});
}

export function sendAgreeFriendApply (param: Param) : Promise<any> {
    return http.post('/api/v1/agree_apply', {...BaseRequesParam, ...param});
}