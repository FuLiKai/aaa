import { WxSession } from '../types/state';
import { BaseAction  } from '../types/action';
import { ACTION_SET_SESSION_LIST, ACTION_UPDATE_SINGLE_SESSION } from '../constant/index';

export default (state: Array<WxSession> = [], action: BaseAction) => {
    switch (action.type) {
    case ACTION_SET_SESSION_LIST:
        return action.data;
    case ACTION_UPDATE_SINGLE_SESSION:
        return state.map(session => {
            if (session.sessionId === action.data.sessionId) {
                return {
                    ...session,
                    ...action.data
                };
            }
            return session;
        });
    default:
        return state;
    }
};