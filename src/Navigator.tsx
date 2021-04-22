import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import 'react-native-gesture-handler';
import {chatNavigator} from './modules/chat/views/ChatNavigator';
import LoginScreen from './modules/login/views/LoginScreen';
import MyProfileScreen from './modules/myProfile/views/MyProfileScreen';
import RegistrationScreen from './modules/registration/views/RegistrationScreen';
import StatusModal from './modules/status/views/StatusModal';
import {navigationRef} from './rootNavigation';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="register" component={RegistrationScreen} />
        <Stack.Screen name="chatNav" component={chatNavigator} />
        <Stack.Screen name="myProfile" component={MyProfileScreen} />
      </Stack.Navigator>
      <StatusModal />
    </NavigationContainer>
  );
};

export default Navigator;
