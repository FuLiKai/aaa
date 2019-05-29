import React from 'react';
import './SiderHeader.less';

function Header (props: {title: string, avatar: string}) {
    return (
        <div className="header">
            <img className="header-avatar" src={props.avatar}/>
            <h3 className="header-title">{props.title}</h3>
        </div>
    );
}

export default Header;