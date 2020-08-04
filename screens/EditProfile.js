import React from 'react';
import { View, Text, Button } from 'react-native';

const EditProfile = ({ navigation }) => {
  /* Here the user can edit his profile by
  adding/deleting/updating his informations
  */
  return (
    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile screen</Text>
      <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
      <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
    </View>
  );
};

export default EditProfile;
