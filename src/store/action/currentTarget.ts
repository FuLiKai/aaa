import { BaseAction } from '../types/action';
import { ACTION_SET_CURRENT_TARGET } from '../constant';
import { Target } from '../types/state';

export function createSetCurrentTargetAction (data: Target) : BaseAction {
    return {
        type: ACTION_SET_CURRENT_TARGET,
        data
    };
}
