import React from 'react';
import { Layout } from 'antd';
import MainHeader from '../MainHeader/MainHeader';
import ChatWindow from '../ChatWindow/ChatWindow';
import UserDetail from '../UserDetail/UserDetail';
import GroupDetail from '../GroupDetail/GroupDetail';
import { connect } from 'react-redux';
import { State, Target } from '@/store/types/state';
import { TARGET_TYPE_SESSION, TARGET_TYPE_FRIEND, TARGET_TYPE_GROUP } from '@/store/constant';
import './Main.less';
import { createSetCurrentTargetAction, createGetWxMessageListAction, createCreateWxSessionAction } from '@/store/action';
import { getParamValue } from '@/util';
import createWebSocket from '@/ws';

let wxId = getParamValue('id');
let shortWxId = getParamValue('alias');

interface Prop {
    target: any,
    setCurrentTarget: (data: Target) => any
    getMessageList: (param: any, replace: boolean) => any
    sessionList: any,
    createSession: (chatId: any) => any
}

class Main extends React.Component<Prop> {
    componentDidMount () {
        let ws = createWebSocket('ws://192.168.1.161:8000/ws/v1');
        ws.send({
            cmdId: 1,
            wxId,
            shortWxId
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
            let messageList = target.data.messageList;
            let start = 0;
            if (Array.isArray(target.data.messageList) && target.data.messageList.length > 0) {
                if (isNew) {
                    start = messageList[messageList.length - 1].id;
                } else {
                    start = messageList[0].id;
                }
            }
            let param = {
                limit: 50,
                isNew,
                start,
                sessionId: target.data.sessionId
            };
            console.log(target.data, param);
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
    handlerWsMsg = (data: any): any => {
        let { target } = this.props;
        console.log(data);
        if (target) {
            if (target.type === TARGET_TYPE_SESSION && target.id == data.sessionId) {
                this.getSessionMessageList(false, true);
            }
        }
    }
    render () {
        let target = this.props.target;
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
                                return <ChatWindow messageList={target.data.messageList} onScrollToTop={this.handlerScrollToTop}></ChatWindow>;
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
    if (!state.currentTarget) return null;
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
        sessionList: state.sessionList
    };
}

function mapDispatchToProps (dispatch: any) {
    return {
        setCurrentTarget: (data: Target) => dispatch(createSetCurrentTargetAction(data)),
        getMessageList: (param: any, replace: boolean) => dispatch(createGetWxMessageListAction(param, replace)),
        createSession: (chatId: any) => dispatch(createCreateWxSessionAction({wxId, chatId}))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);