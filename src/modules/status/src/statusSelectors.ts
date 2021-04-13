import {createSelector} from 'reselect';

const statusSelector = (state: GlobalState) => state.status;

export const isStatusModalOpenSelector = createSelector(
  statusSelector,
  status => status.isStatusModalOpen,
);

export const statusMsgSelector = createSelector(
  statusSelector,
  status => status.statusMsg,
);

export const statusTitleSelector = createSelector(
  statusSelector,
  status => status.statusTitle,
);

export const isApiSuccessSelector = createSelector(
  statusSelector,
  status => status.isApiSuccess,
);
