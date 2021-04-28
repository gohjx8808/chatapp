import {call, fork, put, take} from '@redux-saga/core/effects';
import {RESULTS} from 'react-native-permissions';
import {permissionActionCreators, permissionActions} from './permissionActions';
import {
  checkCameraPermission,
  checkPhotoLibraryPermission,
  requestCameraPermission,
  requestPhotoLibraryPermission,
} from './permissionUtils';

export default function* permissionRuntime() {
  yield fork(checkCameraPermissionSaga);
  yield fork(checkPhotoLibraryPermissionSaga);
}

function* checkCameraPermissionSaga() {
  while (true) {
    yield take(permissionActions.REQUEST_CAMERA_PERMISSION);
    yield put(permissionActionCreators.updatePermissionType('Camera'));
    const response: permission.PermissionStatus = yield call(
      checkCameraPermission,
    );
    switch (response) {
      case RESULTS.GRANTED:
        // trigger docs picker
        break;
      case RESULTS.DENIED:
        yield call(requestCameraPermissionSaga);
        break;
      case RESULTS.LIMITED:
      case RESULTS.BLOCKED:
        yield put(permissionActionCreators.updatePermissionStatus(response));
        yield put(permissionActionCreators.togglePermissionErrorModal(true));
        break;
    }
  }
}

function* requestCameraPermissionSaga() {
  const response: permission.PermissionStatus = yield call(
    requestCameraPermission,
  );
  switch (response) {
    case RESULTS.GRANTED:
      // trigger docs picker
      break;
    case RESULTS.DENIED:
      break;
    case RESULTS.LIMITED:
    case RESULTS.BLOCKED:
      yield put(permissionActionCreators.updatePermissionStatus(response));
      yield put(permissionActionCreators.togglePermissionErrorModal(true));
      break;
  }
}

function* checkPhotoLibraryPermissionSaga() {
  while (true) {
    yield take(permissionActions.REQUEST_PHOTO_LIBRARY_PERMISSION);
    yield put(permissionActionCreators.updatePermissionType('Photo Library'));
    const response: permission.PermissionStatus = yield call(
      checkPhotoLibraryPermission,
    );
    switch (response) {
      case RESULTS.GRANTED:
        // trigger docs picker
        break;
      case RESULTS.DENIED:
        yield call(requestPhotoLibraryPermissionSaga);
        break;
      case RESULTS.LIMITED:
      case RESULTS.BLOCKED:
        yield put(permissionActionCreators.updatePermissionStatus(response));
        yield put(permissionActionCreators.togglePermissionErrorModal(true));
        break;
    }
  }
}

function* requestPhotoLibraryPermissionSaga() {
  const response: permission.PermissionStatus = yield call(
    requestPhotoLibraryPermission,
  );
  switch (response) {
    case RESULTS.GRANTED:
      // trigger docs picker
      break;
    case RESULTS.DENIED:
      break;
    case RESULTS.LIMITED:
    case RESULTS.BLOCKED:
      yield put(permissionActionCreators.updatePermissionStatus(response));
      yield put(permissionActionCreators.togglePermissionErrorModal(true));
      break;
  }
}
