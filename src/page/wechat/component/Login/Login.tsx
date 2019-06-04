import React from 'react';
import { Button } from 'antd';
import { fetchQrCode, fetchLoginStatus } from '@/http';
import { getParamValue } from '@/util';
import { Uint8ArryToString } from '@/util';
import './Login.less';
import { connect } from 'react-redux';
import { LoginInfo } from '@/store/types/state';
import { createSetLoginlAction } from '@/store/action';

let wxAlias = getParamValue('alias');

interface Prop {
    onLogin?: () => any,
    setLoginInfo: (loginInfo: LoginInfo) => any
}

interface State {
    isLogin: boolean
    src: string | undefined,
    isValid: boolean
}

class Login extends React.Component<Prop, State> {
    constructor (props: Prop) {
        super(props);
        this.state = {
            isLogin: false,
            src: undefined,
            isValid: true
        };
    }
    componentDidMount () {
        this.getQrCode();
        fetchLoginStatus().then(res => {
            if (res.status === 2) {
                clearInterval(this.timer);
                this.props.setLoginInfo({
                    wxAlias,
                    wxId: res.wxId
                });
                this.setState({
                    isLogin: true
                });
            } else {
                this.waitForLogin();
            }
        });
    }
    timer: number = 0
    getQrCode = () => {
        return fetchQrCode().then(res => {
            let src = 'data:image/png;base64,' + btoa(Uint8ArryToString(res.code));
            this.setState({
                src,
                isValid: true
            });
        });
    }
    handlerGetQrCodeBtnClick = () => {
        this.getQrCode().then(() => {
            this.waitForLogin();
        });
    }
    renderQrCode = () => {
        return (
            <div className="qrcode-box">
                <img alt="生成二维码中，请稍后" className="qrcode" src={this.state.src}/>
                {
                    this.state.isValid || <span className="invalid">二维码已过期</span>
                }
                <div className="btn-box">
                    <Button onClick={this.handlerGetQrCodeBtnClick} style={{marginRight: '20px'}}>获取二维码</Button>
                    <Button>复制二维码</Button>
                </div>
            </div>
        );
    }
    waitForLogin = () => {
        clearInterval(this.timer);
        let time = 240;
        let i = 0;
        this.timer = setInterval(() => {
            i += 1;
            if (i >= time) {
                clearInterval(this.timer);
                this.setState({
                    isValid: false
                });
            }
            fetchLoginStatus().then(res => {
                if (res.status === 2) {
                    clearInterval(this.timer);
                    this.props.setLoginInfo({
                        wxAlias,
                        wxId: res.wxId
                    });
                    this.setState({
                        isLogin: true
                    });
                }
            });

        }, 1000) as any;
    }
    render () {
        return (
            <div className="login">
                {
                    this.state.isLogin ? this.props.children : this.renderQrCode()
                }
            </div>
        );
    }
}

function mapDispatchToProps (dispatch: any) {
    return {
        setLoginInfo: (loginInfo: LoginInfo) => dispatch(createSetLoginlAction(loginInfo))
    };
}

export default connect(null, mapDispatchToProps)(Login);