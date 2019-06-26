import React from 'react';
import { Card, message } from 'antd';
import AccountItem from '../AccountItem/AccountItem';
import { fetchRestart } from '@/http';

interface Prop {
    ip: string,
    list: []
}

export default class AccountCard extends React.Component<Prop> {
    constructor (props: Prop) {
        super(props);
    }
    handlerLoginBtnClick = (wxAlias: string) => {
        window.open(`./wechat.html?alias=${wxAlias}`);
    }
    handlerLogoutBtnClick = () => {
        message.error('暂不支持下线');
    }
    handlerDeleteBtnClick = () => {
        message.error('暂不支持删除');
    }
    handlerRestartBtnClick = (e: any) => {
        fetchRestart(e).then(res => {
            message.success('重启成功');
        }).catch(e => {
            message.error('重启失败');
        });
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
                                onDelete={this.handlerDeleteBtnClick}
                                onLogin={this.handlerLoginBtnClick}
                                onLogout={this.handlerLogoutBtnClick}
                                onRestart={this.handlerRestartBtnClick}
                            ></AccountItem>
                        </Card.Grid>
                    ))
                }
            </Card>
        );
    }
}