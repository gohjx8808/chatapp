import {combineReducers} from 'redux';
import {permissionActions, permissionActionTypes} from './permissionActions';

const INITIAL_STATE: permission.State = {
  permissionStatus: 'denied',
  permissionType: '',
  isPermissionModalOpen: false,
};

const permissionStatus = (
  state = INITIAL_STATE.permissionStatus,
  action: permissionActionTypes.updatePermissionStatusActionType,
): permission.PermissionStatus => {
  switch (action.type) {
    case permissionActions.UPDATE_PERMISSION_STATUS:
      return action.payload;
    default:
      return state;
  }
};

const permissionType = (
  state = INITIAL_STATE.permissionType,
  action: permissionActionTypes.updatePermissionTypeActionType,
): string => {
  switch (action.type) {
    case permissionActions.UPDATE_PERMISSION_TYPE:
      return action.payload;
    default:
      return state;
  }
};

const isPermissionModalOpen = (
  state = INITIAL_STATE.isPermissionModalOpen,
  action: permissionActionTypes.togglePermissionModalActionType,
): boolean => {
  switch (action.type) {
    case permissionActions.TOGGLE_PERMISSION_MODAL:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers<permission.State>({
  permissionStatus,
  permissionType,
  isPermissionModalOpen,
});
