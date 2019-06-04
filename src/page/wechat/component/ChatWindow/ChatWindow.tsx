import React from 'react';
import './ChatWindow.less';
import MessageBox from '../MessageBox/MessageBox';
import ChatPannel from '../ChatPannel/ChatPannel';
import { WxMessage } from '@/store/types/state';

interface Prop {
    messageList: Array<any>
    onScrollToTop: () => any
}

class ChatWindow extends React.Component<Prop> {
    render () {
        return (
            <div className="chat-window">
                <MessageBox messageList={this.props.messageList} onScrollToTop={this.props.onScrollToTop}></MessageBox>
                <ChatPannel></ChatPannel>
            </div>
        );
    }
}

export default ChatWindow;