import React from 'react';
import { Button } from 'antd';
import './ChatPannel.less';

class ChatPannel extends React.Component<{}> {
    render () {
        return (
            <div className="chat-pannel">
                <div className="chat-pannel-header">
                    <Button icon="file-add"></Button>

                </div>
                <div className="chat-pannel-content">
                    <textarea className="chat-pannel-input"></textarea>
                </div>
                <div className="chat-pannel-bottom">
                    <Button>发送</Button>
                </div>
            </div>
        );
    }
}

export default ChatPannel;