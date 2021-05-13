import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import myProfileRouteNames from '../src/myProfileRouteNames';
import ChangePasswordScreen from './ChangePasswordScreen';
import ProfileDetailScreen from './ProfileDetailScreen';
import ViewProfilePictureScreen from './ViewProfilePictureScreen';

const ProfileDetailNavigator = () => {
  const ProfileDetailStack = createStackNavigator();

  return (
    <ProfileDetailStack.Navigator
      initialRouteName={myProfileRouteNames.MY_PROFILE_NAV}
      screenOptions={{headerShown: false}}>
      <ProfileDetailStack.Screen
        name={myProfileRouteNames.MY_PROFILE_NAV}
        component={MyProfileNavigator}
      />
      <ProfileDetailStack.Screen
        name={myProfileRouteNames.VIEW_PROFILE_PICTURE}
        component={ViewProfilePictureScreen}
      />
    </ProfileDetailStack.Navigator>
  );
};

const MyProfileNavigator = () => {
  const MyProfileTab = createMaterialBottomTabNavigator();
  const {colors} = useTheme();

  return (
    <MyProfileTab.Navigator
      initialRouteName={myProfileRouteNames.PROFILE_DETAIL}
      shifting={true}
      barStyle={{backgroundColor: colors.primary}}>
      <MyProfileTab.Screen
        name={myProfileRouteNames.PROFILE_DETAIL}
        component={ProfileDetailScreen}
        options={{
          tabBarLabel: 'Profile Detail',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="account-details"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <MyProfileTab.Screen
        name={myProfileRouteNames.CHANGE_PASSWORD}
        component={ChangePasswordScreen}
        options={{
          tabBarLabel: 'Security',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="lock" color={color} size={26} />
          ),
        }}
      />
    </MyProfileTab.Navigator>
  );
};

export default ProfileDetailNavigator;
