import { put, takeEvery, call, all } from 'redux-saga/effects';
import { ACTION_GET_FRIEND_APPLY_LIST, ACTION_ALLOW_FRIEND_APPLY} from '../constant';
import { createSetWxFriendApplyListAction, createGetWxFriendApplyListAction } from '../action';
import { fetchFriendApplyList, sendAgreeFriendApply } from '../../http';

export function* getFriendApplyList(action: any) {
    console.log(action);
    try {
        let data = yield call(fetchFriendApplyList, action.param);
        console.log(data);
        yield put(createSetWxFriendApplyListAction(data.list));
    } catch (error) {
        console.error(error);
    }
}

export function* replyFriendApply(action: any) {
    console.log(action);
    try {
        let data = yield call(sendAgreeFriendApply, action.param);
        yield put(createGetWxFriendApplyListAction({ limit: 5000 }));
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

export function* watchGetFriendApplyList () {
    yield takeEvery(ACTION_GET_FRIEND_APPLY_LIST, getFriendApplyList);
}

export function* watchReplyFriendApply () {
    yield takeEvery(ACTION_ALLOW_FRIEND_APPLY, replyFriendApply);
}


export function* watchFriendApply () {
    yield all([
        watchGetFriendApplyList(),
        watchReplyFriendApply()
    ]);
}