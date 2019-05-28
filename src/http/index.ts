import http from './http';

interface Param {
    cmdId: number;
    wxid?: string;
    seq?: number;
    data?: any;
}

export function getAccountList (param: Param) : Promise<any> {
    return http.post('/api/account/list', param);
}
