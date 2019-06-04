import React from 'react';
import { Badge } from 'antd';
import './ChatItem.less';

interface Props {
    id: number,
    name: string,
    msg: string,
    avatar: string,
    time: string
    onClick: (id: any) => void,
    status: number
}

function ChatItem (props: Props) {
    return (
        <div className="chat-item" onClick={() => props.onClick(props.id)}>
            <Badge count={props.status} dot>
                <img className="chat-item-avatar" src={props.avatar}/>
            </Badge>
            <div className="chat-item-text-box">
                <span className="chat-item-name">{props.name}</span>
                <span className="chat-item-msg">{props.msg}</span>
            </div>
            <span className="chat-item-time">{props.time}</span>
        </div>
    );
}

export default ChatItem;