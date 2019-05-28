import React from 'react';
import { Button } from 'antd';
import './AccountItem.less';

interface Prop {
    account: {
        nickname: string,
        wxAlias: string,
        login: boolean,
        avatar?: string
    }
    onLogin: () => any,
    onLogout: () => any,
    onDelete: () => any
}

export default class AccountItem extends React.Component<Prop> {
    handlerLoginBtnClick = () => {
        this.props.account.login ? this.props.onLogin() : this.props.onLogout();
    }
    handlerDeleteBtnClick = () => {
        this.props.onDelete();
    }
    render () {
        let { nickname, wxAlias, login } = this.props.account;
        return (
            <div className="account-item">
                <div>
                    <span>{nickname}</span>
                    <span>{wxAlias}</span>
                </div>
                <div>
                    <Button onClick={this.handlerLoginBtnClick} type="primary">{login ? '下线' : '上线'}</Button>
                    <Button onClick={this.handlerDeleteBtnClick} type="danger">删除</Button>
                </div>
            </div>
        );
    }
}