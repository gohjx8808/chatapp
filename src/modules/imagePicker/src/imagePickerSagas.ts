import {call, fork, put, race, select, take} from '@redux-saga/core/effects';
import ImageCropPicker, {Image, Options} from 'react-native-image-crop-picker';
import {RESULTS} from 'react-native-permissions';
import {
  permissionActionCreators,
  permissionActions,
} from '../../permissions/src/permissionActions';
import {permissionStatusSelector} from '../../permissions/src/permissionSelectors';
import {
  imagePickerActionCreators,
  imagePickerActions,
} from './imagePickerActions';
import {isCroppingSelector} from './imagePickerSelectors';

export default function* imagePickerRuntime() {
  yield fork(selectProfilePhotoSaga);
}

function* selectProfilePhotoSaga() {
  while (true) {
    const {camera, photoLibrary} = yield race({
      camera: take(imagePickerActions.OPEN_CAMERA),
      photoLibrary: take(imagePickerActions.OPEN_PHOTO_LIBRARY),
    });
    if (camera) {
      yield fork(triggerCameraSaga);
    } else if (photoLibrary) {
      yield fork(triggerPhotoLibrarySaga);
    }
  }
}

function* triggerCameraSaga() {
  const isCroppingMode: boolean = yield select(isCroppingSelector);
  let cameraOptions: Options = {
    cropping: isCroppingMode,
    width: 480,
    height: 480,
    cropperCircleOverlay: isCroppingMode,
    useFrontCamera: true,
    mediaType: 'photo',
  };
  yield put(permissionActionCreators.requestCameraPermission());
  yield take(permissionActions.CAMERA_PERMISSION_CHECK_DONE);
  const cameraPermission: permission.PermissionStatus = yield select(
    permissionStatusSelector,
  );
  switch (cameraPermission) {
    case RESULTS.GRANTED:
      try {
        const cameraResponse: Image = yield call(
          launchCameraActionSaga,
          cameraOptions,
        );
        cameraResponse.filename = `${new Date().toISOString()}.${cameraResponse.mime.replace(
          'image/',
          '',
        )}`;
        yield put(
          imagePickerActionCreators.updateUploadedPhoto(cameraResponse),
        );
        // yield call(uploadPictureToFirebaseSaga, cameraResponse);
      } catch (error) {}
  }
}

function launchCameraActionSaga(cameraOptions: Options) {
  return ImageCropPicker.openCamera(cameraOptions);
}

function* triggerPhotoLibrarySaga() {
  const isCroppingMode: boolean = yield select(isCroppingSelector);
  const imageCropPickerOptions: Options = {
    width: 480,
    height: 480,
    cropping: isCroppingMode,
    cropperCircleOverlay: isCroppingMode,
    mediaType: 'photo',
  };
  yield put(permissionActionCreators.requestPhotoLibraryPermission());
  yield take(permissionActions.PHOTO_LIBRARY_PERMISSION_CHECK_DONE);
  const photoLibraryPermission: permission.PermissionStatus = yield select(
    permissionStatusSelector,
  );
  switch (photoLibraryPermission) {
    case RESULTS.GRANTED:
      try {
        const pickerResponse: Image = yield call(
          launchImageLibrarySaga,
          imageCropPickerOptions,
        );
        pickerResponse.filename = `${new Date().toISOString()}.${pickerResponse.mime.replace(
          'image/',
          '',
        )}`;
        yield put(
          imagePickerActionCreators.updateUploadedPhoto(pickerResponse),
        );
      } catch (error) {
        if (error.code.match(/E_PICKER_CANCELLED/)) {
          yield put(imagePickerActionCreators.cancelImagePicker());
        }
      }
  }
}

function launchImageLibrarySaga(imageCropPickerOptions: Options) {
  return ImageCropPicker.openPicker(imageCropPickerOptions);
}
