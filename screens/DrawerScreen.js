import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import DrawerHeader from '../components/DrawerHeader';
import { store } from '../components/store';

const DrawerScreen = (props) => {
  const globalState = useContext(store);
  const { dispatch } = globalState;
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
        <DrawerItem
          label="Sign out"
          onPress={() => {
            dispatch({ type: 'logout' });
            props.navigation.navigate('Main');
          }}
        />
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
