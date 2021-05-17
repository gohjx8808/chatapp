import {combineReducers} from 'redux';
import {
  loadingOverlayActions,
  loadingOverlayActionTypes,
} from './loadingOverlayActions';

const INITIAL_STATE: loadingOverlay.State = {
  isLoadingOverlayOpen: false,
};

const isLoadingOverlayOpen = (
  state = INITIAL_STATE.isLoadingOverlayOpen,
  action: loadingOverlayActionTypes.toggleLoadingOverlayActionType,
): boolean => {
  switch (action.type) {
    case loadingOverlayActions.TOGGLE_LOADING_OVERLAY:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers<loadingOverlay.State>({isLoadingOverlayOpen});
