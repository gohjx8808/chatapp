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

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={routeNames.CHAT_NAV}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={routeNames.LOGIN} component={LoginScreen} />
        <Stack.Screen
          name={routeNames.REGISTER}
          component={RegistrationScreen}
        />
        <Stack.Screen name={routeNames.CHAT_NAV} component={chatNavigator} />
        <Stack.Screen
          name={routeNames.MY_PROFILE}
          component={MyProfileScreen}
        />
      </Stack.Navigator>
      <StatusModal />
    </NavigationContainer>
  );
};

export default Navigator;
