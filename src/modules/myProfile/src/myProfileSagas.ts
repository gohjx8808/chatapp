import {FirebaseStorageTypes} from '@react-native-firebase/storage';
import {EventChannel, eventChannel} from '@redux-saga/core';
import {call, fork, put, race, select, take} from '@redux-saga/core/effects';
import ImageCropPicker, {
  ImageOrVideo,
  Options,
} from 'react-native-image-crop-picker';
import {
  CameraOptions,
  ImagePickerResponse,
  launchCamera,
} from 'react-native-image-picker';
import {RESULTS} from 'react-native-permissions';
import {
  defaultAvatar,
  postDeletePrevUploadedPhoto,
  postUpdateCurrentUserProfile,
  postUploadProfilePhoto,
} from '../../../helpers/firebaseUtils';
import {currentUserSelector} from '../../login/src/loginSelectors';
import {
  permissionActionCreators,
  permissionActions,
} from '../../permissions/src/permissionActions';
import {permissionStatusSelector} from '../../permissions/src/permissionSelectors';
import {statusActionCreators} from '../../status/src/statusActions';
import {
  myProfileActionCreators,
  myProfileActions,
  myProfileActionTypes,
} from './myProfileActions';

export default function* myProfileRuntime() {
  yield fork(selectProfilePhotoSaga);
  yield fork(updateProfileSaga);
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
        maxHeight: 40,
        maxWidth: 40,
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
  const imageCropPickerOptions: Options = {
    width: 480,
    height: 480,
    cropping: true,
    cropperCircleOverlay: true,
    mediaType: 'photo',
  };
  yield put(permissionActionCreators.requestPhotoLibraryPermission());
  yield take(permissionActions.PHOTO_LIBRARY_PERMISSION_CHECK_DONE);
  const photoLibraryPermission: permission.PermissionStatus = yield select(
    permissionStatusSelector,
  );
  switch (photoLibraryPermission) {
    case RESULTS.GRANTED:
      let pickerResponse: ImageOrVideo = yield call(
        launchImageLibrarySaga,
        imageCropPickerOptions,
      );
      const currentUser: login.currentUserData = yield select(
        currentUserSelector,
      );
      pickerResponse.filename = `${new Date().toISOString()}.${pickerResponse.mime.replace(
        'image/',
        '',
      )}`;
      if (pickerResponse.path) {
        const snapshot: FirebaseStorageTypes.TaskSnapshot = yield call(
          postUploadProfilePhoto,
          pickerResponse,
        );
        yield call(
          postUpdateCurrentUserProfile,
          {photoName: snapshot.metadata.name},
          currentUser.uid,
        );
        if (
          currentUser.photoName !== defaultAvatar.defaultUser &&
          currentUser.photoName !== defaultAvatar.chatBot
        ) {
          yield call(postDeletePrevUploadedPhoto, currentUser.photoName);
        }
        yield put(myProfileActionCreators.toggleImagePickerDialog(false));
      }
  }
}

function launchImageLibrarySaga(imageCropPickerOptions: Options) {
  return ImageCropPicker.openPicker(imageCropPickerOptions);
}

function* updateProfileSaga() {
  while (true) {
    const {
      payload,
    }: myProfileActionTypes.submitUpdateProfileActionType = yield take(
      myProfileActions.SUBMIT_UPDATE_PROFILE,
    );
    yield put(myProfileActionCreators.toggleProfileLoading(true));
    yield put(statusActionCreators.updateStatusTitle('Update Profile'));
    try {
      const currentUser: login.currentUserData = yield select(
        currentUserSelector,
      );
      yield call(postUpdateCurrentUserProfile, payload, currentUser.uid);
      yield put(
        statusActionCreators.updateStatusMsg(
          'Your profile had successfully updated!',
        ),
      );
      yield put(statusActionCreators.toggleApiStatus(true));
      yield put(statusActionCreators.toggleStatusModal(true));
      yield put(myProfileActionCreators.toggleProfileLoading(false));
    } catch (error) {
      yield put(
        statusActionCreators.updateStatusMsg(
          'Your profile had failed to update!',
        ),
      );
      yield put(statusActionCreators.toggleApiStatus(false));
      yield put(statusActionCreators.toggleStatusModal(true));
      yield put(myProfileActionCreators.toggleProfileLoading(false));
    }
  }
}
