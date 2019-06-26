import React from 'react';
import { Layout } from 'antd';
import SiderHeader from '../SiderHeader/SiderHeader';
import SiderTab from '../SiderTab/SiderTab';
import Search from '../Search/Search';
import './Sider.less';
import { State, WxAccountDetail, Target } from '@/store/types/state';
import { createGetAccountDetailAction, createCreateWxSessionAction, createSetCurrentTargetAction } from '@/store/action';
import { connect } from 'react-redux';
import { TARGET_TYPE_SESSION } from '@/store/constant';

interface Prop {
    accountDetail: any,
    getAccountDetail: any,
    setCurrentTarget: (data: Target) => any
    sessionList: any,
    createSession: (chatId: any) => any,
}

class Sider extends React.Component<Prop> {
    componentDidMount () {
        this.props.getAccountDetail();
    }
    handlerSearchItemClick = (id: any) => {
        let session = this.props.sessionList.find((session: any) => session.chatId == id);
        if (session) {
            this.props.setCurrentTarget({
                id: session.sessionId,
                type: TARGET_TYPE_SESSION
            });
        } else {
            this.props.createSession(id);
        }
    }
    render () {
        return (
            <Layout.Sider className="sider" width={280}>
                <SiderHeader avatar={this.props.accountDetail.account.headImg} title={this.props.accountDetail.account.nickname}></SiderHeader>
                <Search onClick={this.handlerSearchItemClick}></Search>
                <SiderTab></SiderTab>
            </Layout.Sider>
        );
    }
}

function mapStateToProps (state: State) {
    return {
        accountDetail: state.accountDetail,
        sessionList: state.sessionList
    };
}

function mapDispatchToProps (dispatch: any) {
    return {
        getAccountDetail: () => dispatch(createGetAccountDetailAction({})),
        setCurrentTarget: (data: Target) => dispatch(createSetCurrentTargetAction(data)),
        createSession: (chatId: any) => dispatch(createCreateWxSessionAction({chatId}))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sider);