import { WxGroup } from '../types/state';
import { BaseAction  } from '../types/action';
import { ACTION_SET_GROUP_LIST } from '../constant/index';

export default (state: Array<WxGroup> = [], action: BaseAction) => {
    switch (action.type) {
    case ACTION_SET_GROUP_LIST:
        return action.data;
    default:
        return state;
    }
};