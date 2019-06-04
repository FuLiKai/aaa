import { BaseAction } from '../types/action';
import { ACTION_GET_MESSAGE_LIST, ACTION_SET_MESSAGE_LIST, ACTION_SEND_TEXT_MESSAGE, ACTION_MERGE_MESSAGE_LIST } from '../constant';
import { WxMessage } from '../types/state';

export function createGetWxMessageListAction (param: any, replace: boolean) : BaseAction {
    return {
        type: ACTION_GET_MESSAGE_LIST,
        param,
        replace
    };
}

export function createSetWxMessageListAction (data: Array<WxMessage>, sessionId: number) : BaseAction {
    return {
        type: ACTION_SET_MESSAGE_LIST,
        data,
        sessionId
    };
}

export function createMergeWxMessageListAction (data: Array<WxMessage>, sessionId: number, isNew: boolean) : BaseAction {
    return {
        type: ACTION_MERGE_MESSAGE_LIST,
        data,
        sessionId,
        isNew
    };
}

export function createSendTextMessageAction (param: any) {
    return {
        type: ACTION_SEND_TEXT_MESSAGE,
        param
    };
}