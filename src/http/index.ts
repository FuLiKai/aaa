import http from './http';

export function fetchQrCode () : Promise<any> {
    return http.post('/api/v1/login_qrcode');
}

export function fetchLoginStatus () : Promise<any> {
    return http.post('/api/v1/login_status');
}

export function fetchAccountList (param: any) : Promise<any> {
    return http.post('/api/v1/account/list', param);
}

export function fetchSessionList (param: any) : Promise<any> {
    return http.post('/api/v1/session/list', param);
}

export function fetchFriendList (param: any) : Promise<any> {
    return http.post('/api/v1/friend/list', param);
}

export function fetchGroupList (param: any) : Promise<any> {
    return http.post('/api/v1/group/list', param);
}

export function fetchFriendApplyList (param: any) : Promise<any> {
    return http.post('/api/v1/friend_apply/list', param);
}

export function fetchMessageList (param: any) : Promise<any> {
    return http.post('/api/v1/message/list', param);
}

export function fetchClientList (param: any) : Promise<any> {
    return http.post('/api/v1/client/list', param);
}

export function fetchAccountDetail (param: any) : Promise<any> {
    return http.post('/api/v1/account/detail', param);
}

export function fetchCreateSession (param: any) : Promise<any> {
    return http.post('/api/v1/session/create', param);
}

export function fetchSendTextMessage (param: any) : Promise<any> {
    return http.post('/api/v1/send_text', param);
}

export function sendAgreeFriendApply (param: any) : Promise<any> {
    return http.post('/api/v1/agree_apply', param);
}