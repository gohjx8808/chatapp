import {fork, take} from '@redux-saga/core/effects';
import {permissionActions} from './permissionActions';

export default function* permissionRuntime() {
  yield fork(requestCameraPermissionSaga);
}

function* requestCameraPermissionSaga() {
  while (true) {
    yield take(permissionActions.REQUEST_CAMERA_PERMISSION);
  }
}
