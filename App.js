import React, { useMemo, useEffect, useContext } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import axios from 'axios';
// Local Imports
// screens
import LoginScreen from './screens/LoginScreen';
import DrawerScreen from './screens/DrawerScreen';
import RootStackScreen from './screens/RootStackScreen';
// components
import { AuthContext } from './components/context';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Function to send a post request to sign up a user
const signInUser = async (data) => {
  try {
    const result = await axios.post('http://10.0.2.2:3000/users', data);
    console.log('add result', result.data);
    return result;
  } catch (error) {
    console.log('Error in adding ', error.response);
  }
};

// Function to send a post request to login a user
const loginUser = async (data) => {
  try {
    const result = await axios.post('http://10.0.2.2:3000/users/login', data);
    console.log('\n\n\nLogin user: ', result.data);
    return result;
  } catch (error) {
    console.log('\n\n\nError in adding ', error.response);
  }
};

const App = () => {
  initialLoginState = {
    isLoading: true,
    userEmail: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          // userToken: action.token,
          userToken: null,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userEmail: action.email,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userEmail: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userEmail: action.email,
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
      signIn: async ({ userEmail, password }) => {
        const results = await loginUser({
          email: userEmail,
          password: password,
        });
        dispatch({
          type: 'LOGIN',
          email: userEmail,
          token: results.data.token,
        });
      },
      signOut: () => {
        dispatch({ type: 'LOGOUT' });
      },
      signUp: async ({ userEmail, firstname, lastname, password }) => {
        const results = await signInUser({
          nom: firstname,
          prenom: lastname,
          email: userEmail,
          password: password,
        });
        dispatch({
          type: 'REGISTER',
          email: null,
          token: null,
        });
      },
      profileInfo: () => {},
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
  // Render the LoginScreen or the Full application whether the user is connected (authorized) or not
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer style={styles.container}>
        {loginState.userToken !== null ? (
          <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={(props) => <DrawerScreen {...props} />}>
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
