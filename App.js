import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
// Local Imports
// screens
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import DrawerScreen from './screens/DrawerScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import MessagesScreen from './screens/MessagesScreen';
import SearchScreen from './screens/SearchScreen';
import Settings from './screens/Settings';
import EditProfile from './screens/EditProfile';
// components
import TabBarIcon from './components/TabBarIcon';
import images from './components/Images';

const RootStack = createStackNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const Home = ({ navigation }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Profile') {
            iconName = focused ? images.profilHommeActif : images.profilHomme;
          } else if (route.name === 'Recherche') {
            iconName = focused ? images.rechercheActif : images.recherche;
          } else if (route.name === 'Drawer') {
            iconName = focused ? images.menuIconActif : images.menuIcon;
          } else if (route.name === 'Messages') {
            iconName = focused ? images.messageActif : images.message;
          } else if (route.name === 'Notifications') {
            iconName = focused
              ? images.notificationsActif
              : images.notifications;
          }
          return route.name === 'Drawer' ? (
            <TabBarIcon
              pathIcon={iconName}
              onPressTab={() => navigation.openDrawer()}
            />
          ) : (
            <TabBarIcon
              pathIcon={iconName}
              onPressTab={() => navigation.navigate(route.name)}
            />
          );
        },
      })}
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: '#5dbcd2',
        },
      }}>
      <Drawer.Screen name="Drawer" component={DrawerScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Recherche" component={SearchScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
    </Tab.Navigator>
  );
};

const RootStackScreen = () => {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Main"
        component={Home}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Settings"
        component={Settings}
        options={{ headerStyle: { backgroundColor: '#fd5098' } }}
      />
      <RootStack.Screen
        name="Edit profile"
        component={EditProfile}
        options={{ headerStyle: { backgroundColor: '#fd5098' } }}
      />
    </RootStack.Navigator>
  );
};
const App = () => {
  //const [switchValue, setSwitchValue] = useState(false);
  const [username, setUsername] = useState(null);
  const [spinnerVisibility, setSpinnerVisibility] = useState(false);
  const [isSignedIn, setSignedIn] = useState(false);
  return isSignedIn ? (
    <>
      <NavigationContainer style={styles.container}>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <DrawerScreen {...props} />}>
          <Drawer.Screen name="Home" component={RootStackScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  ) : (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Sign In">
          {(props) => (
            <View>
              <LoginScreen
                isSignedIn
                spinnerEnable
                spinnerVisibility={spinnerVisibility}
                onPressLogin={() => {
                  setSpinnerVisibility(true);
                  setTimeout(() => {
                    setSpinnerVisibility(false);
                  }, 4000);
                  setSignedIn(true);
                }}
                usernameOnChangeText={(username) => setUsername(username)}
                onPressSettings={() => alert('Settings Button is pressed')}
                passwordOnChangeText={(password) =>
                  console.log('Password: ', password)
                }
              />
            </View>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
  // <StatusBar barStyle="light-content" />
  // {/*
  //  params
  //  */}
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerButton: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
