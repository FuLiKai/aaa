import { WxMessage } from '../types/state';
import { BaseAction  } from '../types/action';
import { ACTION_SET_MESSAGE_LIST } from '../constant/index';

interface Message {
    [propName: number]: Array<WxMessage>
}

export default (state: Message = {}, action: BaseAction) => {
    switch (action.type) {
    case ACTION_SET_MESSAGE_LIST: {
        let sessionId = action.sessionId;
        return {
            ...state,
            [sessionId]: action.data
        };
    }
    default:
        return state;
    }
};