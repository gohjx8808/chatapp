import React from 'react';
import {ScrollView} from 'react-native';
import {Appbar} from 'react-native-paper';
import {toggleDrawer} from '../../navigation/src/navigationUtils';

const MyProfileScreen = () => {
  return (
    <ScrollView>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => toggleDrawer()} />
        <Appbar.Content title="My Profile" />
        <Appbar.Action icon="plus-circle-outline" />
      </Appbar.Header>
    </ScrollView>
  );
};

export default MyProfileScreen;
