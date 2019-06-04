import { BaseAction } from '../types/action';
import { ACTION_SET_LOGIN_INFO } from '../constant';
import { LoginInfo } from '../types/state';

export function createSetLoginlAction (data: LoginInfo) : BaseAction {
    return {
        type: ACTION_SET_LOGIN_INFO,
        data
    };
}