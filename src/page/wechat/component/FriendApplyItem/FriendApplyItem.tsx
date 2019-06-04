import React from 'react';
import './FriendApplyItem.less';
import { Button } from 'antd';

interface Props {
    id: string,
    name: string,
    avatar: string,
    onClick: (id: any, type: string) => void,
    ticket: any,
    content: any
}

function FriendApplyItem (props: Props) {
    return (
        <div className="friend-apply-item">
            <img className="friend-apply-item-avatar" src={props.avatar}/>
            <div className="friend-apply-item-text-box">
                <span className="friend-apply-item-name">{props.name}</span>
                <span className="friend-apply-item-msg">{props.content}</span>
            </div>
            <div className="friend-apply-item-btn-box">
                <Button onClick={() => props.onClick(props.id, props.ticket)} size="small" type="primary">接受</Button>
            </div>
        </div>
    );
}

export default FriendApplyItem;