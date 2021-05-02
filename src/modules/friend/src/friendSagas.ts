import {call, fork, put, select, take} from '@redux-saga/core/effects';
import {postSubmitAddFren} from '../../../helpers/firebaseUtils';
import {currentUserSelector} from '../../login/src/loginSelectors';
import {statusActionCreators} from '../../status/src/statusActions';
import {
  friendActionCreators,
  friendActions,
  friendActionTypes,
} from './friendActions';

export default function* friendRuntime() {
  yield fork(submitAddFrenSaga);
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
      yield call(postSubmitAddFren, currentUser.uid, payload);
      yield put(statusActionCreators.toggleApiStatus(true));
      yield put(
        statusActionCreators.updateStatusMsg(
          'Your friend is successfully added!',
        ),
      );
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
