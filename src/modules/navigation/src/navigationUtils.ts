import {DrawerActions, NavigationContainerRef} from '@react-navigation/core';
import React from 'react';

export const navigationRef: React.RefObject<NavigationContainerRef> = React.createRef();

export const navigate = (name: string) => {
  navigationRef.current?.navigate(name);
};

export const goBack = () => {
  navigationRef.current?.goBack();
};

export const toggleDrawer = () => {
  navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
};
