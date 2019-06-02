import React from 'react';
import { Button } from 'antd';
import './UserDetail.less';

interface Prop {
    userInfo: {
        wxId: string,
        wxAlias: string,
        nickname: string,
        remarkName: string,
        headImg: string,
        sex: number,
        country: string,
        province: string,
        city: string,
        labelId: string
    },
    onClick: (wxId: string) => any
}

function UserDetail (props: Prop) {
    let {
        wxId,
        nickname,
        remarkName,
        headImg,
        sex,
        country,
        province,
        city
    } = props.userInfo;
    return (
        <div className="user-detail">
            <img className="user-detail-avarar" src={headImg}/>
            <div className="user-detail-nickname">
                <span>{remarkName || nickname}</span>
                <span className="user-detail-sex">{sex === 1 ? '男' : sex === 2 ? '女' : ''}</span>
            </div>
            {/* <span className="user-detail-signature">{signature}</span> */}
            <span className="user-detail-alias">{`备注: ${remarkName}`}</span>
            <span className="user-detail-area">{`地区: ${country + province + city}`}</span>
            <Button onClick={() => props.onClick(props.userInfo.wxId)} type="primary">发消息</Button>
        </div>
    );
}

export default UserDetail;