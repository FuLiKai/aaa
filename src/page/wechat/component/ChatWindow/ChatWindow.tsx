import React from 'react';
import './ChatWindow.less';
import MessageBox from '../MessageBox/MessageBox';
import ChatPannel from '../ChatPannel/ChatPannel';
import messageList from '@/mock/messageList';
class ChatWindow extends React.Component<any> {
    render () {
        return (
            <div className="chat-window">
                <MessageBox messageList={messageList} title="美少女"></MessageBox>
                <ChatPannel></ChatPannel>
            </div>
        );
    }
}

export default ChatWindow;