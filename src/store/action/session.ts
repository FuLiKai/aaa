import { BaseAction } from '../types/action';
import { ACTION_GET_SESSION_LIST, ACTION_SET_SESSION_LIST, ACTION_CREATE_SESSION } from '../constant';
import { WxSession } from '../types/state';

export function createGetWxSessionListAction (param: any) : BaseAction {
    return {
        type: ACTION_GET_SESSION_LIST,
        param
    };
}

export function createSetWxSessionListAction (data: Array<WxSession>) : BaseAction {
    return {
        type: ACTION_SET_SESSION_LIST,
        data
    };
}

export function createCreateWxSessionAction (param: any) : BaseAction {
    return {
        type: ACTION_CREATE_SESSION,
        param
    };
}