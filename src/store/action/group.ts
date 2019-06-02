import { BaseAction } from '../types/action';
import { ACTION_GET_GROUP_LIST, ACTION_SET_GROUP_LIST } from '../constant';
import { WxGroup } from '../types/state';

export function createGetWxGroupListAction (param: any) : BaseAction {
    return {
        type: ACTION_GET_GROUP_LIST,
        param
    };
}

export function createSetWxGroupListAction (data: Array<WxGroup>) : BaseAction {
    return {
        type: ACTION_SET_GROUP_LIST,
        data
    };
}