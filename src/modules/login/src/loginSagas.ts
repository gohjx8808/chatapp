import {call, fork, put, take} from '@redux-saga/core/effects';
import {postSubmitLogin} from '../../../helpers/firebaseUtils';
import {navigate} from '../../../rootNavigation';
import {statusActionCreators} from '../../status/src/statusActions';
import {
  loginActionCreators,
  loginActions,
  loginActionTypes,
} from './loginActions';
import auth from '@react-native-firebase/auth';

export default function* loginRuntime() {
  yield fork(submitLoginSaga);
}

function* submitLoginSaga() {
  while (true) {
    const {payload}: loginActionTypes.submitLoginActionType = yield take(
      loginActions.SUBMIT_LOGIN,
    );
    yield put(loginActionCreators.toggleLoginLoading(true));
    try {
      yield call(postSubmitLogin, payload);
      yield put(loginActionCreators.toggleLoginLoading(false));
      const currentUserData = auth().currentUser;
      const userDetail = {
        uid: currentUserData?.uid,
        display_name: currentUserData?.displayName,
        photoURL: currentUserData?.photoURL,
      };
      yield put(loginActionCreators.storeUserDetails(userDetail));
      navigate('chatNav');
    } catch (error) {
      yield put(statusActionCreators.updateStatusMsg('Invalid credentials!'));
      yield put(statusActionCreators.toggleApiStatus(false));
      yield put(statusActionCreators.toggleStatusModal(true));
      yield put(loginActionCreators.toggleLoginLoading(false));
    }
  }
}
