import { put, takeEvery, call, all } from 'redux-saga/effects';
import { ACTION_GET_MESSAGE_LIST, ACTION_SEND_TEXT_MESSAGE } from '../constant';
import { createSetWxMessageListAction, createGetWxMessageListAction } from '../action';
import { fetchMessageList, fetchSendTextMessage } from '../../http';

export function* getMessageList(action: any) {
    console.log(action);
    try {
        let data = yield call(fetchMessageList, {
            data: action.param
        });
        console.log(data);
        if (Array.isArray(data.list) && data.list.length > 0) {
            yield put(createSetWxMessageListAction(data.list, action.param.sessionId));
        }
    } catch (error) {
        console.error(error);
    }
}

export function* sendTextMessage (action: any) {
    console.log(action);
    try {
        let param = {
            data: action.param
        };
        console.log(action.param, JSON.stringify(param));
        let data = yield call(fetchSendTextMessage, param);
        console.log(data, '11111111111111111111111111111111');
        yield put(createGetWxMessageListAction({ limit: 200, sessionId: action.param.sessionId }));
    } catch (error) {
        console.error(error);
    }
}

export function* watchGetMessageList () {
    yield takeEvery(ACTION_GET_MESSAGE_LIST, getMessageList);
}

export function* watchSendTextMessage () {
    yield takeEvery(ACTION_SEND_TEXT_MESSAGE, sendTextMessage);
}


export function* watchMessage () {
    yield all([
        watchGetMessageList(),
        watchSendTextMessage()
    ]);
}
