import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from './Settings';
import EditProfile from './EditProfile';
import Home from './HomeTabs';

const RootStack = createStackNavigator();
/* The RootStackScreen has the Home (the mains app tabs), 
and 2 modals (Settings and Edit Profile) both accessible from
the main menu when online (Home)
*/
const RootStackScreen = () => {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Main"
        component={Home}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fd5098',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <RootStack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Settings',
          headerStyle: { backgroundColor: '#fd5098' },
        }}
      />
      <RootStack.Screen
        name="Edit profile"
        component={EditProfile}
        options={{
          title: 'Edit profile',
          headerStyle: { backgroundColor: '#fd5098' },
        }}
      />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
