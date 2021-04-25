import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {EventChannel, eventChannel} from '@redux-saga/core';
import {call, fork, put, take} from '@redux-saga/core/effects';
import assets from '../../../helpers/assets';
import {postSubmitLogin} from '../../../helpers/firebaseUtils';
import {navigate} from '../../navigation/src/navigationUtils';
import routeNames from '../../navigation/src/routeNames';
import {statusActionCreators} from '../../status/src/statusActions';
import {
  loginActionCreators,
  loginActions,
  loginActionTypes,
} from './loginActions';

export default function* loginRuntime() {
  yield fork(submitLoginSaga);
}

function getCurrentUserDataChannel(currentUserID: string) {
  return eventChannel(emitter => {
    const userDatabaseRef = `/users/${currentUserID}`;
    database()
      .ref(userDatabaseRef)
      .on('value', snapshots => {
        emitter(snapshots.val());
      });
    return () => {};
  });
}

function* getCurrentUserDataSaga() {
  const currentUserAuthData = auth().currentUser;
  const getCurrentUserDataAction: EventChannel<string> = yield call(
    getCurrentUserDataChannel,
    currentUserAuthData!.uid,
  );
  while (true) {
    const currentUserData: login.currentUserData = yield take(
      getCurrentUserDataAction,
    );
    const currentUserDetail = {
      uid: currentUserAuthData!.uid,
      name: currentUserData.name,
      email: currentUserData.email,
      photoURL:
        currentUserData?.photoURL === ''
          ? assets.defaultUser
          : currentUserData!.photoURL,
    };
    yield put(loginActionCreators.storeUserDetails(currentUserDetail));
    yield put(loginActionCreators.doneStoringCurrentUserData());
  }
}

function* submitLoginSaga() {
  while (true) {
    const {payload}: loginActionTypes.submitLoginActionType = yield take(
      loginActions.SUBMIT_LOGIN,
    );
    yield put(loginActionCreators.toggleLoginLoading(true));
    try {
      yield call(postSubmitLogin, payload);
      yield put(loginActionCreators.toggleLoginLoading(false));
      yield fork(getCurrentUserDataSaga);
      yield take(loginActions.DONE_STORING_CURRENT_USER_DATA);
      navigate(routeNames.DASHBOARD_NAV);
    } catch (error) {
      yield put(statusActionCreators.updateStatusMsg('Invalid credentials!'));
      yield put(statusActionCreators.toggleApiStatus(false));
      yield put(statusActionCreators.toggleStatusModal(true));
      yield put(loginActionCreators.toggleLoginLoading(false));
    }
  }
}
