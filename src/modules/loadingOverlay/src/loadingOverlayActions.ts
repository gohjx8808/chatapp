export class loadingOverlayActions {
  public static readonly TOGGLE_LOADING_OVERLAY =
    'LOADING_OVERLAY/TOGGLE_LOADING_OVERLAY';
}

export declare namespace loadingOverlayActionTypes {
  type toggleLoadingOverlayActionType = ActionWithPayload<
    typeof loadingOverlayActions.TOGGLE_LOADING_OVERLAY,
    boolean
  >;
}

export class loadingOverlayActionCreators {
  public static toggleLoadingOverlay = (
    payload: boolean,
  ): loadingOverlayActionTypes.toggleLoadingOverlayActionType => ({
    type: loadingOverlayActions.TOGGLE_LOADING_OVERLAY,
    payload,
  });
}
