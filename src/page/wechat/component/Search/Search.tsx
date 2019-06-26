import React from 'react';
import { Input, List, Avatar, Spin } from 'antd';
import { fetchFriendSearch } from '@/http';
import debounce from 'lodash/debounce';
import './Search.less';

interface Prop {
    onClick: (e: any) => any
}

class Search extends React.Component<Prop> {
    state = {
        data: [],
        loading: false,
        visible: false
    };
    query: string = ''
    start: number = 0
    hasMore: boolean = true
    scroller: React.RefObject<HTMLObjectElement> = React.createRef()
    handlerInput = (e: any) => {
        e.persist();
        this.query = e.target.value;
        this.search();
    }
    resetSearch = () => {
        this.start = 0;
        this.hasMore = true;
    }
    handlerFocus = () => {
        setTimeout(() => {
            this.state.visible || this.setState({
                visible: true
            });
        }, 200);
    }
    handlerBlur = () => {
        setTimeout(() => {
            this.state.visible && this.setState({
                visible: false
            });
        }, 200);
    }
    handlerItemClick = (e: any) => {
        this.props.onClick(e.wxId);
    }
    handlerScroll = () => {
        let scroller: any = this.scroller.current;
        if (scroller.scrollTop !== 0 && scroller.scrollTop >= scroller.scrollHeight - scroller.offsetHeight) {
            this.getMore();
        }
    }
    search = debounce(() => {
        this.resetSearch();
        if (!this.query) {
            this.setState({
                data: []
            });
            return;
        }
        this._search(true);
    }, 500)
    getMore = () => {
        let { loading } = this.state;
        if (loading || !this.hasMore) return;
        this._search(false);
    }
    _search = (replace: boolean) => {
        this.setState({
            loading: true
        });
        fetchFriendSearch({
            limit: 20,
            start: this.start,
            q: this.query
        }).then(res => {
            console.log(res);
            this.hasMore = res.list.length !== 0;
            this.start = res.nextId;
            let data = replace ? res.list : [...this.state.data, ...res.list];
            this.setState({
                data,
                loading: false
            });
        }).catch(e => {
            console.error(e);
            this.setState({
                loading: false
            });
        });
    }
    render() {
        let { data, loading, visible } = this.state;
        return (
            <div className="search-container">
                <Input.Search className="sider-search" onBlur={this.handlerBlur} onChange={this.handlerInput} onFocus={this.handlerFocus} placeholder="搜索" spellCheck={false}></Input.Search>
                {
                    <div className={`scroll-container ${visible ? 'visible': 'hidden'}`} onScroll={this.handlerScroll} ref={this.scroller}>
                        <List
                            dataSource={data}
                            renderItem={
                                (item: any) => {
                                    return (
                                        <List.Item onClick={this.handlerItemClick.bind(this, item)}>
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
                        <Spin spinning={loading}></Spin>
                    </div>
                }
            </div>
        );
    }
}

export default Search;
