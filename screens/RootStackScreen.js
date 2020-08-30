import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import Settings from './Settings';
import EditProfile from './EditProfile';
import Home from './HomeTabs';
import { StateProvider } from '../components/store';

const RootStack = createStackNavigator();
/* The RootStackScreen has the Home (the mains app tabs), 
and 2 modals (Settings and Edit Profile) both accessible from
the main menu when online (Home)
*/
const RootStackScreen = () => {
  const getHeaderTitle = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    return routeName;
  };

  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Main"
        component={Home}
        options={({ route, navigation }) => ({
          headerShown: true,
          headerStyle: styles.header,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: getHeaderTitle(route),
        })}
      />
      <RootStack.Screen
        name="Settings"
        component={Settings}
        options={({ route, navigation }) => ({
          headerShown: true,
          headerStyle: styles.header,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: getHeaderTitle(route),
        })}
      />
      <RootStack.Screen
        name="Edit profile"
        component={EditProfile}
        options={({ route, navigation }) => ({
          headerShown: true,
          headerStyle: styles.header,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: getHeaderTitle(route),
        })}
      />
    </RootStack.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    elevation: 0,
    backgroundColor: '#FFE2F1',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
});

export default RootStackScreen;
