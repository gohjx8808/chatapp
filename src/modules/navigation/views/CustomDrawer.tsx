import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import React from 'react';
import {Image, Platform, StyleSheet, View} from 'react-native';
import {Drawer, Title} from 'react-native-paper';
import assets from '../../../helpers/assets';
import {navigate} from '../src/navigationUtils';
import routeNames from '../src/routeNames';

const CustomDrawer = (props: DrawerContentComponentProps) => {
  let activeIndex = props.state.index;
  let activeRouteName = props.state.routes[activeIndex].name;

  return (
    <View style={styles.wholeFlex}>
      <Image source={assets.corgiSquare} style={styles.corgiImage} />
      <Title style={styles.logoTitle}>ChatApp</Title>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerContainerReadjustment}>
        <Drawer.Item
          label="Messages"
          onPress={() => navigate(routeNames.CHAT_NAV)}
          active={activeRouteName === routeNames.CHAT_NAV}
          icon="chat"
        />
        <Drawer.Item
          label="My Profile"
          onPress={() => navigate(routeNames.MY_PROFILE_NAV)}
          active={activeRouteName === routeNames.MY_PROFILE_NAV}
          icon="account-circle"
        />
        <Drawer.Item
          label="Friend List"
          onPress={() => navigate(routeNames.FRIEND)}
          active={activeRouteName === routeNames.FRIEND}
          icon="account-multiple"
        />
      </DrawerContentScrollView>
      <Drawer.Item
        label="Log Out"
        onPress={() => navigate(routeNames.LOGOUT)}
        active={activeRouteName === routeNames.LOGOUT}
        icon="logout"
      />
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  corgiImage: {
    height: Platform.OS === 'android' ? '20%' : '15%',
    width: Platform.OS === 'android' ? '60%' : '45%',
    alignSelf: 'center',
    marginVertical: '2%',
    borderRadius: 10,
  },
  logoTitle: {
    alignSelf: 'center',
  },
  wholeFlex: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? '5%' : '15%',
  },
  drawerContainerReadjustment: {
    paddingTop: 15,
  },
});
