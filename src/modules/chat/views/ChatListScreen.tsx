import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Appbar, Avatar, List, Searchbar} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import assets from '../../../helpers/assets';
import GlobalStyles from '../../../helpers/globalStyles';
import {currentUserSelector} from '../../login/src/loginSelectors';
import {navigate, toggleDrawer} from '../../navigation/src/navigationUtils';
import {chatActionCreators} from '../src/chatActions';
import chatRouteNames from '../src/chatRouteNames';

const ChatListScreen = (props: PropsFromRedux) => {
  const {loadSelectedFren, getChatMessages, currentUser} = props;
  const [chatFrenList, setChatFrenList] = useState<frenData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const targetDatabaseRef = `/chat/${currentUser.uid}`;
    const getChatFrenList = database()
      .ref(targetDatabaseRef)
      .on('value', frenSnapshots => {
        setChatFrenList([]);
        frenSnapshots.forEach(frenSnapshot => {
          const frenID = frenSnapshot.key!;
          const userDatabaseRef = `/users/${frenID}`;
          database()
            .ref(userDatabaseRef)
            .once('value', (userSnapshot: any) => {
              if (userSnapshot.val().photoName === '') {
                const chatFrenData = {
                  uid: frenID,
                  name: userSnapshot.val().name,
                  photoURL: assets.defaultUser,
                };
                setChatFrenList(prevChatFriendList => [
                  ...prevChatFriendList,
                  chatFrenData,
                ]);
              } else {
                storage()
                  .ref(`/${userSnapshot.val().photoName}`)
                  .getDownloadURL()
                  .then(photoURL => {
                    const chatFrenData = {
                      uid: frenID,
                      name: userSnapshot.val().name,
                      photoURL: photoURL,
                    };
                    setChatFrenList(prevChatFriendList => [
                      ...prevChatFriendList,
                      chatFrenData,
                    ]);
                  });
              }
            });
          return undefined;
        });
      });
    return () =>
      database().ref(targetDatabaseRef).off('value', getChatFrenList);
  }, [currentUser.uid]);

  const renderChatFriend = ({item}: {item: frenData}) => {
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
        <Appbar.Content title="Messages" />
      </Appbar.Header>
      <Searchbar
        placeholder="Search"
        onChangeText={query => setSearchQuery(query)}
        value={searchQuery}
        style={GlobalStyles.fullWidthSearchBar}
      />
      <FlatList
        data={chatFrenList}
        renderItem={renderChatFriend}
        keyExtractor={item => item.uid}
      />
    </>
  );
};

const connector = connect(
  (state: GlobalState) => ({
    currentUser: currentUserSelector(state),
  }),
  {
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
