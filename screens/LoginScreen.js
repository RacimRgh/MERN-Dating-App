import React, { useState, useContext } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Spinner from 'react-native-spinkit';
import axios from 'axios';
// Local imports
import styles from './LoginScreen.style';
import Logo from '../components/Logo';
import BottomContainer from '../components/BottomContainer';
import { store } from '../components/store';

const defaultBackground =
  'https://images.unsplas.h.com/photo-1554189097-ffe88e998a2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80';

// Function to send a post request to sign up a user
const signInUser = async (data) => {
  try {
    const result = await axios.post('http://10.0.2.2:3000/users', data);
    console.log('add result', result.data.result);
  } catch (error) {
    console.log('Error in adding ', error);
  }
};
// Function to send a post request to login a user
const loginUser = async (data) => {
  try {
    const result = await axios.post('http://10.0.2.2:3000/users/login', data);
    console.log('Login user: ', result.data);
  } catch (error) {
    console.log('Error in adding ', error);
  }
};
/* The login screen component that contains Login and Signup components */

const LoginScreen = (props) => {
  // cardState is to either show Login cards or SignUp cards
  const [cardState, setCardState] = useState(true);
  const [spinnerVisibility, setSpinnerVisibility] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const globalState = useContext(store);
  const { dispatch } = globalState;
  // onPress function when the user presses "Sign Me Up"
  const onPressSignup = () => {
    setSpinnerVisibility(true);
    setTimeout(() => {
      setSpinnerVisibility(false);
    }, 4000);
    signInUser({
      nom: 'racim',
      prenom: 'righi',
      email: 'racim458s8@gmail.com',
      password: 'aaabbbddd123',
    });
  };
  // onPress function for when the user presses "Login now"
  const onPressLogin = () => {
    setSpinnerVisibility(true);
    setTimeout(() => {
      setSpinnerVisibility(false);
    }, 4000);
    dispatch({ type: 'login' });
    console.log(globalState['isAuthorized']);
  };
  // Loading spinner to show while the requests are going through
  renderSpinner = () => (
    <View style={styles.spinnerStyle}>
      <Spinner
        size={60}
        type="ThreeBounce"
        style={styles.spinnerStyle}
        color="#5dbcd2"
        isVisible={spinnerVisibility}
      />
    </View>
  );
  // Login or Sign Up button depending on cardState
  renderLoginButton = () => (
    <TouchableOpacity
      style={styles.loginButtonStyle}
      onPress={cardState ? onPressLogin : onPressSignup}>
      <Text style={styles.loginButtonTextStyle}>
        {cardState ? 'LOGIN NOW' : 'SIGN ME UP'}
      </Text>
    </TouchableOpacity>
  );
  return (
    <KeyboardAvoidingView behavior="position" style={styles.container}>
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: defaultBackground }}
          borderRadius={24}
          resizeMode="cover"
          style={styles.imagebackgroundStyle}>
          <View style={styles.blackoverlay}>
            <SafeAreaView style={styles.safeAreaViewStyle}>
              <View style={styles.loginContainer}>
                <Logo logoText="OurApp" />
              </View>
              <BottomContainer
                cardState={cardState}
                onChangeEmail={(email) => setEmail(email)}
                onChangePassword={(password) => setPassword(password)}
                onPressSignup={() => {
                  setCardState(!cardState);
                }}
                onPressLogin={onPressLogin}
              />
            </SafeAreaView>
          </View>
        </ImageBackground>
        {spinnerVisibility ? renderSpinner() : renderLoginButton()}
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
