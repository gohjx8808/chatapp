import {combineReducers} from 'redux';
import {loginActions, loginActionTypes} from './loginActions';

const INITIAL_STATE: login.State = {
  isLoginLoading: false,
  currentUser: {
    uid: '',
    name: '',
    email: '',
    photoURL: '',
    gender: '',
    dob: '',
  },
};

const isLoginLoading = (
  state = INITIAL_STATE.isLoginLoading,
  action: loginActionTypes.toggleLoginLoadingActionType,
): boolean => {
  switch (action.type) {
    case loginActions.TOGGLE_LOGIN_LOADING:
      return action.payload;
    default:
      return state;
  }
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

export default combineReducers<login.State>({isLoginLoading, currentUser});
