import {call, fork, put, take} from '@redux-saga/core/effects';
import {statusActionCreators} from '../../status/src/statusActions';
import {
  registrationActions,
  registrationActionTypes,
} from './registrationActions';
import {submitRegister} from './registrationUtils';

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
    try {
      yield call(submitRegister, payload);
      console.log('user created');
      yield put(statusActionCreators.toggleApiStatus(true));
      yield put(statusActionCreators.updateStatusMsg('register success!'));
      yield put(statusActionCreators.toggleStatusModal(true));
    } catch (error) {
      yield put(statusActionCreators.toggleApiStatus(false));
      if (error.code === 'auth/email-already-in-use') {
        yield put(
          statusActionCreators.updateStatusMsg(
            'That email address is already in use!',
          ),
        );
      } else if (error.code === 'auth/invalid-email') {
        yield put(
          statusActionCreators.updateStatusMsg(
            'That email address is invalid!',
          ),
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
