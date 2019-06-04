import { WxMessage } from '../types/state';
import { BaseAction  } from '../types/action';
import { ACTION_SET_MESSAGE_LIST, ACTION_MERGE_MESSAGE_LIST } from '../constant/index';

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
    case ACTION_MERGE_MESSAGE_LIST: {
        let sessionId = action.sessionId;
        if (!state[sessionId]) {
            return {
                [sessionId]: action.data
            };
        } else if (action.isNew) {
            return {
                ...state,
                [sessionId]: state[sessionId].concat(action.data)
            };
        } else {
            return {
                ...state,
                [sessionId]: action.data.concat(state[sessionId])
            };
        }
    }
    default:
        return state;
    }
};