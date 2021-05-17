import {createSelector} from 'reselect';

const loadingOverlaySelector = (state: GlobalState) => state.loadingOverlay;

export const isLoadingOverlayOpenSelector = createSelector(
  loadingOverlaySelector,
  loadingOverlay => loadingOverlay.isLoadingOverlayOpen,
);
