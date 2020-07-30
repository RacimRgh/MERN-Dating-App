import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';

const DrawerHeader = (props) => {
  return (
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
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#fd5098',
    alignItems: 'flex-end',
  },
  settingsButton: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
});

export default DrawerHeader;
