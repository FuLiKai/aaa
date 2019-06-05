import { put, takeEvery, call, all, select, takeLeading } from 'redux-saga/effects';
import { ACTION_GET_MESSAGE_LIST, ACTION_SEND_TEXT_MESSAGE } from '../constant';
import { createSetWxMessageListAction, createGetWxMessageListAction, createMergeWxMessageListAction } from '../action';
import { fetchMessageList, fetchSendTextMessage } from '../../http';
import { random } from '@/util';
import { State } from '../types/state';

function getLastSuccessMessageId (list: Array<any>) {
    let len = list.length;
    if (len === 0) return 0;
    for (let i = len - 1; i >= 0; i--) {
        let id = list[i].id;
        if (id && id > 0) {
            return id;
        }
    }
    return 0;
}

export function* getMessageList(action: any) {
    console.log(action);
    try {
        let start = 0;
        let messageList = yield select(state => {
            return state.messageMap[action.param.sessionId];
        });
        if (Array.isArray(messageList) && messageList.length > 0) {
            if (action.param.isNew) {
                start = getLastSuccessMessageId(messageList);
            } else {
                start = messageList[0].id;
            }
        }
        let data = yield call(fetchMessageList, {...action.param, start});
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
        let param = action.param;
        yield call(fetchSendTextMessage, param);
        yield put(createGetWxMessageListAction({ sessionId: action.param.sessionId, limit: 50, isNew: true }, false));
    } catch (error) {
        let userInfo = yield select((state: State) => {
            return {
                fromWxId: state.loginInfo.wxId,
                headImg: state.accountDetail.account.headImg
            };
        });
        let msg = {
            id: random(-10, -99999999),
            sessionId: action.param.sessionId,
            msgType: 1,
            rawMsg: JSON.stringify({content: action.param.content }),
            ...userInfo
        };
        yield put(createMergeWxMessageListAction([msg], action.param.sessionId, true));
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
