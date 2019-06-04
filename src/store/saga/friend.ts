import { put, takeEvery, call } from 'redux-saga/effects';
import { ACTION_GET_FRIEND_LIST } from '../constant';
import { fetchFriendList } from '../../http';
import { createSetWxFriendListAction } from '../action';
import friendList from '@/mock/friendList';

export function* getFriendList(action: any) {
    console.log(action);
    try {
        let data = yield call(fetchFriendList, action.param);
        console.log(data);
        if (Array.isArray(data.list) && data.list.length > 0) {
            yield put(createSetWxFriendListAction(data.list));
        }
    } catch (error) {
        console.error(error);
    }
}

export function* watchGetFriendList () {
    yield takeEvery(ACTION_GET_FRIEND_LIST, getFriendList);
}