import {createSelector} from 'reselect';

const permissionSelector = (state: GlobalState) => state.permission;

export const permissionTypeSelector = createSelector(
  permissionSelector,
  permission => permission.permissionType,
);

export const permissionStatusSelector = createSelector(
  permissionSelector,
  permission => permission.permissionStatus,
);

export const isPermissionErrorModalOpenSelector = createSelector(
  permissionSelector,
  permission => permission.isPermissionErrorModalOpen,
);
