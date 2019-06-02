import React from 'react';
import './ChatWindow.less';
import MessageBox from '../MessageBox/MessageBox';
import ChatPannel from '../ChatPannel/ChatPannel';
// import messageList from '@/mock/messageList';
import { WxMessage } from '@/store/types/state';

class ChatWindow extends React.Component<{messageList: Array<WxMessage>}> {
    render () {
        return (
            <div className="chat-window">
                <MessageBox messageList={this.props.messageList}></MessageBox>
                <ChatPannel></ChatPannel>
            </div>
        );
    }
}

export default ChatWindow;