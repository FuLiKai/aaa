interface httpPbMap {
    // request: 请求protobuffer; response: 返回protobuffer; wrap: 是否需要包装token
    [propName: string]: { request: string, response: string, wrap: boolean }
}

const pbMap: httpPbMap = {
    '/api/v1/login_qrcode': {
        request: 'wpb.GetLoginQrcodeRequest',
        response:'wpb.GetLoginQrcodeResponse',
        wrap: true
    },
    '/api/v1/login_status': {
        request: 'wpb.GetLoginStatusRequest',
        response:'wpb.GetLoginStatusResponse',
        wrap: true
    },
    '/api/v1/client/list': {
        request: 'wpb.GetWxClientListRequest',
        response:'wpb.GetWxClientListResponse',
        wrap: true
    },
    '/api/v1/session/list': {
        request: 'wpb.GetWxSessionListRequest',
        response:'wpb.GetWxSessionListResponse',
        wrap: true
    },
    '/api/v1/friend/list': {
        request: 'wpb.GetWxFriendListRequest',
        response:'wpb.GetWxFriendListResponse',
        wrap: true
    },
    '/api/v1/group/list': {
        request: 'wpb.GetWxGroupListRequest',
        response:'wpb.GetWxGroupListResponse',
        wrap: true
    },
    '/api/v1/friend_apply/list': {
        request: 'wpb.GetWxFriendApplyListRequest',
        response:'wpb.GetWxFriendApplyListResponse',
        wrap: true
    },
    '/api/v1/message/list': {
        request: 'wpb.GetWxMessageListRequest',
        response:'wpb.GetWxMessageListResponse',
        wrap: true
    },
    '/api/v1/account/detail': {
        request: 'wpb.GetAccountDetailRequest',
        response:'wpb.GetAccountDetailResponse',
        wrap: true
    },
    '/api/v1/session/create': {
        request: 'wpb.CreateSessionRequest',
        response:'wpb.CreateSessionResponse',
        wrap: true
    },
    '/api/v1/send_text': {
        request: 'wpb.SendTextRequest',
        response:'wpb.SendTextResponse',
        wrap: true
    },
    '/api/v1/send_img': {
        request: 'wpb.SendImageRequest',
        response:'wpb.SendImageResponse',
        wrap: true
    },
    '/api/v1/agree_apply': {
        request: 'wpb.AgreeFriendApplyRequest',
        response:'wpb.AgreeFriendApplyResponse',
        wrap: true
    },
    '/api/v1/upload': {
        request: 'wpb.UploadImageRequest',
        response:'wpb.UploadImageResponse',
        wrap: true
    },
    '/api/v1/friend/search': {
        request: 'wpb.SearchWxFriendListRequest',
        response:'wpb.SearchWxFriendListResponse',
        wrap: true
    },
    '/api/v1/client/restart': {
        request: 'wpb.RestartWxClientRequest',
        response:'wpb.RestartWxClientResponse',
        wrap: false
    }
};

export default pbMap;


interface wsPbMap {
    [propName: number]: string
}
export const cmdPbMap: wsPbMap =  {
    2: 'wpb.ReportNewMsg',
    4: 'wpb.ReportSysMsg'
};