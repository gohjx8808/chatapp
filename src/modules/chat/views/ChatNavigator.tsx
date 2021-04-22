import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import 'react-native-gesture-handler';
import ChatListScreen from './ChatListScreen';
import ChatScreen from './ChatScreen';

const ChatStack = createStackNavigator();

export const chatNavigator = () => {
  return (
    <ChatStack.Navigator
      initialRouteName="chatList"
      screenOptions={{headerShown: false}}>
      <ChatStack.Screen name="chatList" component={ChatListScreen} />
      <ChatStack.Screen name="chat" component={ChatScreen} />
    </ChatStack.Navigator>
  );
};
