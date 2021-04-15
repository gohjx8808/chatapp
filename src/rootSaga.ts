import {all, call} from 'redux-saga/effects';
import loginRuntime from './modules/login/src/loginSagas';
import registrationRuntime from './modules/registration/src/registrationSagas';

export default function* rootSaga() {
  yield all([call(registrationRuntime), call(loginRuntime)]);
}
