import React, { useMemo, useEffect, useContext } from 'react';
import { StyleSheet, View, ActivityIndicator, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import axios from 'axios';
// Local Imports
// screens
import LoginScreen from './screens/LoginScreen';
import DrawerScreen from './screens/DrawerScreen';
import RootStackScreen from './screens/RootStackScreen';
import images from './components/Images';
// components
import { AuthContext } from './components/context';
import { StateProvider } from './components/store';
// services
import deviceStorage from './services/deviceStorage';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

console.disableYellowBox = true;
// Function to send a post request to sign up a user
const signInUser = (data) => {
  return axios
    .post('http://10.0.2.2:3000/users', data)
    .then((response) => {
      deviceStorage.saveItem('id_token', response.data.token);
      console.log('\n**********SIGNUP this: ', response.data);
      return response;
    })
    .catch((error) => {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    });
};

// Function to send a post request to login a user
const loginUser = (data) => {
  return axios
    .post('http://10.0.2.2:3000/users/login', data)
    .then((response) => {
      deviceStorage.saveItem('id_token', response.data.token);
      console.log('\n**********LOGIN this: ', response.data);
      deviceStorage.logCurrentStorage();
      return response;
    })
    .catch((error) => {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    });
};

const App = () => {
  initialLoginState = {
    isLoading: false,
    userEmail: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          // userToken: null,
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
      signOut: async () => {
        const user_token = await deviceStorage.loadJWT();
        // console.log('\n\n\n.................', tok);
        await axios({
          method: 'POST',
          url: 'http://10.0.2.2:3000/users/logout',
          headers: {
            Authorization: 'Bearer ' + user_token,
          },
        });
        console.log('\n\n***********HERE IN LOGOUT**************\n\n');
        await deviceStorage.removeItemValue('id_token');
        // deviceStorage.logCurrentStorage();
        dispatch({ type: 'LOGOUT' });
      },
      signUp: async ({
        userEmail,
        firstname,
        lastname,
        password,
        birthday,
        birthhour,
        country,
        city,
      }) => {
        const results = await signInUser({
          nom: firstname,
          prenom: lastname,
          email: userEmail,
          password: password,
          birthdaydate: birthday,
          birthHour: birthhour,
          countryName: country,
          cityName: city,
        });
        dispatch({
          type: 'REGISTER',
          email: null,
          token: null,
        });
        console.log('\n\n***********HERE IN SIGNUP**************\n\n');
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      const user_token = await deviceStorage.loadJWT();
      // await deviceStorage.removeItemValue('id_token');
      // console.log('\n\n\n Retrieve: ', user_token);
      // deviceStorage.logCurrentStorage();
      if (user_token !== null)
        dispatch({ type: 'RETRIEVE_TOKEN', token: null });
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
          <StateProvider>
            <Drawer.Navigator
              initialRouteName="Home"
              drawerContent={(props) => <DrawerScreen {...props} />}>
              <Drawer.Screen name="Home" component={RootStackScreen} />
            </Drawer.Navigator>
          </StateProvider>
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
