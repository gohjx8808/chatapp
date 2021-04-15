import {combineReducers} from 'redux';
import registrationReducer from './modules/registration/src/registrationReducer';
import statusReducer from './modules/status/src/statusReducer';

export default combineReducers({
  status: statusReducer,
  registration: registrationReducer,
});
