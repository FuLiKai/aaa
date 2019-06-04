import React from 'react';
import { Card, Button, Modal } from 'antd';
import AccountItem from '../AccountItem/AccountItem';
import { fetchQrCode, fetchLoginStatus } from '@/http';
import { Uint8ArryToString } from '@/util';

interface Prop {
    ip: string,
    list: []
}
interface State {
    src: string | undefined,
    openModal: boolean
}
// import accountList from '@/mock/accountList.json';

export default class AccountCard extends React.Component<Prop, State> {
    constructor (props: Prop) {
        super(props);
        this.state = {
            src: undefined,
            openModal: false
        };
        this.timer = 0;
    }
    componentWillUnmount () {
        clearInterval(this.timer);
    }
    timer: number
    hanlderLoginBtnClick = () => {
        // this.showModal();
        window.open('/wechat.html?alias=1213&id=wxid_70fb7ete9j0622');
    }
    showModal = () => {
        fetchQrCode({
            data: {
                wxId: '1213'
            }
        }).then(res => {
            let src = 'data:image/png;base64,' + btoa(Uint8ArryToString(res.code));
            this.setState({src, openModal: true});
            this.waitForLogin();
        });
    }
    hideModal = () => {
        clearInterval(this.timer);
        this.setState({
            openModal: false
        });
    }
    waitForLogin = () => {
        clearInterval(this.timer);
        let time = 240;
        let i = 0;
        this.timer = setInterval(() => {
            i += 2;
            if (i >= time) {
                clearInterval(this.timer);
            }
            fetchLoginStatus({
                data: {
                    wxId: '1213'
                }
            }).then(res => {
                if (res.status === 2) {
                    clearInterval(this.timer);
                    // let form = document.createElement('form');
                    // form.action = '/wechat.html/1213';
                    // form.target = '_blank';
                    // form.method = 'post';
                    // // localStorage.setItem('wxid')
                    // document.body.appendChild(form);
                    // form.submit();
                    let a = document.createElement('a');
                    a.href = '/wechat.html';
                    a.target = '_blank';
                    document.body.appendChild(a);
                    a.click();
                }
            });

        }, 2000) as any;
    }
    hanlderDeleteBtnClick = () => {
        console.log('hanlderDeleteBtnClick');
        window.open('/wechat.html?id=1213');
    }
    handlerAddBtnClick = () => {
        console.log('handlerAddBtnClick');
    }
    render () {
        let {ip, list} = this.props;
        return (
            <div>
                <Modal
                    bodyStyle={{textAlign: 'center'}}
                    closable={false}
                    footer={null}
                    onCancel={this.hideModal}
                    visible={this.state.openModal}
                    width={300}
                >
                    <img src={this.state.src} style={{marginBottom: '20px'}}/>
                    <Button onClick={this.showModal} style={{marginRight: '20px'}}>获取二维码</Button>
                    <Button>复制二维码</Button>
                </Modal>
                <Card
                    bodyStyle={{padding: '12px', height: '300px', overflow: 'auto'}}
                    extra={<Button onClick={this.handlerAddBtnClick} type="primary">新增</Button>}
                    hoverable
                    title={ip}
                >
                    {
                        list.map((item: any) => (
                            <Card.Grid key={item.wxId}
                                style={{width: '100%', padding: '10px'}}
                            >
                                <AccountItem
                                    account={item}
                                    onDelete={this.hanlderDeleteBtnClick}
                                    onLogin={this.hanlderLoginBtnClick}
                                    onLogout={this.hanlderLoginBtnClick}
                                ></AccountItem>
                            </Card.Grid>
                        ))
                    }
                </Card>
            </div>
        );
    }
}