import React, {useCallback, useEffect, useState} from 'react';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';

const ChatScreen = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((newMessages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={message => onSend(message)}
      user={{
        _id: 1,
      }}
    />
  );
};

export default ChatScreen;
