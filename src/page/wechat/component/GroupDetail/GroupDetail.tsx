import React from 'react';
import { Button } from 'antd';
import './GroupDetail.less';

interface Prop {
    groupInfo: {
        groupId: string,
        groupName: string,
        groupHeadImg: string,
        ownerId: string
    }
    onClick: (groupId: string) => any
}

function GroupDetail (props: Prop) {
    let {
        groupId,
        groupName,
        groupHeadImg
    } = props.groupInfo;
    return (
        <div className="group-detail">
            <img className="group-detail-avarar" src={groupHeadImg}/>
            <div className="group-detail-nickname">
                <span>{groupName}</span>
            </div>
            <Button onClick={() => props.onClick(props.groupInfo.groupId)} type="primary">发消息</Button>
        </div>
    );
}

export default GroupDetail;