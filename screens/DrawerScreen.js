import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DrawerHeader from '../components/DrawerHeader';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const DrawerScreen = (props) => {
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
