import React from 'react';
import { Tabs } from 'antd';
import CustomTabBar from '../CustomTabBar/CustomTabBar';
import ChatItem from '../ChatItem/ChatItem';
import UserItem from '../UserItem/UserItem';
import FriendApplyItem from '../FriendApplyItem/FriendApplyItem';
import Moments from '../Moments/Moments';
import './SiderTab.less';
import { State, WxSession, WxFriend, WxGroup, WxFriendApply, Target, WxAccountDetail } from '@/store/types/state';
import { createGetWxSessionListAction,
    createGetWxFriendApplyListAction,
    createGetWxFriendListAction,
    createGetWxGroupListAction,
    createSetCurrentTargetAction,
    createAllowWxFriendApplyAction
} from '@/store/action';
import { connect } from 'react-redux';
import { TARGET_TYPE_SESSION, TARGET_TYPE_FRIEND, TARGET_TYPE_GROUP } from '@/store/constant';

interface Prop {
    currentTarget: Target
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

interface ownState {
    tabIndex1: string,
    tabIndex2: string
}

class SiderTab extends React.Component<Prop, ownState> {
    constructor (props: Prop) {
        super(props);
        this.state = {
            tabIndex1: '1',
            tabIndex2: '21'
        };
    }
    componentDidMount () {
        let { getSessionList, getFriendList, getGroupList, getFriendApplyList } = this.props;
        getSessionList();
        getFriendList();
        getGroupList();
        getFriendApplyList();
    }
    UNSAFE_componentWillReceiveProps (nextProps: Prop) {
        if (this.props.currentTarget) {
            if (this.props.currentTarget.type !== nextProps.currentTarget.type) {
                switch (nextProps.currentTarget.type) {
                case TARGET_TYPE_SESSION:
                    this.setState({
                        tabIndex1: '1'
                    });
                    break;
                case TARGET_TYPE_FRIEND:
                    this.setState({
                        tabIndex1: '2',
                        tabIndex2: '21'
                    });
                    break;
                case TARGET_TYPE_GROUP:
                    this.setState({
                        tabIndex1: '2',
                        tabIndex2: '22'
                    });
                    break;
                default:
                    break;
                }
            }
        }
    }
    handlerChatItemClick = (id: any) => {
        this.props.setCurrentTarget({
            id,
            type: TARGET_TYPE_SESSION
        });
    }
    handlerUserItemClick = (id: any, type: string) => {
        this.props.setCurrentTarget({ id, type });
    }
    handlerFriendApplyAcceptClick = (id: any, ticket: any) => {
        this.props.replyAllowFriendApply(id, ticket);
    }
    handlerTab1Change = (key: any) => {
        this.setState({
            tabIndex1: key
        });
    }
    handlerTab2Change = (key: any) => {
        this.setState({
            tabIndex2: key
        });
    }
    render () {
        let { sessionList, friendList, groupList, friendApplyList } = this.props;
        let { tabIndex1, tabIndex2 } = this.state;
        return (
            <Tabs activeKey={tabIndex1} className="sider-tab" onChange={this.handlerTab1Change}>
                <Tabs.TabPane key="1" tab={<CustomTabBar icon="message" style={{fontSize: '16px'}}></CustomTabBar>}>
                    <div className="scroll-box">
                        {
                            sessionList.map(item => (
                                <ChatItem avatar={item.headImg} id={item.sessionId} key={item.sessionId} msg={''} name={item.nickname} onClick={this.handlerChatItemClick} status={item.status} time={''}></ChatItem>
                            ))
                        }
                    </div>
                </Tabs.TabPane>
                <Tabs.TabPane key="2" tab={<CustomTabBar icon="user" style={{fontSize: '16px'}}></CustomTabBar>}>
                    <Tabs activeKey={tabIndex2} className="user-tab" onChange={this.handlerTab2Change} tabBarStyle={{fontSize: '12px'}}>
                        <Tabs.TabPane key="21" tab={<span style={{fontSize: '12px'}}>好友</span>}>
                            <div className="scroll-box">
                                {
                                    friendList.map(item => (
                                        <UserItem avatar={item.headImg} id={item.wxId} key={item.wxId} name={item.remarkName || item.nickname} onClick={this.handlerUserItemClick} type={TARGET_TYPE_FRIEND}></UserItem>
                                    ))
                                }
                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane key="22" tab={<span style={{fontSize: '12px'}}>群聊</span>}>
                            <div className="scroll-box">
                                {
                                    groupList.map(item => (
                                        <UserItem avatar={item.groupHeadImg} id={item.groupId} key={item.groupId} name={item.groupName} onClick={this.handlerUserItemClick} type={TARGET_TYPE_GROUP}></UserItem>
                                    ))
                                }
                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane key="23" tab={<span style={{fontSize: '12px'}}>新朋友</span>}>
                            <div className="scroll-box">
                                {
                                    friendApplyList.map(item => (
                                        <FriendApplyItem avatar={item.headImg} content={item.content} id={item.fromWxId} key={item.fromWxId} name={item.nickname} onClick={this.handlerFriendApplyAcceptClick} status={item.status} ticket={item.ticket}></FriendApplyItem>
                                    ))
                                }
                            </div>
                        </Tabs.TabPane>
                    </Tabs>
                </Tabs.TabPane>
                <Tabs.TabPane key="3" tab={<i className="iconfont icon-pengyouquan"></i>}>
                    <Moments></Moments>
                </Tabs.TabPane>
            </Tabs>
        );
    }
}

function mapStateToProps (state: State) {
    let { currentTarget, sessionList, friendList, groupList, friendApplyList } = state;
    return { currentTarget, sessionList, friendList, groupList, friendApplyList };
}

function mapDispatchToProps (dispatch: any) {
    return {
        getSessionList: () => dispatch(createGetWxSessionListAction({limit: 5000})),
        getFriendList: () => dispatch(createGetWxFriendListAction({limit: 5000})),
        getGroupList: () => dispatch(createGetWxGroupListAction({limit: 5000})),
        getFriendApplyList: () => dispatch(createGetWxFriendApplyListAction({limit: 5000 })),
        setCurrentTarget: (data: Target) => dispatch(createSetCurrentTargetAction(data)),
        replyAllowFriendApply: (fromWxId: any, ticket: any) => dispatch(createAllowWxFriendApplyAction({ fromWxId, ticket }))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SiderTab);