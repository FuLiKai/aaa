import { put, takeEvery, call } from 'redux-saga/effects';
import { ACTION_GET_ACCOUNT_INFO } from '../constant';
import { createSetAccountDetailAction } from '../action';
import { fetchAccountDetail } from '../../http';

export function* getAccountDetail(action: any) {
    console.log(action);
    try {
        let data = yield call(fetchAccountDetail, action.param);
        console.log(data);
        if (data.detail) {
            yield put(createSetAccountDetailAction(data.detail));
        }
    } catch (error) {
        console.error(error);
    }
}

export function* watchGetAccountDetail () {
    yield takeEvery(ACTION_GET_ACCOUNT_INFO, getAccountDetail);
}