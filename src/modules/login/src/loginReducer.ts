import {combineReducers} from 'redux';
import {loginActions, loginActionTypes} from './loginActions';

const INITIAL_STATE: login.State = {
  isLoginLoading: false,
};

const isLoginLoading = (
  state = INITIAL_STATE.isLoginLoading,
  action: loginActionTypes.toggleLoginLoadingActionType,
) => {
  switch (action.type) {
    case loginActions.TOGGLE_LOGIN_LOADING:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers<login.State>({isLoginLoading});
