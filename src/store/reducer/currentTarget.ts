import { Target } from '../types/state';
import { BaseAction  } from '../types/action';
import { ACTION_SET_CURRENT_TARGET } from '../constant/index';

export default (state: Target | null = null, action: BaseAction) => {
    switch (action.type) {
    case ACTION_SET_CURRENT_TARGET:
        return action.data;
    default:
        return state;
    }
};