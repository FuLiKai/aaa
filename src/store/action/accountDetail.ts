import { BaseAction } from '../types/action';
import { ACTION_GET_ACCOUNT_INFO, ACTION_SET_ACCOUNT_INFO } from '../constant';
import { WxAccountDetail } from '../types/state';

export function createGetAccountDetailAction (param: any) : BaseAction {
    return {
        type: ACTION_GET_ACCOUNT_INFO,
        param
    };
}

export function createSetAccountDetailAction (data: WxAccountDetail) : BaseAction {
    return {
        type: ACTION_SET_ACCOUNT_INFO,
        data
    };
}