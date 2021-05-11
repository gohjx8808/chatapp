import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import 'react-native-gesture-handler';
import {chatNavigator} from '../../chat/views/ChatNavigator';
import FriendListScreen from '../../friend/views/FriendListScreen';
import LoginScreen from '../../login/views/LoginScreen';
import LogoutScreen from '../../logout/views/LogoutScreen';
import ImagePickerDialog from '../../myProfile/views/ImagePickerDialog';
import MyProfileNavigator from '../../myProfile/views/MyProfileNavigator';
import PermissionErrorModal from '../../permissions/views/PermissionErrorModal';
import RegistrationScreen from '../../registration/views/RegistrationScreen';
import StatusModal from '../../status/views/StatusModal';
import {navigationRef} from '../src/navigationUtils';
import routeNames from '../src/routeNames';
import CustomDrawer from './CustomDrawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DashboardNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName={routeNames.CHAT_NAV}
      drawerContent={drawerProps => <CustomDrawer {...drawerProps} />}>
      <Drawer.Screen name={routeNames.CHAT_NAV} component={chatNavigator} />
      <Drawer.Screen
        name={routeNames.MY_PROFILE_NAV}
        component={MyProfileNavigator}
      />
      <Drawer.Screen name={routeNames.FRIEND} component={FriendListScreen} />
      <Drawer.Screen name={routeNames.LOGOUT} component={LogoutScreen} />
    </Drawer.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={routeNames.LOGIN}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={routeNames.LOGIN} component={LoginScreen} />
        <Stack.Screen
          name={routeNames.REGISTER}
          component={RegistrationScreen}
        />
        <Stack.Screen
          name={routeNames.DASHBOARD_NAV}
          component={DashboardNavigator}
        />
      </Stack.Navigator>
      <StatusModal />
      <PermissionErrorModal />
      <ImagePickerDialog />
    </NavigationContainer>
  );
};

export default Navigator;
