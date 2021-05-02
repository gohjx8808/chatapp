import {END, EventChannel, eventChannel} from '@redux-saga/core';
import {call, fork, put, select, take} from '@redux-saga/core/effects';
import {postSubmitAddFren} from '../../../helpers/firebaseUtils';
import {currentUserSelector} from '../../login/src/loginSelectors';
import {statusActionCreators} from '../../status/src/statusActions';
import {
  friendActionCreators,
  friendActions,
  friendActionTypes,
} from './friendActions';
import database from '@react-native-firebase/database';

export default function* friendRuntime() {
  yield fork(submitAddFrenSaga);
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

function* submitAddFrenSaga() {
  while (true) {
    const {payload}: friendActionTypes.submitAddFrenActionType = yield take(
      friendActions.SUBMIT_ADD_FREN,
    );
    yield put(friendActionCreators.toggleFriendLoading(true));
    yield put(statusActionCreators.updateStatusTitle('Add Friend'));
    try {
      const currentUser: login.currentUserData = yield select(
        currentUserSelector,
      );
      const response: boolean = yield call(checkUserAvailabilitySaga, payload);
      if (response) {
        yield call(postSubmitAddFren, currentUser.uid, payload);
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
