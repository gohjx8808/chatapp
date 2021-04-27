declare namespace permission {
  interface State {
    permissionStatus: PermissionStatus;
    permissionType: string;
    isPermissionModalOpen: boolean;
  }

  type PermissionStatus =
    | 'unavailable'
    | 'denied'
    | 'limited'
    | 'granted'
    | 'blocked';
}
