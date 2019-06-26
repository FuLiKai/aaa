import React from 'react';
import { Button } from 'antd';
import './AccountItem.less';

interface Prop {
    account: {
        nickname: string,
        wxId: string,
        wxAlias: string,
        // 1在线 0离线
        status: number,
    }
    onLogin: (wxAlias: string) => any,
    onLogout: (wxAlias: string) => any,
    onDelete: () => any,
    onRestart: (e: any) => any
}

export default class AccountItem extends React.Component<Prop> {
    handlerRestartBtnClick = (e: any) => {
        this.props.onRestart({
            wxId: this.props.account.wxId,
            wxAlias: this.props.account.wxAlias
        });
        e.stopPropagation();
    }
    handlerLoginBtnClick = (e: any) => {
        let { account, onLogout } = this.props;
        if (account.status) {
            onLogout(account.wxAlias);
            e.stopPropagation();
        }
    }
    handlerDeleteBtnClick = (e: any) => {
        this.props.onDelete();
        e.stopPropagation();
    }
    handlerItemClick = () => {
        let { account, onLogin } = this.props;
        onLogin(account.wxAlias);
    }
    render () {
        let { nickname, wxAlias, status } = this.props.account;
        return (
            <div className="account-item" onClick={this.handlerItemClick}>
                <div>
                    <span className="name">{nickname}</span>
                    <span className="alias">{wxAlias}</span>
                </div>
                <div>
                    <Button onClick={this.handlerRestartBtnClick}>重启</Button>
                    <Button onClick={this.handlerLoginBtnClick} type={status ? 'default' : 'primary'}>{status ? '下线' : '上线'}</Button>
                    <Button onClick={this.handlerDeleteBtnClick} type="danger">删除</Button>
                </div>
            </div>
        );
    }
}