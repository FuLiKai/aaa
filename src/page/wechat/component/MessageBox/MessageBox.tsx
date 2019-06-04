import React from 'react';
import './MessageBox.less';

interface Prop {
    messageList: Array<any>
    onScrollToTop: () => any,
    wxId: string
}

class MessageBox extends React.Component<Prop> {
    constructor (props: Prop) {
        super(props);
        this.myRef = React.createRef();
    }
    componentDidMount () {
        this.scrollToBottom();
    }
    componentDidUpdate () {
        this.scrollToBottom();
    }
    handlerScroll = (e: any) => {
        if (e.target.scrollTop === 0) {
            this.props.onScrollToTop();
        }
    }
    myRef: React.RefObject<HTMLObjectElement>;
    scrollToBottom = () => {
        let scroller: any = this.myRef.current;
        scroller.scrollTop = scroller.scrollHeight - scroller.offsetHeight;
    }
    render () {
        let { messageList, wxId } = this.props;
        let list;
        if (Array.isArray(messageList)) {
            list = messageList.map(msg => {
                try {
                    return {
                        ...msg,
                        ...JSON.parse(msg.rawMsg)
                    };
                } catch (error) {
                    return msg;
                }
            });
            console.log(list);
        }
        return (
            <div className="message-box message-scroll-wrapper" onScroll={this.handlerScroll} ref={this.myRef}>
                <div className="message-list">
                    {
                        list && list.map((msg:any) => (
                            <div className={`${msg.fromWxId === wxId? 'self': 'other'} message-item`} key={msg.id} >
                                <img className="message-avatar" src={msg.headImg}/>
                                <div className="message-text-wrapper">
                                    {
                                        (() => {
                                            switch (msg.msgType) {
                                            case 1:
                                                return <pre className="message-text">{msg.content}</pre>;
                                            case 2:
                                                return <img className="message-img" src={msg.picUrl}/>;
                                            default:
                                                return <span>暂不支持此类消息</span>;
                                            }
                                        })()
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default MessageBox;