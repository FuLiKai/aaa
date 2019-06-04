import React from 'react';
import './App.less';
import { Row, Col } from 'antd';
import AccountCard from './component/AccountCard/AccountCard';
import accountList from '@/mock/accountList.json';
import { fetchClientList } from '@/http';

class App extends React.Component<Object, { clients: any }> {
    constructor (props: any) {
        super(props);
        this.state = {
            clients: {
                list: []
            }
        };
    }
    componentDidMount () {
        fetchClientList({
            start: 0,
            limit: 1000
        }).then(res => {
            this.setState({
                clients: res
            });
        });
    }
    render () {
        return (
            <div className="App">
                <Row gutter={20}
                    justify="space-between"
                >
                    {
                        this.state.clients.list.map((item: any) => (
                            <Col
                                key={item.ipAddr}
                                span={8}
                            >
                                <AccountCard
                                    ip={item.ipAddr}
                                    list={item.clients as any}
                                ></AccountCard>
                            </Col>
                        ))
                    }
                </Row>
            </div>
        );
    }
}

export default App;
