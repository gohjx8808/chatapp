import {combineReducers} from 'redux';
import {statusActions, statusActionTypes} from './statusActions';

const INITIAL_STATE: Status.State = {
  isStatusModalOpen: false,
  statusMsg: '',
  statusTitle: '',
  isApiSuccess: false,
};

const isStatusModalOpen = (
  state = INITIAL_STATE.isStatusModalOpen,
  action: statusActionTypes.toggleStatusModalActionType,
) => {
  switch (action.type) {
    case statusActions.TOGGLE_STATUS_MODAL:
      return action.payload;
    default:
      return state;
  }
};

const statusMsg = (
  state = INITIAL_STATE.statusMsg,
  action: statusActionTypes.updateStatusMsgActionType,
) => {
  switch (action.type) {
    case statusActions.UPDATE_STATUS_MSG:
      return action.payload;
    default:
      return state;
  }
};

const statusTitle = (
  state = INITIAL_STATE.statusTitle,
  action: statusActionTypes.updateStatusTitleActionType,
) => {
  switch (action.type) {
    case statusActions.UPDATE_STATUS_TITLE:
      return action.payload;
    default:
      return state;
  }
};

const isApiSuccess = (
  state = INITIAL_STATE.isApiSuccess,
  action: statusActionTypes.toggleApiStatusActionType,
) => {
  switch (action.type) {
    case statusActions.TOGGLE_API_STATUS:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers<Status.State>({
  isStatusModalOpen,
  statusMsg,
  statusTitle,
  isApiSuccess,
});
