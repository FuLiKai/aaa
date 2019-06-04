import { put, takeEvery, call, all, select, takeLeading } from 'redux-saga/effects';
import { ACTION_GET_MESSAGE_LIST, ACTION_SEND_TEXT_MESSAGE } from '../constant';
import { createSetWxMessageListAction, createGetWxMessageListAction, createMergeWxMessageListAction } from '../action';
import { fetchMessageList, fetchSendTextMessage } from '../../http';

export function* getMessageList(action: any) {
    console.log(action);
    try {
        let data = yield call(fetchMessageList, {
            data: action.param
        });
        console.log(data);
        if (Array.isArray(data.list) && data.list.length > 0) {
            if (action.replace) {
                yield put(createSetWxMessageListAction(data.list, action.param.sessionId));
            } else {
                yield put(createMergeWxMessageListAction(data.list, action.param.sessionId, action.param.isNew));
            }
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
        let data = yield call(fetchSendTextMessage, param);
        let start = yield select(state => {
            let messageList = state.messageMap[action.param.sessionId];
            if (Array.isArray(messageList) && messageList.length > 0) {
                return messageList[messageList.length - 1].id;
            } else {
                return 0;
            }
        });
        yield put(createGetWxMessageListAction({ sessionId: action.param.sessionId, limit: 50, start, isNew: true }, false));
    } catch (error) {
        console.error(error);
    }
}

export function* watchGetMessageList () {
    yield takeLeading(ACTION_GET_MESSAGE_LIST, getMessageList);
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
