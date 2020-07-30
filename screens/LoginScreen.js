import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

const defaultBackground =
  'https://images.unsplash.com/photo-1554189097-ffe88e998a2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80';

const LoginScreen = (props) => {
  // Deconstructing the props
  const {
    onPressLogin,
    spinnerEnable,
    onPressSignup,
    spinnerVisibility,
  } = props;
  const [cardState, setCardState] = useState(true);
  // Spinner
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
  // Login Button
  renderLoginButton = () => (
    <TouchableOpacity style={styles.loginButtonStyle} onPress={onPressLogin}>
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
                onPressSignup={() => {
                  setCardState(!cardState);
                  onPressSignup && onPressSignup();
                }}
              />
            </SafeAreaView>
          </View>
        </ImageBackground>
        {spinnerEnable && spinnerVisibility
          ? renderSpinner()
          : renderLoginButton()}
      </View>
    </KeyboardAvoidingView>
  );
};
LoginScreen.propTypes = {
  spinnerEnable: PropTypes.bool,
  spinnerVisibility: PropTypes.bool,
};

LoginScreen.defaultProps = {
  spinnerEnable: false,
  spinnerVisibility: false,
};
export default LoginScreen;
