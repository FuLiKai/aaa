import { put, takeEvery, call } from 'redux-saga/effects';
import { ACTION_GET_GROUP_LIST } from '../constant';
import { createSetWxGroupListAction } from '../action';
import { fetchGroupList } from '../../http';
import groupList from '@/mock/groupList';

export function* getGroupList(action: any) {
    console.log(action);
    try {
        let data = yield call(fetchGroupList, action.param);
        console.log(data);
        if (Array.isArray(data.list) && data.list.length > 0) {
            yield put(createSetWxGroupListAction(data.list));
        }
    } catch (error) {
        console.error(error);
    }
}

export function* watchGetGroupList () {
    yield takeEvery(ACTION_GET_GROUP_LIST, getGroupList);
}