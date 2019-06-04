export interface WxAccount {
    wxId: string, //微信ID
    wxAlias: string //微信号
    nickname: string //昵称
    remark: string //备注名称
    headImg: string // 头像
    sex: number //性别
    country: string //国籍
    province: string //省份
    city: string //城市
}

export interface WxClient {
    wxId: string,      //微信ID
    wxAlias: string,   // 微信别名
    ipAddr: string,    // ip地址
    version: string,   //版本号
    status: number,   // 在线 离线状态
}

export interface WxAccountDetail {
    account: WxAccount,
    client: WxClient,
}

export interface WxSession {
    sessionId: number,
    wxId: string,
    chatId: string,
    headImg: string,
    nickname: string,
    status: number
}

export interface WxFriend {
    wxId: string,
    wxAlias: string,
    nickname: string,
    remarkName: string,
    headImg: string,
    sex: number,
    country: string,
    province: string,
    city: string,
    labelId: string
}

export interface WxGroup {
    groupId: string,
    groupName: string,
    groupHeadImg: string,
    ownerId: string,
}

export interface WxFriendApply {
    fromWxId: string,
    content: string,
    ticket: string,
    status: number,
    nickname: string,
    headImg: string,
    time: number
}

export interface WxMessage {
    sessionId: number,
    fromWxId: string,
    toWxId?: string,
    msgType: number,
    rawMsg: string,
    id?: number;
    time?: number;
}

export interface Target {
    type: string,
    id: string | number
}

export interface messageMap {
    [propName: number]: Array<WxMessage>
}

export interface LoginInfo {
    wxId: string,
    wxAlias: string
}

export interface State {
    accountDetail: WxAccountDetail,
    currentTarget: Target,
    friendApplyList: Array<WxFriendApply>,
    friendList: Array<WxFriend>,
    groupList: Array<WxGroup>,
    messageMap: messageMap,
    loginInfo: LoginInfo
    sessionList: Array<WxSession>
}