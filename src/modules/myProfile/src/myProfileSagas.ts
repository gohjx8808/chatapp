import {call, fork, put, select, take} from '@redux-saga/core/effects';
import {
  changePassword,
  defaultAvatar,
  postDeletePrevUploadedPhoto,
  postUpdateCurrentUserProfile,
  validateCurrentPassword,
} from '../../../helpers/firebaseUtils';
import {
  imagePickerActionCreators,
  imagePickerActions,
  imagePickerActionTypes,
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
  yield fork(uploadPictureToFirebaseSaga);
}

function* selectProfilePhotoSaga() {
  while (true) {
    yield take(myProfileActions.UPDATE_PROFILE_PHOTO);
    yield put(imagePickerActionCreators.toggleImagePickerDialog(true));
  }
}

function* uploadPictureToFirebaseSaga() {
  while (true) {
    const updatedImageName: imagePickerActionTypes.updateUploadedPhotoNameActionType = yield take(
      imagePickerActions.UPDATE_UPLOADED_PHOTO_NAME,
    );
    const currentUser: login.currentUserData = yield select(
      currentUserSelector,
    );
    yield call(
      postUpdateCurrentUserProfile,
      {photoName: updatedImageName.payload},
      currentUser.uid,
    );
    if (
      currentUser.photoName !== defaultAvatar.chatBot &&
      currentUser.photoName !== ''
    ) {
      yield call(postDeletePrevUploadedPhoto, currentUser.photoName);
    }
    yield put(imagePickerActionCreators.toggleImagePickerDialog(false));
    navigate(myProfileRouteNames.PROFILE_DETAIL);
  }
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
