import { put, takeEvery, call, all } from 'redux-saga/effects';
import { ACTION_GET_SESSION_LIST, ACTION_CREATE_SESSION } from '../constant';
import { createSetWxSessionListAction, createGetWxSessionListAction, createSetCurrentTargetAction } from '../action';
import { fetchSessionList, fetchCreateSession } from '../../http';
import sessionList from '@/mock/sessionList';
import { TARGET_TYPE_SESSION } from '@/store/constant';

export function* getSessionList (action: any) {
    console.log(action);
    try {
        let data = yield call(fetchSessionList, {
            data: action.param
        });
        console.log(data);
        if (Array.isArray(data.list) && data.list.length > 0) {
            yield put(createSetWxSessionListAction(data.list));
        }
    } catch (error) {
        console.error(error);
    }
}

export function* createSession (action: any) {
    console.log(action, 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');
    try {
        let data = yield call(fetchCreateSession, {
            data: action.param
        });
        console.log(data);
        yield put(createGetWxSessionListAction({wxId: action.param.wxId, limit: 200}));
        yield put(createSetCurrentTargetAction({id: data.session.sessionId, type: TARGET_TYPE_SESSION }));
    } catch (error) {
        console.error(error);
    }
}

export function* watchGetSessionList () {
    yield takeEvery(ACTION_GET_SESSION_LIST, getSessionList);
}

export function* watchCreateSession () {
    yield takeEvery(ACTION_CREATE_SESSION, createSession);
}

export function* watchSession () {
    yield all([
        watchCreateSession(),
        watchGetSessionList()
    ]);
}