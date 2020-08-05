import React, { useState, useMemo, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
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
import { AuthContext } from './components/context';

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
  // const [isLoading, setIsLoading] = useState(true);
  // const [userToken, setUserToken] = useState(null);

  initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = useMemo(
    () => ({
      signIn: (userName, password) => {
        let userToken;
        userName = null;
        if (userName == 'user' && password == 'pass') {
          userToken = 'dfgdfg';
        }
        dispatch({ type: 'LOGIN', id: userName, token: userToken });
      },
      signOut: () => {
        dispatch({ type: 'LOGOUT' });
      },
      signUp: () => {
        setUserToken('fgkj');
        setIsLoading(false);
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: 'RETRIEVE_TOKEN', token: 'dfklj' });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  const initialState = {
    email: '', // Store `email` when user enters their email
    password: '', // Store `password` when user enters their password
    errors: {}, // Store error data from the backend here
    isAuthorized: false, // If auth is successful, set this to `true`
    isLoading: false, // Set this to `true` if You want to show spinner
  };
  // Render the LoginScreen or the Full application whether the user is connected (authorized) or not
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer style={styles.container}>
        {loginState.userToken !== null ? (
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
        ) : (
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
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
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
