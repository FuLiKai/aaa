import React from 'react';
import { Input, List, Avatar, Spin } from 'antd';
import { fetchFriendSearch } from '@/http';
import './Search.less';

class Search extends React.Component<{}> {
    state = {
        data: [],
        loading: false,
        hasMore: true,
        visible: false
    };
    q: string = ''
    scroller: React.RefObject<HTMLObjectElement> = React.createRef()
    handlerInput = (e: any) => {
        this.q = e.target.value;
        if (!this.q) return;
        fetchFriendSearch({
            limit: 20,
            start: 0,
            q: e.target.value
        }).then(res => {
            console.log(res);
            this.setState({
                data: res.list
            });
        }).catch(e => {
            console.error(e);
        });
    }
    handlerFocus = () => {
        this.state.visible || this.setState({
            visible: true
        });
    }
    handlerBlur = () => {
        setTimeout(() => {
            this.state.visible && this.setState({
                visible: false
            });
        }, 200);
    }
    handlerItemClick = () => {
        console.log('aaaaa');
    }
    handlerScroll = () => {
        let scroller: any = this.scroller.current;
        if (scroller.scrollTop >= scroller.scrollHeight - scroller.offsetHeight) {
            console.log('bbbbbb');
        }
    }
    render() {
        let { data, loading, hasMore, visible } = this.state;
        return (
            <div className="search-container">
                <Input.Search className="sider-search" onBlur={this.handlerBlur} onChange={this.handlerInput} onFocus={this.handlerFocus} placeholder="搜索"></Input.Search>
                {
                    <div className={`scroll-container ${visible ? 'visible': 'hidden'}`} onScroll={this.handlerScroll} ref={this.scroller}>
                        <List
                            dataSource={data}
                            renderItem={
                                (item: any, index: number) => {
                                    return (
                                        <List.Item onClick={this.handlerItemClick}>
                                            <List.Item.Meta
                                                avatar={<Avatar src={item.headImg}></Avatar>}
                                                title={item.remarkName || item.nickname}
                                            />
                                        </List.Item>
                                    );
                                }
                            }
                            split={false}
                        >
                        </List>
                    </div>
                }
            </div>
        );
    }
}

export default Search;
