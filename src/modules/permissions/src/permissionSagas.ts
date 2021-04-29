import {call, fork, put, select, take} from '@redux-saga/core/effects';
import {RESULTS} from 'react-native-permissions';
import {permissionActionCreators, permissionActions} from './permissionActions';
import {permissionStatusSelector} from './permissionSelectors';
import {
  checkCameraPermission,
  checkPhotoLibraryPermission,
  requestCameraPermission,
  requestPhotoLibraryPermission,
} from './permissionUtils';

export default function* permissionRuntime() {
  yield fork(startCameraPermissionRuntime);
  yield fork(startPhotoLibraryPermissionRuntime);
}

function* startCameraPermissionRuntime() {
  while (true) {
    yield take(permissionActions.REQUEST_CAMERA_PERMISSION);
    yield call(checkCameraPermissionSaga);
    const cameraStatus: permission.PermissionStatus = yield select(
      permissionStatusSelector,
    );
    switch (cameraStatus) {
      case RESULTS.GRANTED:
      case RESULTS.DENIED:
        break;
      case RESULTS.BLOCKED:
      case RESULTS.LIMITED:
        yield put(permissionActionCreators.togglePermissionErrorModal(true));
        break;
    }
    yield put(permissionActionCreators.cameraPermissionCheckDone());
  }
}

function* checkCameraPermissionSaga() {
  yield put(permissionActionCreators.updatePermissionType('Camera'));
  const checkStatus: permission.PermissionStatus = yield call(
    checkCameraPermission,
  );
  yield put(permissionActionCreators.updatePermissionStatus(checkStatus));
  switch (checkStatus) {
    case RESULTS.GRANTED:
    case RESULTS.LIMITED:
    case RESULTS.BLOCKED:
      break;
    case RESULTS.DENIED:
      const requestStatus: permission.PermissionStatus = yield call(
        requestCameraPermission,
      );
      yield put(permissionActionCreators.updatePermissionStatus(requestStatus));
      break;
  }
}

function* startPhotoLibraryPermissionRuntime() {
  while (true) {
    yield take(permissionActions.REQUEST_PHOTO_LIBRARY_PERMISSION);
    yield call(checkPhotoLibraryPermissionSaga);
    const photoLibraryStatus: permission.PermissionStatus = yield select(
      permissionStatusSelector,
    );
    switch (photoLibraryStatus) {
      case RESULTS.GRANTED:
      case RESULTS.DENIED:
        break;
      case RESULTS.BLOCKED:
      case RESULTS.LIMITED:
        yield put(permissionActionCreators.togglePermissionErrorModal(true));
    }
    yield put(permissionActionCreators.photoLibraryPermissionCheckDone());
  }
}

function* checkPhotoLibraryPermissionSaga() {
  yield put(permissionActionCreators.updatePermissionType('Photo Library'));
  const checkStatus: permission.PermissionStatus = yield call(
    checkPhotoLibraryPermission,
  );
  yield put(permissionActionCreators.updatePermissionStatus(checkStatus));
  switch (checkStatus) {
    case RESULTS.GRANTED:
    case RESULTS.LIMITED:
    case RESULTS.BLOCKED:
      break;
    case RESULTS.DENIED:
      const permission: permission.PermissionStatus = yield call(
        requestPhotoLibraryPermission,
      );
      yield put(permissionActionCreators.updatePermissionStatus(permission));
      break;
  }
}
