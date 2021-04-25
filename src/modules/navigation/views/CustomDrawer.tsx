import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Drawer, Title} from 'react-native-paper';
import assets from '../../../helpers/assets';
import {navigate} from '../src/navigationUtils';
import routeNames from '../src/routeNames';

const CustomDrawer = (props: DrawerContentComponentProps) => {
  let activeIndex = props.state.index;
  let activeRouteName = props.state.routes[activeIndex].name;

  return (
    <DrawerContentScrollView {...props}>
      <Image source={assets.corgiSquare} style={styles.corgiImage} />
      <Title style={styles.logoTitle}>ChatApp</Title>
      <Drawer.Item
        label="Messages"
        onPress={() => navigate(routeNames.CHAT_NAV)}
        active={activeRouteName === routeNames.CHAT_NAV}
        icon="chat"
      />
      <Drawer.Item
        label="My Profile"
        onPress={() => navigate(routeNames.MY_PROFILE)}
        active={activeRouteName === routeNames.MY_PROFILE}
        icon="account-circle"
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  corgiImage: {
    height: '80%',
    width: '40%',
    alignSelf: 'center',
    marginVertical: '2%',
    borderRadius: 10,
  },
  logoTitle: {
    alignSelf: 'center',
  },
});
