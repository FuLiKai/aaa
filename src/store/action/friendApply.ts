import { BaseAction } from '../types/action';
import { ACTION_GET_FRIEND_APPLY_LIST, ACTION_SET_FRIEND_APPLY_LIST, ACTION_ALLOW_FRIEND_APPLY } from '../constant';
import { WxFriendApply } from '../types/state';

export function createGetWxFriendApplyListAction (param: any) : BaseAction {
    return {
        type: ACTION_GET_FRIEND_APPLY_LIST,
        param
    };
}

export function createSetWxFriendApplyListAction (data: Array<WxFriendApply>) : BaseAction {
    return {
        type: ACTION_SET_FRIEND_APPLY_LIST,
        data
    };
}

export function createAllowWxFriendApplyAction (param: any) : BaseAction {
    return {
        type: ACTION_ALLOW_FRIEND_APPLY,
        param
    };
}