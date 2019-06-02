import { WxAccountDetail } from '../types/state';
import { BaseAction } from '../types/action';
import { ACTION_SET_ACCOUNT_INFO } from '../constant/index';

export default (state: WxAccountDetail | Object = {account: {}, client: {}}, action: BaseAction) => {
    console.log(action);
    switch (action.type) {
    case ACTION_SET_ACCOUNT_INFO:
        return action.data;
    default:
        return state;
    }
};