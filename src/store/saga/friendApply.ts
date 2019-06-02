import { put, takeEvery, call } from 'redux-saga/effects';
import { ACTION_GET_FRIEND_APPLY_LIST } from '../constant';
import { createSetWxFriendApplyListAction } from '../action';
import { fetchFriendApplyList } from '../../http';

export function* getFriendApplyList(action: any) {
    console.log(action);
    try {
        let data = yield call(fetchFriendApplyList, {
            data: {
                limit: 10
            }
        });
        console.log(data);
        yield put(createSetWxFriendApplyListAction(data));
    } catch (error) {
        console.error(error);
    }
}

export function* watchGetFriendApplyList () {
    yield takeEvery(ACTION_GET_FRIEND_APPLY_LIST, getFriendApplyList);
}