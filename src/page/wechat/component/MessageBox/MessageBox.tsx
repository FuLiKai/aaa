import React from 'react';
import './MessageBox.less';
import { getParamValue } from '@/util';

let wxId = getParamValue('id');

interface Prop {
    messageList: Array<any>
}
let id = 6;
class MessageBox extends React.Component<Prop> {
    constructor (props: Prop) {
        super(props);
        this.myRef = React.createRef();
        // this.state = {
        //     list: messageList
        // };
    }
    componentDidMount () {
        this.scrollToBottom();
    }
    componentDidUpdate () {
        this.scrollToBottom();
    }
    // handerTestClick = () => {
    //     this.setState(preState => {
    //         return {
    //             list: [...preState.list, {
    //                 id: id++,
    //                 text: '今天去哪吃饭1',
    //                 avatar: '',
    //                 self: false
    //             }]
    //         };
    //     }, () => {
    //         this.scrollToBottom();
    //     });
    // }
    myRef: React.RefObject<HTMLObjectElement>;
    scrollToBottom = () => {
        let scroller: any = this.myRef.current;
        scroller.scrollTop = scroller.scrollHeight - scroller.offsetHeight;
    }
    render () {
        let { messageList } = this.props;
        let list;
        if (messageList) {
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
            <div className="message-box message-scroll-wrapper" ref={this.myRef}>
                <div className="message-list">
                    {
                        list && list.map((msg:any, index: number) => (
                            <div className={`${msg.fromWxId === wxId? 'self': 'other'} message-item`} key={index} >
                                <img className="message-avatar" src={msg.avatar}/>
                                <div className="message-text-wrapper">
                                    {
                                        msg.msgType === 1 ? <pre className="message-text">{msg.content}</pre> : <span>暂不支持此类消息</span>
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