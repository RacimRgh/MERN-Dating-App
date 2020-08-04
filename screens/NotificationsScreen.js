import React from 'react';
import { View, Text, Button } from 'react-native';

/* Notifications screen
  work in progress
*/

const NotificationsScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile screen</Text>
      <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
      <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
    </View>
  );
};

export default NotificationsScreen;
