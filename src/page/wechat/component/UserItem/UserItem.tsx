import React from 'react';
import './UserItem.less';

interface Props {
    id: string,
    name: string,
    avatar: string,
    onClick: (id: any, type: string) => void,
    type: string
}

function UserItem (props: Props) {
    return (
        <div className="user-item" onClick={() => props.onClick(props.id, props.type)}>
            <img className="user-item-avatar" src={props.avatar}/>
            <span className="user-item-name">{props.name}</span>
        </div>
    );
}

export default UserItem;