import React from 'react';
import { Tabs } from 'antd';
import CustomTabBar from '../CustomTabBar/CustomTabBar';
import ChatItem from '../ChatItem/ChatItem';
import UserItem from '../UserItem/UserItem';
import FriendApplyItem from '../FriendApplyItem/FriendApplyItem';
import './SiderTab.less';
import { State, WxSession, WxFriend, WxGroup, WxFriendApply, Target } from '@/store/types/state';
import { createGetWxSessionListAction,
    createGetWxFriendApplyListAction,
    createGetWxFriendListAction,
    createGetWxGroupListAction,
    createSetCurrentTargetAction,
    createAllowWxFriendApplyAction
} from '@/store/action';
import { getParamValue } from '@/util';
import { connect } from 'react-redux';
import { TARGET_TYPE_SESSION, TARGET_TYPE_FRIEND, TARGET_TYPE_GROUP } from '@/store/constant';

let wxId = getParamValue('id');

interface Prop {
    sessionList: Array<WxSession>,
    friendList: Array<WxFriend>,
    groupList: Array<WxGroup>,
    friendApplyList: Array<WxFriendApply>,
    getSessionList: () => any,
    getFriendList: () => any,
    getGroupList: () => any,
    getFriendApplyList: () => any,
    setCurrentTarget: (data: Target) => any,
    replyAllowFriendApply: (toWxId: any, ticket: any) => any
}

class SiderTab extends React.Component<Prop> {
    componentDidMount () {
        let { getSessionList, getFriendList, getGroupList, getFriendApplyList } = this.props;
        getSessionList();
        getFriendList();
        getGroupList();
        getFriendApplyList();
    }
    handlerChatItemClick = (id: any) => {
        this.props.setCurrentTarget({
            id,
            type: TARGET_TYPE_SESSION
        });
    }
    handlerUserItemClick = (id: any, type: string) => {
        console.log(id, type);
        this.props.setCurrentTarget({ id, type });
    }
    handlerFriendApplyAcceptClick = (id: any, ticket: any) => {
        console.log(id, ticket);
        this.props.replyAllowFriendApply(id, ticket);
    }
    render () {
        let { sessionList, friendList, groupList, friendApplyList } = this.props;
        console.log(sessionList);
        return (
            <Tabs className="sider-tab" defaultActiveKey="1">
                <Tabs.TabPane key="1" tab={<CustomTabBar icon="message" style={{fontSize: '16px'}}></CustomTabBar>}>
                    <div className="scroll-box">
                        {
                            sessionList.map(item => (
                                <ChatItem avatar={item.headImg} id={item.sessionId} key={item.sessionId} msg={''} name={item.nickname} onClick={this.handlerChatItemClick} time={''}></ChatItem>
                            ))
                        }
                    </div>
                </Tabs.TabPane>
                <Tabs.TabPane key="2" tab={<CustomTabBar icon="user" style={{fontSize: '16px'}}></CustomTabBar>}>
                    <Tabs className="user-tab" defaultActiveKey="1" tabBarStyle={{fontSize: '12px'}}>
                        <Tabs.TabPane key="1" tab={<span style={{fontSize: '12px'}}>好友</span>}>
                            <div className="scroll-box">
                                {
                                    friendList.map(item => (
                                        <UserItem avatar={item.headImg} id={item.wxId} key={item.wxId} name={item.remarkName || item.nickname} onClick={this.handlerUserItemClick} type={TARGET_TYPE_FRIEND}></UserItem>
                                    ))
                                }
                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane key="2" tab={<span style={{fontSize: '12px'}}>群聊</span>}>
                            <div className="scroll-box">
                                {
                                    groupList.map(item => (
                                        <UserItem avatar={item.groupHeadImg} id={item.groupId} key={item.groupId} name={item.groupName} onClick={this.handlerUserItemClick} type={TARGET_TYPE_GROUP}></UserItem>
                                    ))
                                }
                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane key="3" tab={<span style={{fontSize: '12px'}}>新朋友</span>}>
                            <div className="scroll-box">
                                {
                                    friendApplyList.map(item => (
                                        <FriendApplyItem avatar={''} content={item.content} id={item.fromWxId} key={item.fromWxId} name={'zzz'} onClick={this.handlerFriendApplyAcceptClick} ticket={item.ticket}></FriendApplyItem>
                                    ))
                                }
                            </div>
                        </Tabs.TabPane>
                    </Tabs>
                </Tabs.TabPane>
            </Tabs>
        );
    }
}

function mapStateToProps (state: State) {
    let { sessionList, friendList, groupList, friendApplyList } = state;
    return { sessionList, friendList, groupList, friendApplyList };
}

function mapDispatchToProps (dispatch: any) {
    return {
        getSessionList: () => dispatch(createGetWxSessionListAction({wxId, limit: 5000})),
        getFriendList: () => dispatch(createGetWxFriendListAction({wxId, limit: 5000})),
        getGroupList: () => dispatch(createGetWxGroupListAction({wxId, limit: 5000})),
        getFriendApplyList: () => dispatch(createGetWxFriendApplyListAction({ wxId, limit: 5000 })),
        setCurrentTarget: (data: Target) => dispatch(createSetCurrentTargetAction(data)),
        replyAllowFriendApply: (fromWxId: any, ticket: any) => dispatch(createAllowWxFriendApplyAction({ fromWxId, ticket }))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SiderTab);