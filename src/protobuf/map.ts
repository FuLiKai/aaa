interface map {
    [propName: string]: { request: string, response: string }
}

const pbMap: map = {
    '/api/account/list': {
        request: 'wpb.GetWxAccountListRequest',
        response:'wpb.GetWxAccountListResponse'
    },
    '/api/friend/list': {
        request: 'wpb.GetWxFriendListRequest',
        response:'wpb.GetWxFriendListResponse'
    }
};

export default pbMap;