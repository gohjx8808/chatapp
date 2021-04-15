import {call, fork, put, take} from '@redux-saga/core/effects';
import {statusActionCreators} from '../../status/src/statusActions';
import {loginActions, loginActionTypes} from './loginActions';
import {postSubmitLogin} from './loginUtils';

export default function* loginRuntime() {
  yield fork(submitLoginSaga);
}

function* submitLoginSaga() {
  while (true) {
    const {payload}: loginActionTypes.submitLoginActionType = yield take(
      loginActions.SUBMIT_LOGIN,
    );
    try {
      yield call(postSubmitLogin, payload);
    } catch (error) {
      yield put(statusActionCreators.updateStatusMsg('Invalid credentials!'));
      yield put(statusActionCreators.toggleApiStatus(false));
      yield put(statusActionCreators.toggleStatusModal(true));
    }
  }
}
