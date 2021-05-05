import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Appbar, Avatar, List, Searchbar} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import assets from '../../../helpers/assets';
import GlobalStyles from '../../../helpers/globalStyles';
import {chatActionCreators} from '../../chat/src/chatActions';
import chatRouteNames from '../../chat/src/chatRouteNames';
import {currentUserSelector} from '../../login/src/loginSelectors';
import {navigate, toggleDrawer} from '../../navigation/src/navigationUtils';
import {friendActionCreators} from '../src/friendActions';
import AddFriendModal from './AddFriendModal';

const FriendListScreen = (props: PropsFromRedux) => {
  const {
    toggleAddFriendModal,
    loadSelectedFren,
    getChatMessages,
    currentUser,
  } = props;

  const [friendList, setFriendList] = useState<frenData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const targetDatabaseRef = `/users/${currentUser.uid}/friends`;
    const getFrenList = database()
      .ref(targetDatabaseRef)
      .on('value', frenSnapshots => {
        setFriendList([]);
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
                setFriendList(prevFriendList => [
                  ...prevFriendList,
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
                    setFriendList(prevFriendList => [
                      ...prevFriendList,
                      chatFrenData,
                    ]);
                  });
              }
            });
          return undefined;
        });
      });
    return () => database().ref(targetDatabaseRef).off('value', getFrenList);
  }, [currentUser.uid]);

  const renderFriend = ({item}: {item: frenData}) => {
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
    currentUser: currentUserSelector(state),
  }),
  {
    toggleAddFriendModal: friendActionCreators.toggleAddFriendModal,
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
