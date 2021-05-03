import {END, EventChannel, eventChannel} from '@redux-saga/core';
import {call, fork, put, select, take} from '@redux-saga/core/effects';
import {getFrenList, postSubmitAddFriend} from '../../../helpers/firebaseUtils';
import {currentUserSelector} from '../../login/src/loginSelectors';
import {statusActionCreators} from '../../status/src/statusActions';
import {
  friendActionCreators,
  friendActions,
  friendActionTypes,
} from './friendActions';
import database from '@react-native-firebase/database';
import {friendListSelector} from './friendSelectors';

export default function* friendRuntime() {
  yield fork(submitAddFriendSaga);
  yield fork(getFrenListSaga);
}

function checkUserAvailability(frenID: string) {
  return eventChannel(emitter => {
    database()
      .ref('users')
      .on('value', snapshots => {
        let flag = false;
        snapshots.forEach(snapshot => {
          if (snapshot.key === frenID) {
            flag = true;
          }
          return undefined;
        });
        emitter(flag);
        emitter(END);
      });
    return () => {};
  });
}

function* checkUserAvailabilitySaga(frenID: string) {
  const checkUserAvailabilityAction: EventChannel<boolean> = yield call(
    checkUserAvailability,
    frenID,
  );
  while (true) {
    const isAvailable: boolean = yield take(checkUserAvailabilityAction);
    return isAvailable;
  }
}

function* submitAddFriendSaga() {
  while (true) {
    const {payload}: friendActionTypes.submitAddFriendActionType = yield take(
      friendActions.SUBMIT_ADD_FRIEND,
    );
    yield put(friendActionCreators.toggleFriendLoading(true));
    yield put(statusActionCreators.updateStatusTitle('Add Friend'));
    try {
      const currentUser: login.currentUserData = yield select(
        currentUserSelector,
      );
      const response: boolean = yield call(checkUserAvailabilitySaga, payload);
      if (response) {
        yield call(postSubmitAddFriend, currentUser.uid, payload);
        yield put(statusActionCreators.toggleApiStatus(true));
        yield put(
          statusActionCreators.updateStatusMsg(
            'Your friend is successfully added!',
          ),
        );
      } else {
        yield put(statusActionCreators.toggleApiStatus(false));
        yield put(statusActionCreators.updateStatusMsg('User not exists!'));
      }
      yield put(statusActionCreators.toggleStatusModal(true));
      yield put(friendActionCreators.toggleFriendLoading(false));
    } catch (error) {
      yield put(statusActionCreators.toggleApiStatus(false));
      yield put(
        statusActionCreators.updateStatusMsg('Your friend had failed to add!'),
      );
      yield put(statusActionCreators.toggleStatusModal(true));
      yield put(friendActionCreators.toggleFriendLoading(false));
    }
  }
}

function* getFrenListSaga() {
  yield take(friendActions.GET_FRIEND_LIST);
  const currentUser: login.currentUserData = yield select(currentUserSelector);
  const userID = currentUser.uid;
  const chatSnapshotResponse: EventChannel<frenData> = yield call(
    getFrenList,
    userID,
    'friend',
  );
  while (true) {
    const currentFrenList: frenData[] = yield select(friendListSelector);
    const fren: frenData = yield take(chatSnapshotResponse);
    const found = currentFrenList.some(el => el.name === fren.name);
    if (!found) {
      yield put(friendActionCreators.loadFriendList(fren));
    }
  }
}
