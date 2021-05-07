import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Appbar, Avatar, List, Searchbar} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import GlobalStyles from '../../../helpers/globalStyles';
import {chatActionCreators} from '../../chat/src/chatActions';
import chatRouteNames from '../../chat/src/chatRouteNames';
import {navigate, toggleDrawer} from '../../navigation/src/navigationUtils';
import {friendActionCreators} from '../src/friendActions';
import {friendListSelector} from '../src/friendSelectors';
import AddFriendModal from './AddFriendModal';

const FriendListScreen = (props: PropsFromRedux) => {
  const {
    toggleAddFriendModal,
    loadSelectedFren,
    getChatMessages,
    getFriendList,
    friendList,
  } = props;

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getFriendList();
  }, [getFriendList]);

  const renderFriend = ({item}: {item: frenDetails}) => {
    if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return (
        <List.Item
          title={item.name}
          style={styles.chatList}
          key={item.uid}
          onPress={() => {
            loadSelectedFren(item);
            getChatMessages();
            navigate(chatRouteNames.CHAT);
          }}
          left={iconProps => (
            <Avatar.Image
              {...iconProps}
              source={{
                uri: item.photoURL,
              }}
              size={36}
            />
          )}
        />
      );
    }
    return <View />;
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => toggleDrawer()} />
        <Appbar.Content title="Friends" />
        <Appbar.Action
          icon="account-plus"
          onPress={() => toggleAddFriendModal(true)}
        />
      </Appbar.Header>
      <Searchbar
        placeholder="Search"
        onChangeText={query => setSearchQuery(query)}
        value={searchQuery}
        style={GlobalStyles.fullWidthSearchBar}
      />
      <FlatList
        data={friendList}
        renderItem={renderFriend}
        keyExtractor={item => item.uid}
      />
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
    loadSelectedFren: chatActionCreators.loadSelectedFren,
    getChatMessages: chatActionCreators.getChatMessages,
    getFriendList: friendActionCreators.getFriendList,
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
