import React from 'react';
import { Layout } from 'antd';
import MainHeader from '../MainHeader/MainHeader';
import ChatWindow from '../ChatWindow/ChatWindow';
import UserDetail from '../UserDetail/UserDetail';
import GroupDetail from '../GroupDetail/GroupDetail';
import { connect } from 'react-redux';
import { State, Target, WxMessage } from '@/store/types/state';
import { TARGET_TYPE_SESSION, TARGET_TYPE_FRIEND, TARGET_TYPE_GROUP } from '@/store/constant';
import './Main.less';
import { createSetCurrentTargetAction, createGetWxMessageListAction, createCreateWxSessionAction, createMergeWxMessageListAction } from '@/store/action';
import createWebSocket from '@/ws';
import { random } from '@/util';

interface Prop {
    target: any,
    loginInfo: any,
    setCurrentTarget: (data: Target) => any
    getMessageList: (param: any, replace: boolean) => any
    sessionList: any,
    createSession: (chatId: any) => any,
    mergeMessage: (data: any, sessionId: any, isNew: boolean) => any
}

class Main extends React.Component<Prop> {
    componentDidMount () {
        let ws = createWebSocket('ws://47.98.131.186:8000/ws/v1');
        ws.send({
            cmdId: 1,
            ...this.props.loginInfo
        });
        ws.onMessage(this.handlerWsMsg);
    }
    componentDidUpdate (preProps: Prop) {
        let target = this.props.target;
        let preTarget = preProps.target;
        if (!preTarget) {
            this.getSessionMessageList(true, false);
        } else {
            if (preTarget.id !== target.id) {
                this.getSessionMessageList(false, true);
            }
        }
    }
    getSessionMessageList = (replace: boolean = true, isNew: boolean = true) => {
        let { target, getMessageList } = this.props;
        if (target && target.type === TARGET_TYPE_SESSION) {
            let param = {
                limit: 50,
                isNew,
                sessionId: target.data.sessionId
            };
            getMessageList(param, replace);
        }
    }
    handlerDetailClick = (id: string) => {
        let session = this.props.sessionList.find((session: any) => session.chatId == id);
        if (session) {
            this.props.setCurrentTarget({
                id: session.sessionId,
                type: TARGET_TYPE_SESSION
            });
        } else {
            this.props.createSession(id);
        }
    }
    handlerScrollToTop = () => {
        this.getSessionMessageList(false, false);
    }
    handlerWsMsg = (msg: any): any => {
        let data = msg.data;
        let { target, mergeMessage } = this.props;
        console.log(msg);
        switch (msg.cmdId) {
        case 2: {
            if (target && target.type === TARGET_TYPE_SESSION && target.id == data.sessionId) {
                this.getSessionMessageList(false, true);
            }
            break;
        }
        case 4: {
            let msg = {
                id: random(-10, -99999999),
                sessionId: data.sessionId,
                msgType: -1,
                rawMsg: JSON.stringify({content: data.content })
            };
            mergeMessage([msg], data.sessionId, true);
            break;
        }
        default:
            break;
        }

    }
    render () {
        let { target, loginInfo } = this.props;
        let title: any;
        if (!target) {
            title = '';
        } else {
            let data = target && target.data;
            title = data && (data.remarkName || data.groupName || data.nickname);
        }

        return (
            <Layout.Content>
                <MainHeader title={title}></MainHeader>
                {
                    (() => {
                        if (!target) {
                            return <div className="empty">未选择聊天</div>;
                        } else {
                            switch (target.type) {
                            case TARGET_TYPE_SESSION:
                                return <ChatWindow messageList={target.data.messageList} onScrollToTop={this.handlerScrollToTop} wxId={loginInfo.wxId}></ChatWindow>;
                            case TARGET_TYPE_FRIEND:
                                return <UserDetail onClick={this.handlerDetailClick} userInfo={target.data}></UserDetail>;
                            case TARGET_TYPE_GROUP:
                                return <GroupDetail groupInfo={target.data} onClick={this.handlerDetailClick}></GroupDetail>;
                            default:
                                return null;
                            }
                        }

                    })()
                }
            </Layout.Content>
        );
    }
}

function getTarget (state: State) {
    if (!state.currentTarget || !state.currentTarget.id) return null;
    let data;
    let { type, id } = state.currentTarget;
    switch (type) {
    case TARGET_TYPE_SESSION:
        data = {
            ...state.sessionList.find(session => session.sessionId === id),
            messageList: state.messageMap[id as number]
        };
        break;
    case TARGET_TYPE_FRIEND:
        data = state.friendList.find(friend => friend.wxId === id);
        break;
    case TARGET_TYPE_GROUP:
        data = state.groupList.find(group => group.groupId === id);
        break;
    default:
        data = null;
        break;
    }

    return { type, id, data };
}

function mapStateToProps (state: State) {
    return {
        target: getTarget(state),
        sessionList: state.sessionList,
        loginInfo: state.loginInfo
    };
}

function mapDispatchToProps (dispatch: any) {
    return {
        setCurrentTarget: (data: Target) => dispatch(createSetCurrentTargetAction(data)),
        getMessageList: (param: any, replace: boolean) => dispatch(createGetWxMessageListAction(param, replace)),
        createSession: (chatId: any) => dispatch(createCreateWxSessionAction({chatId})),
        mergeMessage: (data: any, sessionId: any, isNew: boolean) => dispatch(createMergeWxMessageListAction(data, sessionId, isNew))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);