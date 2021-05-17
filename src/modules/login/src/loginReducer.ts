import {combineReducers} from 'redux';
import {loginActions, loginActionTypes} from './loginActions';

const INITIAL_STATE: login.State = {
  currentUser: {
    uid: '',
    name: '',
    email: '',
    photoURL: '',
    photoName: '',
    gender: '',
    dob: '',
  },
};

const currentUser = (
  state = INITIAL_STATE.currentUser,
  action: loginActionTypes.storeUserDetailsActionType,
): login.currentUserData => {
  switch (action.type) {
    case loginActions.STORE_USER_DETAILS:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers<login.State>({currentUser});
