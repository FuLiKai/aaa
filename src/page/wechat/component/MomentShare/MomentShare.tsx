import React, { ChangeEvent } from 'react';
import {} from 'antd';
import Upload from '../Upload/Upload';
import './MomentShare.less';

class MomentShare extends React.Component<{}> {
    state = {
        content: ''
    }
    imgList: Array<string> = []
    handlerUploadChange = (fileList: Array<any>) => {
        console.log(fileList);
        this.imgList = fileList.filter(file => !!file.response).map((file: any) => {
            return file.response.imgUrls[0];
        });
        console.log(this.imgList);
    }
    handlerInputChange = (e: any) => {
        this.setState({
            content: e.target.value
        });
    }
    render() {
        return (
            <div className="monent-share">
                <textarea className="input" onChange={this.handlerInputChange} value={this.state.content}></textarea>
                <Upload onChange={this.handlerUploadChange}></Upload>
            </div>
        );
    }
}

export default MomentShare;