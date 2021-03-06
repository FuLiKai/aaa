import React from 'react';
import { Layout, Input } from 'antd';
import SiderHeader from '../SiderHeader/SiderHeader';
import SiderTab from '../SiderTab/SiderTab';
import chatList from '@/mock/chatList';
import userList from '@/mock/userList';
import './Sider.less';
import { State, WxAccountDetail } from '@/store/types/state';
import { createGetAccountDetailAction } from '@/store/action';
import { getParamValue } from '@/util';
import { connect } from 'react-redux';

let wxId = getParamValue('id');

interface Prop {
    accountDetail: any,
    getAccountDetail: any
}

class Sider extends React.Component<Prop> {
    componentDidMount () {
        this.props.getAccountDetail();
    }
    render () {
        return (
            <Layout.Sider className="sider" width={280}>
                <SiderHeader avatar={this.props.accountDetail.account.headImg} title={this.props.accountDetail.account.nickname}></SiderHeader>
                <Input.Search className="sider-search" placeholder="搜索"></Input.Search>
                <SiderTab></SiderTab>
            </Layout.Sider>
        );
    }
}

function mapStateToProps (state: State) {
    return {
        accountDetail: state.accountDetail
    };
}

function mapDispatchToProps (dispatch: any) {
    return {
        getAccountDetail: () => dispatch(createGetAccountDetailAction({wxId}))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sider);