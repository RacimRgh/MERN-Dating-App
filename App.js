import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
// Local Imports
// screens
import LoginScreen from './screens/LoginScreen';
import DrawerScreen from './screens/DrawerScreen';
import Settings from './screens/Settings';
import EditProfile from './screens/EditProfile';
import Home from './screens/HomeTabs';
// components
import { StateProvider, store } from './components/store';

const RootStack = createStackNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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
  const initialState = {
    email: '', // Store `email` when user enters their email
    password: '', // Store `password` when user enters their password
    errors: {}, // Store error data from the backend here
    isAuthorized: false, // If auth is successful, set this to `true`
    isLoading: false, // Set this to `true` if You want to show spinner
  };
  const globalState = useContext(store);
  // Render the LoginScreen or the Full application whether the user is connected (authorized) or not
  return globalState['isAuthorized'] ? (
    <StateProvider>
      <NavigationContainer style={styles.container}>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => (
            <DrawerScreen
              {...props}
              onPressLogout={() => {
                globalState['isAuthorized'] = false;
              }}
            />
          )}>
          <Drawer.Screen name="Home" component={RootStackScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </StateProvider>
  ) : (
    <StateProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Sign In">
            {(props) => (
              <View>
                <LoginScreen
                  onPressSettings={() => alert('Settings Button is pressed')}
                />
              </View>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </StateProvider>
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
});

export default App;
