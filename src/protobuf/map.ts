interface map {
    [propName: string]: { request: string, response: string }
}

const pbMap: map = {
    '/api/v1/login_qrcode': {
        request: 'wpb.GetLoginQrcodeRequest',
        response:'wpb.GetLoginQrcodeResponse'
    },
    '/api/v1/login_status': {
        request: 'wpb.GetLoginStatusRequest',
        response:'wpb.GetLoginStatusResponse'
    },
    '/api/v1/client/list': {
        request: 'wpb.GetWxClientListRequest',
        response:'wpb.GetWxClientListResponse'
    },
    '/api/v1/session/list': {
        request: 'wpb.GetWxSessionListRequest',
        response:'wpb.GetWxSessionListResponse'
    },
    '/api/v1/friend/list': {
        request: 'wpb.GetWxFriendListRequest',
        response:'wpb.GetWxFriendListResponse'
    },
    '/api/v1/group/list': {
        request: 'wpb.GetWxGroupListRequest',
        response:'wpb.GetWxGroupListResponse'
    },
    '/api/v1/friend_apply/list': {
        request: 'wpb.GetWxFriendApplyListRequest',
        response:'wpb.GetWxFriendApplyListResponse'
    },
    '/api/v1/message/list': {
        request: 'wpb.GetWxMessageListRequest',
        response:'wpb.GetWxMessageListResponse'
    },
    '/api/v1/account/detail': {
        request: 'wpb.GetAccountDetailRequest',
        response:'wpb.GetAccountDetailResponse'
    },
    '/api/v1/session/create': {
        request: 'wpb.CreateSessionRequest',
        response:'wpb.CreateSessionResponse'
    },
    '/api/v1/send_text': {
        request: 'wpb.SendTextRequest',
        response:'wpb.SendTextResponse'
    },
    '/api/v1/agree_apply': {
        request: 'wpb.AgreeFriendApplyRequest',
        response:'wpb.AgreeFriendResponse'
    }
};

export default pbMap;