import React from 'react';
import './ChatWindow.less';
import MessageBox from '../MessageBox/MessageBox';
import ChatPannel from '../ChatPannel/ChatPannel';
import { WxMessage } from '@/store/types/state';

interface Prop {
    messageList: Array<any>
    onScrollToTop: () => any,
    wxId: string
}

class ChatWindow extends React.Component<Prop> {
    render () {
        let { messageList, onScrollToTop, wxId } = this.props;
        return (
            <div className="chat-window">
                <MessageBox messageList={messageList} onScrollToTop={onScrollToTop} wxId={wxId}></MessageBox>
                <ChatPannel></ChatPannel>
            </div>
        );
    }
}

export default ChatWindow;