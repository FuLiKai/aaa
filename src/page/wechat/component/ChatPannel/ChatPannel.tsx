import React from 'react';
import { Button } from 'antd';
import './ChatPannel.less';
import { createSendTextMessageAction, createSendImageMessageAction } from '@/store/action';
import { connect } from 'react-redux';
import { State, Target } from '@/store/types/state';
import { StringToUint8Array } from '@/util';

interface Prop {
    target: Target,
    sendTextMsg: (param: any) => any,
    sendImageMsg: (param: any) => any
}
interface ownState {
    message: any
}

class ChatPannel extends React.Component<Prop, ownState> {
    constructor (props: Prop) {
        super(props);
        this.state = {
            message: ''
        };
    }
    handlerTextAreaChange = (e: any) => {
        this.setState({
            message: e.target.value
        });
    }
    handlerSendBtnClick = () => {
        if (!this.state.message) return;
        this.props.sendTextMsg({
            sessionId: this.props.target.id,
            content: this.state.message
        });
        this.setState({
            message: ''
        });
    }
    handlerPaste = (e: any) => {
        let clipboardData = e.clipboardData;
        if (clipboardData.items){
            let  items = clipboardData.items;
            let blob: any = null;
            for (let i = 0, len = items.length; i < len; i++) {
                if (items[i].type.indexOf('image') !== -1) {
                    blob = items[i].getAsFile();
                }
            }
            if (!blob) return;
            let fs = new FileReader();
            fs.readAsBinaryString(blob);
            fs.onloadend = () => {
                this.props.sendImageMsg({
                    sessionId: this.props.target.id,
                    imgName: blob.name,
                    imgData: StringToUint8Array(fs.result as string)
                });
            };
        }
    }
    render () {
        return (
            <div className="chat-pannel">
                <div className="chat-pannel-header">
                    <Button icon="file-add"></Button>
                </div>
                <div className="chat-pannel-content">
                    <textarea className="chat-pannel-input" onChange={this.handlerTextAreaChange} onPaste={this.handlerPaste} value={this.state.message}></textarea>
                </div>
                <div className="chat-pannel-bottom">
                    <Button onClick={this.handlerSendBtnClick}>发送</Button>
                </div>
            </div>
        );
    }
}

function mapStateToProps (state: State) {
    return {
        target: state.currentTarget
    };
}

function mapDispatchToProps (dispatch: any) {
    return {
        sendTextMsg: (param: any) => {
            dispatch(createSendTextMessageAction(param));
        },
        sendImageMsg: (param: any) => {
            dispatch(createSendImageMessageAction(param));
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatPannel);