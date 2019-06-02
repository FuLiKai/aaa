import { all } from 'redux-saga/effects';
import { watchGetAccountDetail } from './accountDetail';
import { watchGetFriendList } from './friend';
import { watchGetFriendApplyList } from './friendApply';
import { watchGetGroupList } from './group';
import { watchMessage } from './message';
import { watchSession } from './session';

export default function* () {
    yield all([
        watchGetAccountDetail(),
        watchGetFriendList(),
        watchGetFriendApplyList(),
        watchGetGroupList(),
        watchMessage(),
        watchSession()
    ]);
}