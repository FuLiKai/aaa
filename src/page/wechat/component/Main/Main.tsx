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

let wxId = getParamValue('id');

interface Prop {
    target: any,
    setCurrentTarget: (data: Target) => any
    getMessageList: (sessionId: number) => any
    sessionList: any,
    createSession: (chatId: any) => any
}

class Main extends React.Component<Prop> {
    componentDidUpdate (preProps: Prop) {
        let target = this.props.target;
        let preTarget = preProps.target;
        if (!preTarget) {
            this.getSessionMessageList();
        } else {
            if (preTarget.id !== target.id) {
                this.getSessionMessageList();
            }
        }
    }
    getSessionMessageList = () => {
        let { target, getMessageList } = this.props;
        if (target && target.type === TARGET_TYPE_SESSION) {
            getMessageList(target.id);
        }
    }
    handlerDetailClick = (id: string) => {
        // this.props.setCurrentTarget({
        //     id,
        //     type: TARGET_TYPE_SESSION
        // });
        let session = this.props.sessionList.find((session: any) => session.chatId == id);
        if (session) {
            this.props.setCurrentTarget({
                id: session.sessionId,
                type: TARGET_TYPE_SESSION
            });
        } else {
            console.log('aaaaaaaaaaaaaaaaaaaaaa', id);
            this.props.createSession(id);
        }
    }
    render () {
        let target = this.props.target;
        let title: any;
        if (!target) {
            title = '';
        } else {
            let data = target && target.data;
            title = data.remarkName || data.groupName || data.nickname;
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
                                return <ChatWindow messageList={target.data.messageList}></ChatWindow>;
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
        getMessageList: (sessionId: number) => dispatch(createGetWxMessageListAction({ limit: 200, sessionId })),
        createSession: (chatId: any) => dispatch(createCreateWxSessionAction({wxId, chatId}))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);