import React from 'react';
import './Moments.less';
import Upload from '../Upload/Upload';

interface Prop {
    // onChange: (e: any) => any
}

class Moments extends React.Component<Prop> {
    constructor(props: Prop) {
        super(props);
    }
    render() {
        return (
            <div>
                <Upload></Upload>
            </div>
        );
    }
}

export default Moments;