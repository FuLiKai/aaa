import React from 'react';
import { Card, Button, Modal } from 'antd';
import AccountItem from '../AccountItem/AccountItem';
import { fetchQrCode, fetchLoginStatus } from '@/http';
import { Uint8ArryToString } from '@/util';

interface Prop {
    ip: string,
    list: []
}
// import accountList from '@/mock/accountList.json';

export default class AccountCard extends React.Component<Prop> {
    constructor (props: Prop) {
        super(props);
    }
    hanlderLoginBtnClick = (wxAlias: string) => {
        // this.showModal();
        window.open(`./wechat.html?alias=${wxAlias}`);
    }
    hanlderLogoutBtnClick = () => {
        alert('暂不支持下线');
    }
    hanlderDeleteBtnClick = () => {
        alert('暂不支持删除');
    }
    render () {
        let {ip, list} = this.props;
        return (
            <Card
                bodyStyle={{padding: '12px', height: '300px', overflow: 'auto'}}
                hoverable
                title={ip}
            >
                {
                    list.map((item: any) => (
                        <Card.Grid key={item.wxId || item.wxAlias}
                            style={{width: '100%', padding: '10px'}}
                        >
                            <AccountItem
                                account={item}
                                onDelete={this.hanlderDeleteBtnClick}
                                onLogin={this.hanlderLoginBtnClick}
                                onLogout={this.hanlderLogoutBtnClick}
                            ></AccountItem>
                        </Card.Grid>
                    ))
                }
            </Card>
        );
    }
}