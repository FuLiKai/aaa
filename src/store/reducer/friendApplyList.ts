import { WxFriendApply } from '../types/state';
import { BaseAction  } from '../types/action';
import { ACTION_SET_FRIEND_APPLY_LIST } from '../constant/index';

export default (state: Array<WxFriendApply> = [], action: BaseAction) => {
    switch (action.type) {
    case ACTION_SET_FRIEND_APPLY_LIST:
        return action.data;
    default:
        return state;
    }
};