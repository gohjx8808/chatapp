import {call, fork, put, take} from '@redux-saga/core/effects';
import {logout} from '../../../helpers/firebaseUtils';
import {loadingOverlayActionCreators} from '../../loadingOverlay/src/loadingOverlayActions';
import {navigate} from '../../navigation/src/navigationUtils';
import routeNames from '../../navigation/src/routeNames';
import {statusActionCreators} from '../../status/src/statusActions';
import {logoutActions} from './logoutActions';

export default function* logoutRuntime() {
  yield fork(submitLogoutSaga);
}

function* submitLogoutSaga() {
  while (true) {
    yield take(logoutActions.SUBMIT_LOGOUT);
    yield put(loadingOverlayActionCreators.toggleLoadingOverlay(true));
    try {
      yield call(logout);
      yield put(loadingOverlayActionCreators.toggleLoadingOverlay(false));
      navigate(routeNames.LOGIN);
    } catch (error) {
      yield put(statusActionCreators.updateStatusTitle('Logout'));
      yield put(
        statusActionCreators.updateStatusMsg(
          'Fail to log out! Please check your network connection.',
        ),
      );
      yield put(statusActionCreators.toggleApiStatus(false));
      yield put(loadingOverlayActionCreators.toggleLoadingOverlay(false));
      yield put(statusActionCreators.toggleStatusModal(true));
    }
  }
}
