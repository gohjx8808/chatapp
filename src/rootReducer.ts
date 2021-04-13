import {combineReducers} from 'redux';
import statusReducer from './modules/status/src/statusReducer';

export default combineReducers({
  status: statusReducer,
});
