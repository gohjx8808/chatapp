declare namespace permission {
  interface State {
    permissionStatus: PermissionStatus;
    permissionType: string;
    isPermissionErrorModalOpen: boolean;
  }

  type PermissionStatus =
    | 'unavailable'
    | 'denied'
    | 'limited'
    | 'granted'
    | 'blocked';
}
