import React from 'react';
import './Moments.less';
import MomentShare from '../MomentShare/MomentShare';

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
                <MomentShare></MomentShare>
            </div>
        );
    }
}

export default Moments;