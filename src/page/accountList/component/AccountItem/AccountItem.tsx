import React from 'react';
import { Button } from 'antd';
import './AccountItem.less';

interface Prop {
    account: {
        nickname: string,
        wxAlias: string,
        // 1在线 0离线
        status: number,
    }
    onLogin: (wxAlias: string) => any,
    onLogout: (wxAlias: string) => any,
    onDelete: () => any
}

export default class AccountItem extends React.Component<Prop> {
    handlerLoginBtnClick = () => {
        let { account, onLogin, onLogout } = this.props;
        account.status ? onLogout(account.wxAlias) : onLogin(account.wxAlias);
    }
    handlerDeleteBtnClick = () => {
        this.props.onDelete();
    }
    render () {
        let { nickname, wxAlias, status } = this.props.account;
        return (
            <div className="account-item">
                <div>
                    <span>{nickname}</span>
                    <span>{wxAlias}</span>
                </div>
                <div>
                    <Button onClick={this.handlerLoginBtnClick} type="primary">{status ? '下线' : '上线'}</Button>
                    <Button onClick={this.handlerDeleteBtnClick} type="danger">删除</Button>
                </div>
            </div>
        );
    }
}