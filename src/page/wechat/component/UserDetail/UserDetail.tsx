import React from 'react';
import { Button } from 'antd';
import './UserDetail.less';

interface Prop {
    userInfo: {
        avatar: string,
        sex: boolean,
        nickname: string,
        alias: string,
        area: string,
        signature: string,
        userType: number
    }
}

function UserDetail (props: Prop) {
    let {
        avatar,
        sex,
        nickname,
        alias,
        area,
        signature
    } = props.userInfo;
    return (
        <div className="user-detail">
            <img className="user-detail-avarar" src={avatar}/>
            <div className="user-detail-nickname">
                <span>{alias || nickname}</span>
                <span className="user-detail-sex">{sex ? '男' : '女'}</span>
            </div>
            <span className="user-detail-signature">{signature}</span>
            <span className="user-detail-alias">{`备注: ${alias}`}</span>
            <span className="user-detail-area">{`地区: ${area}`}</span>
            <Button type="primary">发消息</Button>
        </div>
    );
}

export default UserDetail;