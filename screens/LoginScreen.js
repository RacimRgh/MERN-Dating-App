import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Spinner from 'react-native-spinkit';
// Local imports
import styles from './LoginScreen.style';
import Logo from '../components/Logo';
import BottomContainer from '../components/BottomContainer';
import { AuthContext } from '../components/context';

const defaultBackground =
  'https://images.unsplas.h.com/photo-1554189097-ffe88e998a2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80';

/* The login screen component that contains Login and Signup components */

const LoginScreen = (props) => {
  // cardState is to either show Login cards or SignUp cards
  const [cardState, setCardState] = useState(true);
  const [spinnerVisibility, setSpinnerVisibility] = useState(false);
  const { signIn, signUp, loginState } = React.useContext(AuthContext);

  const [data, setData] = React.useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    confirm_password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });
  const emailInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    }
  };

  const firstnameInputChange = (val) => {
    setData({
      ...data,
      firstname: val,
    });
  };
  const lastnameInputChange = (val) => {
    setData({
      ...data,
      lastname: val,
    });
  };
  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirm_password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
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
      onPress={
        cardState
          ? () => {
              signIn({ userEmail: data.email, password: data.password });
            }
          : () => {
              signUp({
                userEmail: data.email,
                firstname: data.firstname,
                lastname: data.lastname,
                password: data.password,
              });
            }
      }>
      <Text style={styles.loginButtonTextStyle}>
        {cardState ? 'LOGIN NOW' : 'SIGN ME UP'}
      </Text>
    </TouchableOpacity>
  );
  console.log('\n\n\n' + AuthContext.Consumer + '\n\n\n');
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
                emailOnChange={(val) => emailInputChange(val)}
                firstnameOnChange={(val) => firstnameInputChange(val)}
                lastnameOnChange={(val) => lastnameInputChange(val)}
                passwordOnChange={(val) => handlePasswordChange(val)}
                repasswordOnChange={(val) => handleConfirmPasswordChange(val)}
                updateSecureTextEntry={() => updateSecureTextEntry()}
                updateConfirmSecureTextEntry={() =>
                  updateConfirmSecureTextEntry()
                }
                secureTextEntry={data.confirm_secureTextEntry ? true : false}
                onPressChange={() => {
                  setCardState(!cardState);
                }}
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
