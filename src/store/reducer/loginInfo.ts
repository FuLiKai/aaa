import { LoginInfo } from '../types/state';
import { BaseAction } from '../types/action';
import { ACTION_SET_LOGIN_INFO } from '../constant/index';

export default (state: LoginInfo | Object = {}, action: BaseAction) => {
    console.log(action);
    switch (action.type) {
    case ACTION_SET_LOGIN_INFO:
        return action.data;
    default:
        return state;
    }
};