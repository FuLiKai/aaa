import React from 'react';
import { Tabs } from 'antd';
import CustomTabBar from '../CustomTabBar/CustomTabBar';
import ChatItem from '../ChatItem/ChatItem';
import UserItem from '../UserItem/UserItem';
import './SiderTab.less';

interface Prop {
    chatList: Array<{id: number, name: string, msg: string, avatar: string, time: string}>,
    userList: Array<{id: number, name: string, avatar: string}>
}

class SiderTab extends React.Component<Prop> {
    render () {
        const { chatList, userList } = this.props;
        console.log(chatList);
        return (
            <Tabs className="sider-tab" defaultActiveKey="1">
                <Tabs.TabPane key="1" tab={<CustomTabBar icon="message" style={{fontSize: '16px'}}></CustomTabBar>}>
                    {
                        chatList.map(item => (
                            <ChatItem avatar={item.avatar} key={item.id} msg={item.msg} name={item.name} time={item.time}></ChatItem>
                        ))
                    }
                </Tabs.TabPane>
                <Tabs.TabPane key="2" tab={<CustomTabBar icon="user" style={{fontSize: '16px'}}></CustomTabBar>}>
                    <Tabs className="user-tab" defaultActiveKey="1" tabBarStyle={{fontSize: '12px'}}>
                        <Tabs.TabPane key="1" tab={<span style={{fontSize: '12px'}}>好友</span>}>
                            {
                                userList.map(user => (
                                    <UserItem avartar={user.avatar} key={user.id} name={user.name}></UserItem>
                                ))
                            }
                        </Tabs.TabPane>
                        <Tabs.TabPane key="2" tab={<span style={{fontSize: '12px'}}>群聊</span>}>
                        群聊
                        </Tabs.TabPane>
                        <Tabs.TabPane key="3" tab={<span style={{fontSize: '12px'}}>新朋友</span>}>
                        新朋友
                        </Tabs.TabPane>
                    </Tabs>
                </Tabs.TabPane>
            </Tabs>
        );
    }
}

export default SiderTab;