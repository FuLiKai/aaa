import React from 'react';
import './App.less';
import { Layout, Input } from 'antd';
import SiderHeader from './component/SiderHeader/SiderHeader';
import SiderTab from './component/SiderTab/SiderTab';
import MainHeader from './component/MainHeader/MainHeader';
// import ChatWindow from './component/ChatWindow/ChatWindow';
import UserDetail from './component/UserDetail/UserDetail';
import chatList from '@/mock/chatList';
import userList from '@/mock/userList';

const App: React.FC = () => {
    return (
        <Layout className="App">
            <Layout.Sider className="sider" width={280}>
                <SiderHeader avatar="https://img2.woyaogexing.com/2019/05/28/457c89678be34b0fb453ff84eb9c8127!400x400.jpeg" title="小斌"></SiderHeader>
                <Input.Search className="sider-search" placeholder="搜索"></Input.Search>
                <SiderTab chatList={chatList} userList={userList}></SiderTab>
            </Layout.Sider>
            <Layout.Content>
                <MainHeader title="美少女"></MainHeader>
                {/* <ChatWindow></ChatWindow> */}
                <UserDetail userInfo={{
                    avatar: 'string',
                    sex: true,
                    nickname: 'string',
                    alias: 'string',
                    area: 'string',
                    signature: 'string',
                    userType: 1
                }}
                ></UserDetail>
            </Layout.Content>
        </Layout>
    );
};

export default App;
