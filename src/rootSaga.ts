import {all, call} from 'redux-saga/effects';
import registrationRuntime from './modules/registration/src/registrationSagas';

export default function* rootSaga() {
  yield all([call(registrationRuntime)]);
}
