import React from 'react';
import './MessageBox.less';
import { Icon, Spin, Modal } from 'antd';
import msgType from './msgType';

interface Prop {
    messageList: Array<any>
    onScrollToTop: () => any,
    wxId: string
}

class MessageBox extends React.Component<Prop> {
    static defaultProps = {
        messageList: []
    }
    constructor (props: Prop) {
        super(props);
        this.myRef = React.createRef();
    }
    state = {
        previewVisible: false,
        previewImage: ''
    }
    componentDidMount () {
        this.scrollToBottom();
    }
    componentDidUpdate (prevProps: Prop) {
        if (prevProps.messageList.length === this.props.messageList.length) return;
        this.scrollToBottom();
    }
    handlerScroll = (e: any) => {
        if (e.target.scrollTop === 0) {
            this.props.onScrollToTop();
        }
    }
    handleCancel = () => {
        this.setState({
            previewVisible: false,
            previewImage: ''
        });
    }
    handlerPreview = (url: string) => {
        this.setState({
            previewVisible: true,
            previewImage: url
        });
    }
    myRef: React.RefObject<HTMLObjectElement>;
    scrollToBottom = () => {
        let scroller: any = this.myRef.current;
        scroller.scrollTop = scroller.scrollHeight - scroller.offsetHeight;
    }
    render () {
        let { messageList, wxId } = this.props;
        let { previewImage, previewVisible } = this.state;
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
        }
        return (
            <Spin spinning={false}>
                <div className="message-box message-scroll-wrapper" onScroll={this.handlerScroll} ref={this.myRef}>
                    <div className="message-list">
                        {
                            list && list.map((msg:any) => (
                                <div className={`${msg.fromWxId === wxId? 'self': 'other'} message-item`} key={msg.id} >
                                    {
                                        msg.msgType !== msgType.SYS && <img className="message-avatar" src={msg.headImg}/>
                                    }
                                    {
                                        (() => {
                                            switch (msg.msgType) {
                                            case msgType.TEXT:
                                                return (
                                                    <div className="message-text-wrapper">
                                                        <pre className="message-text">{msg.content}</pre>
                                                    </div>
                                                );
                                            case msgType.IMG_OLD:
                                            case msgType.IMG:
                                                return <img className="message-img" onClick={this.handlerPreview.bind(this, msg.picUrl)} src={msg.picUrl}/>;
                                            case msgType.SYS:
                                                return <span className="message-sys" dangerouslySetInnerHTML={{__html: msg.content}}></span>;
                                            default:
                                                return (
                                                    <div className="message-text-wrapper">
                                                        <span>暂不支持此类消息</span>
                                                    </div>
                                                );
                                            }
                                        })()
                                    }
                                    {
                                        msg.id < 0 && msg.msgType !== msgType.SYS && <Icon style={{color: 'red', fontSize: '16px', marginTop: '12px'}} theme="filled" type="info-circle"/>
                                    }
                                </div>
                            ))
                        }
                    </div>
                    <Modal footer={null} onCancel={this.handleCancel} visible={previewVisible}>
                        <img alt="图片预览失败" src={previewImage} style={{ width: '100%' }} />
                    </Modal>
                </div>
            </Spin>
        );
    }
}

export default MessageBox;