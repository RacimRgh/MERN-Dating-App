import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { StateProvider } from '../services/store';
import EditProfile from './EditProfile';
import Home from './HomeTabs';
import Settings from './Settings';
import FilterScreen from './FilterScreen';
import ChatRoom from './ChatRoom';

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
        name="Profil"
        component={Home}
        options={({ route, navigation }) => ({
          headerShown: true,
          headerStyle: styles.header,
          headerTitleStyle: {
            fontSize: 30,
            fontFamily: 'DancingScript-Bold',
          },
          headerTitle: getHeaderTitle(route),
        })}
      />
      <RootStack.Screen
        name="Paramètres"
        component={Settings}
        options={({ route, navigation }) => ({
          headerShown: true,
          headerStyle: styles.header,
          headerTitleStyle: {
            fontSize: 30,
            fontFamily: 'DancingScript-Bold',
          },
          headerTitle: getHeaderTitle(route),
        })}
      />
      <RootStack.Screen
        name="Modifier mon profil"
        component={EditProfile}
        options={({ route, navigation }) => ({
          headerShown: true,
          headerStyle: styles.header,
          headerTitleStyle: {
            fontSize: 30,
            fontFamily: 'DancingScript-Bold',
          },
          headerTitle: getHeaderTitle(route),
        })}
      />
      <RootStack.Screen
        name="Filtre"
        component={FilterScreen}
        options={({ route, navigation }) => ({
          headerShown: true,
          headerStyle: styles.header,
          headerTitleStyle: {
            fontSize: 30,
            fontFamily: 'DancingScript-Bold',
          },
          headerTitle: getHeaderTitle(route),
        })}
      />
      <RootStack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={({ route, navigation }) => ({
          headerShown: true,
          headerStyle: styles.header,
          headerTitleStyle: {
            fontSize: 30,
            fontFamily: 'DancingScript-Bold',
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
    backgroundColor: '#F9E7E7',
    // backgroundColor: '#ECCFC3',
    // backgroundColor: '#FFE2F1',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
});

export default RootStackScreen;
