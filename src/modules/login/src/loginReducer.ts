import {combineReducers} from 'redux';
import {loginActions, loginActionTypes} from './loginActions';

const INITIAL_STATE: login.State = {
  isLoginLoading: false,
  userDetails: {uid: undefined, display_name: undefined, photoURL: undefined},
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

const userDetails = (
  state = INITIAL_STATE.userDetails,
  action: loginActionTypes.storeUserDetailsActionType,
): login.userData => {
  switch (action.type) {
    case loginActions.STORE_USER_DETAILS:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers<login.State>({isLoginLoading, userDetails});
