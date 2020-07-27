import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const DrawerScreen = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Settings')}
          style={styles.settingsButton}>
          <Icon
            size={35}
            type="Ionicons"
            name="ios-settings"
            color="rgba(255,255,255, 0.9)"
            {...props}
          />
        </TouchableOpacity>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Settings"
        onPress={() => props.navigation.navigate('Settings')}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fd5098',
    marginTop: 0,
    height: 60,
  },
  settingsButton: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
});

export default DrawerScreen;
