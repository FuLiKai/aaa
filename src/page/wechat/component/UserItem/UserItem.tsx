import React from 'react';
import './UserItem.less';

function UserItem (props: {avartar: string, name: string}) {
    return (
        <div className="user-item">
            <img className="user-item-avatar" src={props.avartar}/>
            <span className="user-item-name">{props.name}</span>
        </div>
    );
}

export default UserItem;