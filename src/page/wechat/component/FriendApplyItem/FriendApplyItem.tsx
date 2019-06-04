import React from 'react';
import './FriendApplyItem.less';
import { Button } from 'antd';

interface Props {
    id: string,
    name: string,
    avatar: string,
    onClick: (id: any, type: string) => void,
    ticket: string,
    content: string,
    status: number
}

function FriendApplyItem (props: Props) {
    return (
        <div className="friend-apply-item">
            <img className="friend-apply-item-avatar" src={props.avatar}/>
            <div className="friend-apply-item-text-box">
                <span className="friend-apply-item-name">{props.name}</span>
                <span className="friend-apply-item-msg">{props.content}</span>
            </div>
            {
                (() => {
                    switch (props.status) {
                    case 0:
                        return  <Button onClick={() => props.onClick(props.id, props.ticket)} size="small" type="primary">接受</Button>;
                    case 1:
                        return  <span>已添加</span>;
                    case 2:
                        return  <span>已忽略</span>;
                    default:
                        break;
                    }
                })()
            }
        </div>
    );
}

export default FriendApplyItem;