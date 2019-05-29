import React from 'react';
import './MainHeader.less';

function MainHeader (props: {title: string}) {
    return (
        <div className="main-header">{props.title}</div>
    );
}

export default MainHeader;