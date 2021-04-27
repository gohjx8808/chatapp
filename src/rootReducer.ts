import {combineReducers} from 'redux';
import chatReducer from './modules/chat/src/chatReducer';
import loginReducer from './modules/login/src/loginReducer';
import permissionReducer from './modules/permissions/src/permissionReducer';
import registrationReducer from './modules/registration/src/registrationReducer';
import statusReducer from './modules/status/src/statusReducer';

export default combineReducers({
  status: statusReducer,
  registration: registrationReducer,
  login: loginReducer,
  chat: chatReducer,
  permission: permissionReducer,
});
