import { BaseAction } from '../types/action';
import { ACTION_GET_FRIEND_LIST, ACTION_SET_FRIEND_LIST } from '../constant';
import { WxFriend } from '../types/state';

export function createGetWxFriendListAction (param: any) : BaseAction {
    return {
        type: ACTION_GET_FRIEND_LIST,
        param
    };
}

export function createSetWxFriendListAction (data: Array<WxFriend>) : BaseAction {
    return {
        type: ACTION_SET_FRIEND_LIST,
        data
    };
}