import { BaseAction } from '../types/action';
import { ACTION_GET_FRIEND_APPLY_LIST, ACTION_SET_FRIEND_APPLY_LIST } from '../constant';
import { WxFriendApply } from '../types/state';

export function createGetWxFriendApplyListAction () : BaseAction {
    return {
        type: ACTION_GET_FRIEND_APPLY_LIST
    };
}

export function createSetWxFriendApplyListAction (data: Array<WxFriendApply>) : BaseAction {
    return {
        type: ACTION_SET_FRIEND_APPLY_LIST,
        data
    };
}