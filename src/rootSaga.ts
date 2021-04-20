import {all, call} from 'redux-saga/effects';
import chatRuntime from './modules/chat/src/chatSagas';
import loginRuntime from './modules/login/src/loginSagas';
import registrationRuntime from './modules/registration/src/registrationSagas';

export default function* rootSaga() {
  yield all([call(registrationRuntime), call(loginRuntime), call(chatRuntime)]);
}
