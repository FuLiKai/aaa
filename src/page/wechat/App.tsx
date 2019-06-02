import React from 'react';
import './App.less';
import { Layout } from 'antd';
import { Provider } from 'react-redux';
import store from '@/store';
import Sider from './component/Sider/Sider';
import Main from './component/Main/Main';
import Login from './component/Login/Login';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Login>
                <Layout className="App">
                    <Sider></Sider>
                    <Main></Main>
                </Layout>
            </Login>
        </Provider>
    );
};

export default App;
