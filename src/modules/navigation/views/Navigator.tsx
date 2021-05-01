import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import 'react-native-gesture-handler';
import {chatNavigator} from '../../chat/views/ChatNavigator';
import LoginScreen from '../../login/views/LoginScreen';
import MyProfileScreen from '../../myProfile/views/MyProfileScreen';
import RegistrationScreen from '../../registration/views/RegistrationScreen';
import StatusModal from '../../status/views/StatusModal';
import {navigationRef} from '../src/navigationUtils';
import routeNames from '../src/routeNames';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import PermissionErrorModal from '../../permissions/views/PermissionErrorModal';
import ImagePickerDialog from '../../myProfile/views/ImagePickerDialog';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DashboardNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName={routeNames.CHAT_NAV}
      drawerContent={drawerProps => <CustomDrawer {...drawerProps} />}>
      <Drawer.Screen name={routeNames.CHAT_NAV} component={chatNavigator} />
      <Drawer.Screen name={routeNames.MY_PROFILE} component={MyProfileScreen} />
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
