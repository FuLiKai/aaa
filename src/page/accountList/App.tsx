import React from 'react';
// import logo from './logo.svg';
import './App.less';
// import { Button } from 'antd';
import { Row, Col } from 'antd';
import AccountCard from './component/AccountCard/AccountCard';
import accountList from '@/mock/accountList.json';

const App: React.FC = () => {
    return (
        <div className="App">
            <Row gutter={20}
                justify="space-between"
            >
                {
                    accountList.list.map(item => (
                        <Col
                            key={item.ip}
                            span={8}
                        >
                            <AccountCard
                                ip={item.ip}
                                list={item.accountList as any}
                            ></AccountCard>
                        </Col>
                    ))
                }
            </Row>
        </div>
    );
};

export default App;
