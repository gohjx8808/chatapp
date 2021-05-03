import React, {useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Appbar, Avatar, List} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import {chatActionCreators} from '../../chat/src/chatActions';
import chatRouteNames from '../../chat/src/chatRouteNames';
import {navigate, toggleDrawer} from '../../navigation/src/navigationUtils';
import {friendActionCreators} from '../src/friendActions';
import {friendListSelector} from '../src/friendSelectors';
import AddFriendModal from './AddFriendModal';

const FriendListScreen = (props: PropsFromRedux) => {
  const {
    toggleAddFriendModal,
    friendList,
    getFrenList,
    loadSelectedFren,
    getChatMessages,
  } = props;

  useEffect(() => {
    getFrenList();
  }, [getFrenList]);

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => toggleDrawer()} />
        <Appbar.Content title="Messages" />
        <Appbar.Action
          icon="account-plus"
          onPress={() => toggleAddFriendModal(true)}
        />
      </Appbar.Header>
      <ScrollView>
        {friendList.map((fren, index) => {
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
      <AddFriendModal />
    </>
  );
};

const connector = connect(
  (state: GlobalState) => ({
    friendList: friendListSelector(state),
  }),
  {
    toggleAddFriendModal: friendActionCreators.toggleAddFriendModal,
    getFrenList: friendActionCreators.getFriendList,
    loadSelectedFren: chatActionCreators.loadSelectedFren,
    getChatMessages: chatActionCreators.getChatMessages,
  },
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(FriendListScreen);

const styles = StyleSheet.create({
  chatList: {
    backgroundColor: 'white',
    borderColor: '#808080',
    borderBottomWidth: 0.2,
  },
});
