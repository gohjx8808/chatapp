import {call, fork, put, take} from '@redux-saga/core/effects';
import {
  postSubmitRegister,
  postUpdateProfile,
} from '../../../helpers/firebaseUtils';
import {navigate} from '../../navigation/src/navigationUtils';
import {statusActionCreators} from '../../status/src/statusActions';
import {
  registrationActionCreators,
  registrationActions,
  registrationActionTypes,
} from './registrationActions';
import database from '@react-native-firebase/database';
import routeNames from '../../navigation/src/routeNames';

export default function* registrationRuntime() {
  yield fork(submitRegistrationSaga);
}

function* submitRegistrationSaga() {
  while (true) {
    const {
      payload,
    }: registrationActionTypes.submitRegisterActionType = yield take(
      registrationActions.SUBMIT_REGISTER,
    );
    yield put(registrationActionCreators.toggleRegisterLoading(true));
    try {
      const registerResponse: registration.registerResponse = yield call(
        postSubmitRegister,
        payload,
      );
      const userData = {
        name: payload.displayName,
        email: payload.email,
        photoName: '',
      };
      database().ref(`users/${registerResponse.user.uid}`).set(userData);
      yield call(postUpdateProfile, payload.displayName);
      yield put(registrationActionCreators.toggleRegisterLoading(false));
      yield put(statusActionCreators.toggleApiStatus(true));
      yield put(statusActionCreators.updateStatusMsg('register success!'));
      yield put(statusActionCreators.toggleStatusModal(true));
      navigate(routeNames.LOGIN);
    } catch (error) {
      yield put(registrationActionCreators.toggleRegisterLoading(false));
      yield put(statusActionCreators.toggleApiStatus(false));
      if (error.code === 'auth/email-already-in-use') {
        yield put(
          statusActionCreators.updateStatusMsg(
            'That email address is already in use!',
          ),
        );
      } else if (error.code === 'auth/operation-not-allowed') {
        yield put(
          statusActionCreators.updateStatusMsg('Your account is inactive!'),
        );
      } else {
        yield put(
          statusActionCreators.updateStatusMsg(
            'Something wrong happens, please contact administrator.',
          ),
        );
      }
      yield put(statusActionCreators.toggleStatusModal(true));
    }
  }
}
