import {FirebaseStorageTypes} from '@react-native-firebase/storage';
import {call, fork, put, race, select, take} from '@redux-saga/core/effects';
import {Image} from 'react-native-image-crop-picker';
import {
  changePassword,
  defaultAvatar,
  postDeletePrevUploadedPhoto,
  postUpdateCurrentUserProfile,
  postUploadProfilePhoto,
  validateCurrentPassword,
} from '../../../helpers/firebaseUtils';
import {
  imagePickerActionCreators,
  imagePickerActions,
} from '../../imagePicker/src/imagePickerActions';
import {currentUserSelector} from '../../login/src/loginSelectors';
import {navigate} from '../../navigation/src/navigationUtils';
import {statusActionCreators} from '../../status/src/statusActions';
import {
  myProfileActionCreators,
  myProfileActions,
  myProfileActionTypes,
} from './myProfileActions';
import myProfileRouteNames from './myProfileRouteNames';

export default function* myProfileRuntime() {
  yield fork(selectProfilePhotoSaga);
  yield fork(updateProfileSaga);
  yield fork(changePasswordSaga);
}

function* selectProfilePhotoSaga() {
  while (true) {
    const {updateProfilePhoto, selectedImage, cancelImagePicker} = yield race({
      updateProfilePhoto: take(myProfileActions.UPDATE_PROFILE_PHOTO),
      selectedImage: take(imagePickerActions.UPDATE_UPLOADED_PHOTO),
      cancelImagePicker: take(imagePickerActions.CANCEL_IMAGE_PICKER),
    });
    if (updateProfilePhoto) {
      yield put(
        imagePickerActionCreators.updateImagePickerDialogTitle(
          'Edit Profile Photo',
        ),
      );
      yield put(imagePickerActionCreators.toggleIsCropping(true));
      yield put(imagePickerActionCreators.toggleImagePickerDialog(true));
    } else if (selectedImage) {
      yield call(uploadPictureToFirebaseSaga, selectedImage.payload);
    } else if (cancelImagePicker) {
    }
  }
}

function* uploadPictureToFirebaseSaga(uploadedPhoto: Image) {
  const snapshot: FirebaseStorageTypes.TaskSnapshot = yield call(
    postUploadProfilePhoto,
    uploadedPhoto,
  );
  const currentUser: login.currentUserData = yield select(currentUserSelector);
  yield call(
    postUpdateCurrentUserProfile,
    {photoName: snapshot.metadata.name},
    currentUser.uid,
  );
  if (
    currentUser.photoName !== defaultAvatar.chatBot &&
    currentUser.photoName !== ''
  ) {
    yield call(postDeletePrevUploadedPhoto, currentUser.photoName);
  }
  navigate(myProfileRouteNames.PROFILE_DETAIL);
  yield put(imagePickerActionCreators.toggleImagePickerDialog(false));
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

function* changePasswordSaga() {
  while (true) {
    const {
      payload,
    }: myProfileActionTypes.submitChangePasswordActionType = yield take(
      myProfileActions.SUBMIT_CHANGE_PASSWORD,
    );
    yield put(myProfileActionCreators.toggleProfileLoading(true));
    yield put(statusActionCreators.updateStatusTitle('Change Password'));
    try {
      const currentUser: login.currentUserData = yield select(
        currentUserSelector,
      );
      yield call(
        validateCurrentPassword,
        currentUser.email,
        payload.currentPass,
      );
      yield call(changePassword, payload.newPass);
      yield put(
        statusActionCreators.updateStatusMsg(
          'Your password has been successfully changed!',
        ),
      );
      yield put(statusActionCreators.toggleApiStatus(true));
      yield put(statusActionCreators.toggleStatusModal(true));
      yield put(myProfileActionCreators.toggleProfileLoading(false));
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        yield put(statusActionCreators.updateStatusMsg('Invalid credential!'));
      } else {
        yield put(
          statusActionCreators.updateStatusMsg(
            'Your password has failed to change!',
          ),
        );
      }
      yield put(statusActionCreators.toggleApiStatus(false));
      yield put(statusActionCreators.toggleStatusModal(true));
      yield put(myProfileActionCreators.toggleProfileLoading(false));
    }
  }
}
