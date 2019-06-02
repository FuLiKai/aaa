import { WxSession } from '../types/state';
import { BaseAction  } from '../types/action';
import { ACTION_SET_SESSION_LIST } from '../constant/index';

export default (state: Array<WxSession> = [], action: BaseAction) => {
    switch (action.type) {
    case ACTION_SET_SESSION_LIST:
        return action.data;
    default:
        return state;
    }
};