import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {EventChannel, eventChannel} from '@redux-saga/core';
import {call, fork, put, take} from '@redux-saga/core/effects';
import assets from '../../../helpers/assets';
import {
  getUploadedPhotoUrl,
  googleAuthenticate,
  loginWithGoogle,
  postSubmitLogin,
  postUpdateProfile,
} from '../../../helpers/firebaseUtils';
import {loadingOverlayActionCreators} from '../../loadingOverlay/src/loadingOverlayActions';
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
  yield fork(loginWithGoogleSaga);
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
    const currentUserData: login.getUserDataPayload = yield take(
      getCurrentUserDataAction,
    );
    try {
      let currentUserPhotoURL = '';
      if (currentUserData?.photoName === '') {
        currentUserPhotoURL = assets.defaultUser;
      } else {
        currentUserPhotoURL = yield call(
          getUploadedPhotoUrl,
          currentUserData!.photoName,
        );
      }
      const currentUserDetail = {
        uid: currentUserAuthData!.uid,
        name: currentUserData.name,
        email: currentUserData.email,
        photoURL: currentUserPhotoURL,
        photoName: currentUserData.photoName,
        dob: currentUserData.dob,
        gender: currentUserData.gender,
      };
      yield put(loginActionCreators.storeUserDetails(currentUserDetail));
      yield put(loginActionCreators.doneStoringCurrentUserData());
    } catch (error) {
      navigate(routeNames.LOGIN);
    }
  }
}

function* submitLoginSaga() {
  while (true) {
    const {payload}: loginActionTypes.submitLoginActionType = yield take(
      loginActions.SUBMIT_LOGIN,
    );
    yield put(loadingOverlayActionCreators.toggleLoadingOverlay(true));
    try {
      yield call(postSubmitLogin, payload);
      yield fork(getCurrentUserDataSaga);
      yield take(loginActions.DONE_STORING_CURRENT_USER_DATA);
      yield put(loadingOverlayActionCreators.toggleLoadingOverlay(false));
      navigate(routeNames.DASHBOARD_NAV);
    } catch (error) {
      yield put(statusActionCreators.updateStatusMsg('Invalid credentials!'));
      yield put(statusActionCreators.toggleApiStatus(false));
      yield put(statusActionCreators.toggleStatusModal(true));
      yield put(loadingOverlayActionCreators.toggleLoadingOverlay(false));
    }
  }
}

function* loginWithGoogleSaga() {
  while (true) {
    yield take(loginActions.LOGIN_WITH_GOOGLE);
    yield put(loadingOverlayActionCreators.toggleLoadingOverlay(true));
    try {
      const {idToken} = yield call(googleAuthenticate);
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const googleLoginCredential: FirebaseAuthTypes.UserCredential = yield call(
        loginWithGoogle,
        googleCredential,
      );
      const userDetail = googleLoginCredential.user;
      const userData = {
        name: userDetail.displayName,
        email: userDetail.email,
        photoName: '',
      };
      database().ref(`users/${userDetail.uid}`).set(userData);
      yield call(postUpdateProfile, userDetail.displayName!);
      yield fork(getCurrentUserDataSaga);
      yield take(loginActions.DONE_STORING_CURRENT_USER_DATA);
      yield put(loadingOverlayActionCreators.toggleLoadingOverlay(false));
      navigate(routeNames.DASHBOARD_NAV);
    } catch (error) {
      yield put(statusActionCreators.updateStatusMsg('Invalid credentials!'));
      yield put(statusActionCreators.toggleApiStatus(false));
      yield put(statusActionCreators.toggleStatusModal(true));
      yield put(loadingOverlayActionCreators.toggleLoadingOverlay(false));
    }
  }
}
