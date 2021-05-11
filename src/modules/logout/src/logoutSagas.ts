import {fork, take} from '@redux-saga/core/effects';
import {logoutActions} from './logoutActions';

export default function* logoutRuntime() {
  yield fork(submitLogoutSaga);
}

function* submitLogoutSaga() {
  while (true) {
    yield take(logoutActions.SUBMIT_LOGOUT);
  }
}
