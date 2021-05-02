import {combineReducers} from 'redux';
import chatReducer from './modules/chat/src/chatReducer';
import friendReducer from './modules/friend/src/friendReducer';
import loginReducer from './modules/login/src/loginReducer';
import myProfileReducer from './modules/myProfile/src/myProfileReducer';
import permissionReducer from './modules/permissions/src/permissionReducer';
import registrationReducer from './modules/registration/src/registrationReducer';
import statusReducer from './modules/status/src/statusReducer';

export default combineReducers({
  status: statusReducer,
  registration: registrationReducer,
  login: loginReducer,
  chat: chatReducer,
  permission: permissionReducer,
  myProfile: myProfileReducer,
  friend: friendReducer,
});
