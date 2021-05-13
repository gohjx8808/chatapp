import {combineReducers} from 'redux';
import {myProfileActions, myProfileActionTypes} from './myProfileActions';

const INITIAL_STATE: myProfile.State = {
  isProfileLoading: false,
};

const isProfileLoading = (
  state = INITIAL_STATE.isProfileLoading,
  action: myProfileActionTypes.toggleProfileLoadingActionType,
): boolean => {
  switch (action.type) {
    case myProfileActions.TOGGLE_PROFILE_LOADING:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers<myProfile.State>({
  isProfileLoading,
});
