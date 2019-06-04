/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from 'protobufjs/light';

const $root = ($protobuf.roots['default'] || ($protobuf.roots['default'] = new $protobuf.Root()))
    .addJSON({
        wpb: {
            nested: {
                BaseRequest: {
                    fields: {
                        cmdId: {
                            type: 'int32',
                            id: 1
                        },
                        wxAlias: {
                            type: 'string',
                            id: 2
                        },
                        wxId: {
                            type: 'string',
                            id: 3
                        },
                        seq: {
                            type: 'int64',
                            id: 4
                        },
                        data: {
                            type: 'bytes',
                            id: 5
                        }
                    }
                },
                BaseResponse: {
                    fields: {
                        ret: {
                            type: 'int32',
                            id: 1
                        },
                        errMsg: {
                            type: 'string',
                            id: 2
                        },
                        cmdId: {
                            type: 'int32',
                            id: 3
                        },
                        seq: {
                            type: 'int64',
                            id: 4
                        },
                        data: {
                            type: 'bytes',
                            id: 5
                        }
                    }
                },
                ModUserInfo: {
                    fields: {
                        userName: {
                            type: 'string',
                            id: 1
                        },
                        alias: {
                            type: 'string',
                            id: 2
                        },
                        nickName: {
                            type: 'string',
                            id: 3
                        },
                        remarkName: {
                            type: 'string',
                            id: 4
                        },
                        headImg: {
                            type: 'string',
                            id: 5
                        },
                        sex: {
                            type: 'int32',
                            id: 6
                        },
                        country: {
                            type: 'string',
                            id: 7
                        },
                        province: {
                            type: 'string',
                            id: 8
                        },
                        city: {
                            type: 'string',
                            id: 9
                        },
                        label: {
                            type: 'string',
                            id: 10
                        }
                    }
                },
                ReportNewMsg: {
                    fields: {
                        sessionId: {
                            type: 'int32',
                            id: 1
                        }
                    }
                },
                WxAccount: {
                    fields: {
                        wxId: {
                            type: 'string',
                            id: 1
                        },
                        wxAlias: {
                            type: 'string',
                            id: 2
                        },
                        nickname: {
                            type: 'string',
                            id: 3
                        },
                        remark: {
                            type: 'string',
                            id: 4
                        },
                        headImg: {
                            type: 'string',
                            id: 5
                        },
                        sex: {
                            type: 'int32',
                            id: 6
                        },
                        country: {
                            type: 'string',
                            id: 7
                        },
                        province: {
                            type: 'string',
                            id: 8
                        },
                        city: {
                            type: 'string',
                            id: 9
                        }
                    }
                },
                WxClient: {
                    fields: {
                        wxId: {
                            type: 'string',
                            id: 1
                        },
                        wxAlias: {
                            type: 'string',
                            id: 2
                        },
                        ipAddr: {
                            type: 'string',
                            id: 3
                        },
                        version: {
                            type: 'string',
                            id: 4
                        },
                        status: {
                            type: 'int32',
                            id: 5
                        }
                    }
                },
                WxFriend: {
                    fields: {
                        wxId: {
                            type: 'string',
                            id: 1
                        },
                        wxAlias: {
                            type: 'string',
                            id: 2
                        },
                        nickname: {
                            type: 'string',
                            id: 3
                        },
                        remarkName: {
                            type: 'string',
                            id: 4
                        },
                        headImg: {
                            type: 'string',
                            id: 5
                        },
                        sex: {
                            type: 'int32',
                            id: 6
                        },
                        country: {
                            type: 'string',
                            id: 7
                        },
                        province: {
                            type: 'string',
                            id: 8
                        },
                        city: {
                            type: 'string',
                            id: 9
                        },
                        labelId: {
                            type: 'string',
                            id: 10
                        }
                    }
                },
                WxGroup: {
                    fields: {
                        groupId: {
                            type: 'string',
                            id: 1
                        },
                        groupName: {
                            type: 'string',
                            id: 2
                        },
                        groupHeadImg: {
                            type: 'string',
                            id: 3
                        },
                        ownerId: {
                            type: 'string',
                            id: 4
                        }
                    }
                },
                WxFriendApply: {
                    fields: {
                        fromWxId: {
                            type: 'string',
                            id: 1
                        },
                        content: {
                            type: 'string',
                            id: 2
                        },
                        ticket: {
                            type: 'string',
                            id: 3
                        },
                        status: {
                            type: 'int32',
                            id: 4
                        }
                    }
                },
                WxAccountDetail: {
                    fields: {
                        account: {
                            type: 'WxAccount',
                            id: 1
                        },
                        client: {
                            type: 'WxClient',
                            id: 2
                        }
                    }
                },
                WxClients: {
                    fields: {
                        ipAddr: {
                            type: 'string',
                            id: 1
                        },
                        clients: {
                            rule: 'repeated',
                            type: 'WxClient',
                            id: 2
                        }
                    }
                },
                GetWxAccountListRequest: {
                    fields: {
                        start: {
                            type: 'int32',
                            id: 1
                        },
                        limit: {
                            type: 'int32',
                            id: 2
                        }
                    }
                },
                GetWxAccountListResponse: {
                    fields: {
                        list: {
                            rule: 'repeated',
                            type: 'WxAccountDetail',
                            id: 1
                        },
                        nextId: {
                            type: 'int32',
                            id: 2
                        }
                    }
                },
                GetWxFriendListRequest: {
                    fields: {
                        start: {
                            type: 'int32',
                            id: 1
                        },
                        limit: {
                            type: 'int32',
                            id: 2
                        }
                    }
                },
                GetWxFriendListResponse: {
                    fields: {
                        list: {
                            rule: 'repeated',
                            type: 'WxFriend',
                            id: 1
                        },
                        nextId: {
                            type: 'int32',
                            id: 2
                        }
                    }
                },
                GetWxGroupListRequest: {
                    fields: {
                        start: {
                            type: 'int32',
                            id: 1
                        },
                        limit: {
                            type: 'int32',
                            id: 2
                        }
                    }
                },
                GetWxGroupListResponse: {
                    fields: {
                        list: {
                            rule: 'repeated',
                            type: 'WxGroup',
                            id: 1
                        },
                        nextId: {
                            type: 'int32',
                            id: 2
                        }
                    }
                },
                GetWxFriendApplyListRequest: {
                    fields: {
                        start: {
                            type: 'int32',
                            id: 1
                        },
                        limit: {
                            type: 'int32',
                            id: 2
                        }
                    }
                },
                GetWxFriendApplyListResponse: {
                    fields: {
                        list: {
                            rule: 'repeated',
                            type: 'WxFriendApply',
                            id: 1
                        },
                        nextId: {
                            type: 'int32',
                            id: 2
                        }
                    }
                },
                GetWxClientListRequest: {
                    fields: {
                        start: {
                            type: 'int32',
                            id: 1
                        },
                        limit: {
                            type: 'int32',
                            id: 2
                        }
                    }
                },
                GetWxClientListResponse: {
                    fields: {
                        list: {
                            rule: 'repeated',
                            type: 'WxClients',
                            id: 1
                        },
                        nextId: {
                            type: 'int32',
                            id: 2
                        }
                    }
                },
                AgreeFriendApplyRequest: {
                    fields: {
                        fromWxId: {
                            type: 'string',
                            id: 1
                        },
                        ticket: {
                            type: 'string',
                            id: 2
                        }
                    }
                },
                AgreeFriendApplyResponse: {
                    fields: {}
                },
                GetAccountDetailRequest: {
                    fields: {}
                },
                GetAccountDetailResponse: {
                    fields: {
                        detail: {
                            type: 'WxAccountDetail',
                            id: 1
                        }
                    }
                },
                GetLoginQrcodeRequest: {
                    fields: {}
                },
                GetLoginQrcodeResponse: {
                    fields: {
                        code: {
                            type: 'bytes',
                            id: 1
                        }
                    }
                },
                GetLoginStatusRequest: {
                    fields: {}
                },
                GetLoginStatusResponse: {
                    fields: {
                        status: {
                            type: 'int32',
                            id: 1
                        },
                        wxId: {
                            type: 'string',
                            id: 2
                        }
                    }
                },
                CheckLoginQrcodeRequest: {
                    fields: {}
                },
                CheckLoginQrcodeResponse: {
                    fields: {
                        wxId: {
                            type: 'string',
                            id: 1
                        },
                        status: {
                            type: 'int32',
                            id: 2
                        },
                        nickName: {
                            type: 'string',
                            id: 3
                        },
                        headImg: {
                            type: 'string',
                            id: 4
                        },
                        expiredTime: {
                            type: 'int32',
                            id: 5
                        }
                    }
                },
                WxSession: {
                    fields: {
                        sessionId: {
                            type: 'int32',
                            id: 1
                        },
                        wxId: {
                            type: 'string',
                            id: 2
                        },
                        chatId: {
                            type: 'string',
                            id: 3
                        },
                        headImg: {
                            type: 'string',
                            id: 4
                        },
                        nickname: {
                            type: 'string',
                            id: 5
                        },
                        status: {
                            type: 'int32',
                            id: 6
                        }
                    }
                },
                WxMessage: {
                    fields: {
                        sessionId: {
                            type: 'int32',
                            id: 1
                        },
                        fromWxId: {
                            type: 'string',
                            id: 2
                        },
                        toWxId: {
                            type: 'string',
                            id: 3
                        },
                        msgType: {
                            type: 'int32',
                            id: 4
                        },
                        rawMsg: {
                            type: 'string',
                            id: 5
                        },
                        id: {
                            type: 'int32',
                            id: 6
                        }
                    }
                },
                GetWxSessionListRequest: {
                    fields: {
                        start: {
                            type: 'int32',
                            id: 1
                        },
                        limit: {
                            type: 'int32',
                            id: 2
                        }
                    }
                },
                GetWxSessionListResponse: {
                    fields: {
                        list: {
                            rule: 'repeated',
                            type: 'WxSession',
                            id: 1
                        },
                        nextId: {
                            type: 'int32',
                            id: 2
                        }
                    }
                },
                GetWxMessageListRequest: {
                    fields: {
                        start: {
                            type: 'int32',
                            id: 1
                        },
                        limit: {
                            type: 'int32',
                            id: 2
                        },
                        sessionId: {
                            type: 'int32',
                            id: 3
                        },
                        isNew: {
                            type: 'bool',
                            id: 4
                        }
                    }
                },
                GetWxMessageListResponse: {
                    fields: {
                        list: {
                            rule: 'repeated',
                            type: 'WxMessage',
                            id: 1
                        }
                    }
                },
                SendTextRequest: {
                    fields: {
                        sessionId: {
                            type: 'int32',
                            id: 1
                        },
                        content: {
                            type: 'string',
                            id: 2
                        }
                    }
                },
                SendTextResponse: {
                    fields: {}
                },
                SendImageRequest: {
                    fields: {
                        sessionId: {
                            type: 'int32',
                            id: 1
                        },
                        imgName: {
                            type: 'string',
                            id: 2
                        },
                        imgData: {
                            type: 'bytes',
                            id: 3
                        }
                    }
                },
                SendImageResponse: {
                    fields: {}
                },
                SendLinkRequest: {
                    fields: {
                        fromWxId: {
                            type: 'string',
                            id: 1
                        },
                        toWxId: {
                            type: 'string',
                            id: 2
                        },
                        title: {
                            type: 'string',
                            id: 3
                        },
                        desc: {
                            type: 'string',
                            id: 4
                        },
                        imgUrl: {
                            type: 'string',
                            id: 5
                        },
                        url: {
                            type: 'string',
                            id: 6
                        }
                    }
                },
                SendLinkResponse: {
                    fields: {}
                },
                CreateSessionRequest: {
                    fields: {
                        chatId: {
                            type: 'string',
                            id: 1
                        }
                    }
                },
                CreateSessionResponse: {
                    fields: {
                        session: {
                            type: 'WxSession',
                            id: 1
                        }
                    }
                }
            }
        }
    });

export { $root as default };
