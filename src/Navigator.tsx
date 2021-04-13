import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './modules/login/views/LoginScreen';
import RegistrationScreen from './modules/registration/views/RegistrationScreen';
import StatusModal from './modules/status/views/StatusModal';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="register" component={RegistrationScreen} />
      </Stack.Navigator>
      <StatusModal />
    </NavigationContainer>
  );
};

export default Navigator;
