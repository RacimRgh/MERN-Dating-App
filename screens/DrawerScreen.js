import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import DrawerHeader from '../components/DrawerHeader';

const DrawerScreen = (props) => {
  const { onPressLogout } = props;
  return (
    <DrawerContentScrollView {...props}>
      <DrawerHeader {...props} />
      <View style={styles.container}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Settings"
          onPress={() => props.navigation.navigate('Settings')}
        />
        <DrawerItem
          label="Edit my profile"
          onPress={() => props.navigation.navigate('Edit profile')}
        />
        <DrawerItem label="Sign out" onPress={onPressLogout} />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
});

export default DrawerScreen;
