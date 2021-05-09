import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import myProfileRouteNames from '../src/myProfileRouteNames';
import MyProfileScreen from './MyProfileScreen';
import ViewProfilePictureScreen from './ViewProfilePictureScreen';

const MyProfileNavigator = () => {
  const ProfileStack = createStackNavigator();

  return (
    <ProfileStack.Navigator
      initialRouteName={myProfileRouteNames.MY_PROFILE}
      screenOptions={{headerShown: false}}>
      <ProfileStack.Screen
        name={myProfileRouteNames.MY_PROFILE}
        component={MyProfileScreen}
      />
      <ProfileStack.Screen
        name={myProfileRouteNames.VIEW_PROFILE_PICTURE}
        component={ViewProfilePictureScreen}
      />
    </ProfileStack.Navigator>
  );
};

export default MyProfileNavigator;
