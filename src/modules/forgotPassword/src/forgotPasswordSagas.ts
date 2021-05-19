import {call, fork, put, take} from '@redux-saga/core/effects';
import {sendPasswordResetEmail} from '../../../helpers/firebaseUtils';
import {loadingOverlayActionCreators} from '../../loadingOverlay/src/loadingOverlayActions';
import {statusActionCreators} from '../../status/src/statusActions';
import {
  forgotPasswordActions,
  forgotPasswordActionTypes,
} from './forgotPasswordActions';

export function* forgotPasswordRuntime() {
  yield fork(submitForgotPasswordSaga);
}

function* submitForgotPasswordSaga() {
  while (true) {
    const {
      payload,
    }: forgotPasswordActionTypes.submitForgotPasswordActionType = yield take(
      forgotPasswordActions.SUBMIT_FORGOT_PASSWORD,
    );
    yield put(loadingOverlayActionCreators.toggleLoadingOverlay(true));
    yield put(statusActionCreators.updateStatusTitle('Forgot Password'));
    try {
      yield call(sendPasswordResetEmail, payload);
      yield put(statusActionCreators.toggleApiStatus(true));
      yield put(
        statusActionCreators.updateStatusMsg(
          'An email with a link to reset your password is sent to your email.',
        ),
      );
      yield put(loadingOverlayActionCreators.toggleLoadingOverlay(false));
      yield put(statusActionCreators.toggleStatusModal(true));
    } catch (error) {
      yield put(statusActionCreators.toggleApiStatus(false));
      if (error.code === 'auth/user-not-found') {
        yield put(
          statusActionCreators.updateStatusMsg('The email is not registered!'),
        );
      } else {
        yield put(
          statusActionCreators.updateStatusMsg(
            "Something' wrong. Please contact the administrator or try again later.",
          ),
        );
      }
      yield put(loadingOverlayActionCreators.toggleLoadingOverlay(false));
      yield put(statusActionCreators.toggleStatusModal(true));
    }
  }
}
