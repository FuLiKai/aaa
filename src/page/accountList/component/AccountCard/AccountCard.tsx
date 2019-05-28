import React from 'react';
import {Card, Button} from 'antd';
import AccountItem from '../AccountItem/AccountItem';

interface Prop {
    ip: string,
    list: []
}
// import accountList from '@/mock/accountList.json';

export default class AccountCard extends React.Component<Prop> {
    hanlderLoginBtnClick = () => {
        console.log('hanlderLoginBtnClick');
    }
    hanlderDeleteBtnClick = () => {
        console.log('hanlderDeleteBtnClick');
    }
    handlerAddBtnClick = () => {
        console.log('handlerAddBtnClick');
    }
    render () {
        let {ip, list} = this.props;
        return (
            <Card
                bodyStyle={{padding: '12px', height: '300px', overflow: 'auto'}}
                extra={<Button onClick={this.handlerAddBtnClick} type="primary">新增</Button>}
                hoverable
                title={ip}
            >
                {
                    list.map((item: any) => (
                        <Card.Grid key={item.account.id}
                            style={{width: '100%', padding: '10px'}}
                        >
                            <AccountItem
                                account={item.account}
                                onDelete={this.hanlderDeleteBtnClick}
                                onLogin={this.hanlderLoginBtnClick}
                                onLogout={this.hanlderLoginBtnClick}
                            ></AccountItem>
                        </Card.Grid>
                    ))
                }
            </Card>
        );
    }
}