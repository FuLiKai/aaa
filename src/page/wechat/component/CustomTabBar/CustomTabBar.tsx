import React from 'react';
import { Icon } from 'antd';
import './CustomTabBar.less';

function CustomTabBar (props: {icon: string, style?: any}) {
    return (
        <div className="custom-tab-bar">
            <Icon style={props.style} type={props.icon}></Icon>
        </div>
    );
}

export default CustomTabBar;