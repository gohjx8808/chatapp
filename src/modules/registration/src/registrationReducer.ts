import {combineReducers} from 'redux';
import {
  registrationActions,
  registrationActionTypes,
} from './registrationActions';

const INITIAL_STATE: registration.State = {
  isRegisterLoading: false,
};

const isRegisterLoading = (
  state = INITIAL_STATE.isRegisterLoading,
  action: registrationActionTypes.toggleRegisterLoadingActionType,
): boolean => {
  switch (action.type) {
    case registrationActions.TOGGLE_REGISTER_LOADING:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers<registration.State>({isRegisterLoading});
