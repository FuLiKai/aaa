import React from 'react';
import { Upload, Icon, Modal } from 'antd';
import { uploadImage } from '@/http';
import './Upload.less';

const fr = new FileReader();

interface Prop {
    // onChange: (e: any) => any
}

interface State {
    previewVisible: boolean,
    previewImage: string
}
class Moments extends React.Component<Prop, State> {
    constructor(props: Prop) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: ''
        };
    }
    getBase64 = (file: File) => {
        fr.readAsDataURL(file);
        return new Promise((resolve, reject) => {
            fr.onload = () => {
                resolve(fr.result as string);
            };
            fr.onerror = () => {
                reject(new Error('读取文件失败'));
            };
        });
    }
    handlerPreview = async (e:any) => {
        console.log(e);
        if (!e.preview) {
            e.preview = await this.getBase64(e.originFileObj);
        }
        this.setState({
            previewVisible: true,
            previewImage: e.preview
        });
    }
    handlerChange = (e:any) => {
        console.log(e);
    }
    handleCancel = (e: any) => {
        this.setState({
            previewVisible: false,
            previewImage: ''
        });
    }
    customRequest = (option: any) => {
        console.log(option);
        let fr = new FileReader();
        fr.readAsArrayBuffer(option.file);
        fr.onload = () => {
            uploadImage({
                imgList: [new Uint8Array(fr.result as ArrayBuffer)]
            }, {
                onUploadProgress: (progress: any) => {
                    option.onProgress({ percent: Math.round(progress.loaded / progress.total * 100) }, option.file);
                }
            }).then(res => {
                console.log(res);
                option.onSuccess(res);
            });
        };
    }
    render() {
        let { previewVisible, previewImage } = this.state;
        return (
            <div>
                <Upload
                    customRequest={this.customRequest}
                    listType="picture-card"
                    multiple
                    onChange={this.handlerChange}
                    onPreview={this.handlerPreview}
                >
                    <Icon type="plus" />
                </Upload>
                <Modal footer={null} onCancel={this.handleCancel} visible={previewVisible}>
                    <img alt="图片预览失败" src={previewImage} style={{ width: '100%' }} />
                </Modal>
            </div>
        );
    }
}

export default Moments;