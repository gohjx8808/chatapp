import React, {useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Appbar, Avatar, List} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import {navigate, toggleDrawer} from '../../navigation/src/navigationUtils';
import {chatActionCreators} from '../src/chatActions';
import chatRouteNames from '../src/chatRouteNames';
import {chatFrenListSelector} from '../src/chatSelectors';

const ChatListScreen = (props: PropsFromRedux) => {
  const {chatFrenList, loadSelectedFren, getFrenList, getChatMessages} = props;

  useEffect(() => {
    getFrenList();
  }, [getFrenList]);

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => toggleDrawer()} />
        <Appbar.Content title="Messages" />
      </Appbar.Header>
      <ScrollView>
        {chatFrenList.map((fren, index) => {
          return (
            <List.Item
              title={fren.name}
              style={styles.chatList}
              key={index}
              onPress={() => {
                loadSelectedFren(fren);
                getChatMessages();
                navigate(chatRouteNames.CHAT);
              }}
              left={iconProps => (
                <Avatar.Image
                  {...iconProps}
                  source={{
                    uri: fren.photoURL,
                  }}
                  size={36}
                />
              )}
            />
          );
        })}
      </ScrollView>
    </>
  );
};

const connector = connect(
  (state: GlobalState) => ({
    chatFrenList: chatFrenListSelector(state),
  }),
  {
    getFrenList: chatActionCreators.getChatFrenList,
    loadSelectedFren: chatActionCreators.loadSelectedFren,
    getChatMessages: chatActionCreators.getChatMessages,
  },
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ChatListScreen);

const styles = StyleSheet.create({
  chatList: {
    backgroundColor: 'white',
    borderColor: '#808080',
    borderBottomWidth: 0.2,
  },
});
