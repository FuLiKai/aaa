import { BaseAction } from '../types/action';
import { ACTION_GET_MESSAGE_LIST, ACTION_SET_MESSAGE_LIST, ACTION_SEND_TEXT_MESSAGE } from '../constant';
import { WxMessage } from '../types/state';

export function createGetWxMessageListAction (param: any) : BaseAction {
    return {
        type: ACTION_GET_MESSAGE_LIST,
        param
    };
}

export function createSetWxMessageListAction (data: Array<WxMessage>, sessionId: number) : BaseAction {
    return {
        type: ACTION_SET_MESSAGE_LIST,
        data,
        sessionId
    };
}

export function createSendTextMessageAction (param: any) {
    return {
        type: ACTION_SEND_TEXT_MESSAGE,
        param
    };
}