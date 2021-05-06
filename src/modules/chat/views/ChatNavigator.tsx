import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import 'react-native-gesture-handler';
import chatRouteNames from '../src/chatRouteNames';
import ChatFriendDetailScreen from './ChatFriendDetailScreen';
import ChatListScreen from './ChatListScreen';
import ChatScreen from './ChatScreen';

const ChatStack = createStackNavigator();

export const chatNavigator = () => {
  return (
    <ChatStack.Navigator
      initialRouteName={chatRouteNames.CHAT_LIST}
      screenOptions={{headerShown: false}}>
      <ChatStack.Screen
        name={chatRouteNames.CHAT_LIST}
        component={ChatListScreen}
      />
      <ChatStack.Screen name={chatRouteNames.CHAT} component={ChatScreen} />
      <ChatStack.Screen
        name={chatRouteNames.CHAT_FRIEND_DETAIL}
        component={ChatFriendDetailScreen}
      />
    </ChatStack.Navigator>
  );
};
