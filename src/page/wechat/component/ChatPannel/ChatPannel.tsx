import React from 'react';
import { Button } from 'antd';
import './ChatPannel.less';
import { createSendTextMessageAction } from '@/store/action';
import { connect } from 'react-redux';
import { State, Target } from '@/store/types/state';

interface Prop {
    target: Target,
    onSend: (param: any) => any
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
        this.props.onSend({
            sessionId: this.props.target.id,
            content: this.state.message
        });
        this.setState({
            message: ''
        });
    }
    render () {
        return (
            <div className="chat-pannel">
                <div className="chat-pannel-header">
                    <Button icon="file-add"></Button>
                </div>
                <div className="chat-pannel-content">
                    <textarea className="chat-pannel-input" onChange={this.handlerTextAreaChange} value={this.state.message}></textarea>
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
        onSend: (param: any) => {
            dispatch(createSendTextMessageAction(param));
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatPannel);