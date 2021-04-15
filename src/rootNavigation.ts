import {NavigationContainerRef} from '@react-navigation/core';
import React from 'react';

export const navigationRef: React.RefObject<NavigationContainerRef> = React.createRef();

export const navigate = (name: string) => {
  navigationRef.current?.navigate(name);
};
