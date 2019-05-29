import React from 'react';
import './ChatItem.less';

interface Props {
    name: string,
    msg: string,
    avatar: string,
    time: string
}
function ChatItem (props: Props) {
    return (
        <div className="chat-item">
            <img className="chat-item-avatar" src={props.avatar}/>
            <div className="chat-item-text-box">
                <span className="chat-item-name">{props.name}</span>
                <span className="chat-item-msg">{props.msg}</span>
            </div>
            <span className="chat-item-time">{props.time}</span>
        </div>
    );
}

export default ChatItem;