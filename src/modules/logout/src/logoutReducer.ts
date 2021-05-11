import {combineReducers} from 'redux';
import {logoutActions, logoutActionTypes} from './logoutActions';

const INITIAL_STATE: logout.State = {
  isLogoutLoading: false,
};

const isLogoutLoading = (
  state = INITIAL_STATE.isLogoutLoading,
  action: logoutActionTypes.toggleLogoutLoadingActionType,
) => {
  switch (action.type) {
    case logoutActions.TOGGLE_LOGOUT_LOADING:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers<logout.State>({isLogoutLoading});
