import React from 'react';
import { View, Text, Button } from 'react-native';

// Messages screens
// Work in progress
const MessagesScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile screen</Text>
      <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
      <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
    </View>
  );
};

export default MessagesScreen;
