import { WxFriend } from '../types/state';
import { BaseAction  } from '../types/action';
import { ACTION_SET_FRIEND_LIST } from '../constant/index';

export default (state: Array<WxFriend> = [], action: BaseAction) => {
    switch (action.type) {
    case ACTION_SET_FRIEND_LIST:
        return action.data;
    default:
        return state;
    }
};