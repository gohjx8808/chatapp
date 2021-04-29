import {EventChannel, eventChannel} from '@redux-saga/core';
import {call, fork, put, race, select, take} from '@redux-saga/core/effects';
import {
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {RESULTS} from 'react-native-permissions';
import {
  permissionActionCreators,
  permissionActions,
} from '../../permissions/src/permissionActions';
import {permissionStatusSelector} from '../../permissions/src/permissionSelectors';
import {myProfileActions} from './myProfileActions';

export default function* myProfileRuntime() {
  yield fork(selectProfilePhotoSaga);
}

function* selectProfilePhotoSaga() {
  while (true) {
    const {camera, photoLibrary} = yield race({
      camera: take(myProfileActions.OPEN_CAMERA),
      photoLibrary: take(myProfileActions.OPEN_PHOTO_LIBRARY),
    });
    if (camera) {
      yield fork(triggerCameraSaga);
    } else if (photoLibrary) {
      yield fork(triggerPhotoLibrarySaga);
    }
  }
}

function* triggerCameraSaga() {
  yield put(permissionActionCreators.requestCameraPermission());
  yield take(permissionActions.CAMERA_PERMISSION_CHECK_DONE);
  const cameraPermission: permission.PermissionStatus = yield select(
    permissionStatusSelector,
  );
  switch (cameraPermission) {
    case RESULTS.GRANTED:
      const cameraOptions: CameraOptions = {
        mediaType: 'photo',
        cameraType: 'front',
      };
      const launchCameraAction: EventChannel<ImagePickerResponse> = yield call(
        launchCameraActionSaga,
        cameraOptions,
      );
      while (true) {
        const response: ImagePickerResponse = yield take(launchCameraAction);
        console.log(response);
      }
  }
}

function launchCameraActionSaga(cameraOptions: CameraOptions) {
  return eventChannel(emitter => {
    launchCamera(cameraOptions, response => emitter(response));
    return () => {};
  });
}

function* triggerPhotoLibrarySaga() {
  yield put(permissionActionCreators.requestPhotoLibraryPermission());
  yield take(permissionActions.PHOTO_LIBRARY_PERMISSION_CHECK_DONE);
  const photoLibraryPermission: permission.PermissionStatus = yield select(
    permissionStatusSelector,
  );
  switch (photoLibraryPermission) {
    case RESULTS.GRANTED:
      const imageLibraryOptions: ImageLibraryOptions = {
        mediaType: 'photo',
      };
      const launchImageLibraryAction: EventChannel<ImagePickerResponse> = yield call(
        launchImageLibrarySaga,
        imageLibraryOptions,
      );
      while (true) {
        const response: ImagePickerResponse = yield take(
          launchImageLibraryAction,
        );
        console.log(response);
      }
  }
}

function launchImageLibrarySaga(options: ImageLibraryOptions) {
  return eventChannel(emmitter => {
    launchImageLibrary(options, response => emmitter(response));
    return () => {};
  });
}
