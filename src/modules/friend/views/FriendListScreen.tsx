import React, {useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';
import {connect, ConnectedProps} from 'react-redux';
import {toggleDrawer} from '../../navigation/src/navigationUtils';
import {friendActionCreators} from '../src/friendActions';
import AddFrensModal from './AddFrenModal';

const FriendListScreen = (props: PropsFromRedux) => {
  const {toggleAddFrenModal} = props;

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => toggleDrawer()} />
        <Appbar.Content title="Messages" />
        <Appbar.Action
          icon="account-plus"
          onPress={() => toggleAddFrenModal(true)}
        />
      </Appbar.Header>
      <ScrollView>
        <AddFrensModal />
      </ScrollView>
    </>
  );
};

const connector = connect(null, {
  toggleAddFrenModal: friendActionCreators.toggleAddFrenModal,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(FriendListScreen);

const styles = StyleSheet.create({
  chatList: {
    backgroundColor: 'white',
    borderColor: '#808080',
    borderBottomWidth: 0.2,
  },
});
