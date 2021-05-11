import {all, call} from 'redux-saga/effects';
import chatRuntime from './modules/chat/src/chatSagas';
import friendRuntime from './modules/friend/src/friendSagas';
import loginRuntime from './modules/login/src/loginSagas';
import logoutRuntime from './modules/logout/src/logoutSagas';
import myProfileRuntime from './modules/myProfile/src/myProfileSagas';
import permissionRuntime from './modules/permissions/src/permissionSagas';
import registrationRuntime from './modules/registration/src/registrationSagas';

export default function* rootSaga() {
  yield all([
    call(registrationRuntime),
    call(loginRuntime),
    call(chatRuntime),
    call(permissionRuntime),
    call(myProfileRuntime),
    call(friendRuntime),
    call(logoutRuntime),
  ]);
}
