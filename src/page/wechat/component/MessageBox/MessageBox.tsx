import React from 'react';
import './MessageBox.less';
import messageList from '@/mock/messageList';

interface Prop {
    title: string,
    messageList: Array<any>
}
let id = 6;
class MessageBox extends React.Component<Prop, {list: Array<any>}> {
    constructor (props: Prop) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            list: messageList
        };
    }
    handerTestClick = () => {
        this.setState(preState => {
            return {
                list: [...preState.list, {
                    id: id++,
                    text: '今天去哪吃饭1',
                    avatar: '',
                    self: false
                }]
            };
        }, () => {
            let scroller: any = this.myRef.current;
            scroller.scrollTop = scroller.scrollHeight - scroller.offsetHeight;
            console.dir(this.myRef.current);
        });
    }
    myRef: React.RefObject<HTMLObjectElement>;
    render () {
        return (
            <div className="message-box message-scroll-wrapper">
                <div className="message-list" ref={this.myRef}>
                    {
                        this.state.list.map((msg:any) => (
                            <div className={`${msg.self? 'self': 'other'} message-item`} key={msg.id} >
                                <img className="message-avatar" src={msg.avatar}/>
                                <div className="message-text-wrapper">
                                    <pre className="message-text">{msg.text}</pre>
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