import React, { useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  Button,
} from 'react-native';
import Spinner from 'react-native-spinkit';
import Icon from 'react-native-dynamic-vector-icons';
// Local imports
import styles from './LoginScreen.style';
import Logo from '../components/Logo';
import BottomContainer from '../components/BottomContainer';
import { AuthContext } from '../services/context';

const defaultBackground =
  'https://images.unsplash.com/photo-1535635790206-6960f6eaacff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80';

// const defaultBackground =
//   'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80';
//   'https://images.unsplash.com/photo-1554189097-ffe88e998a2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80';

/* The login screen component that contains Login and Signup components */

const LoginScreen = (props) => {
  // cardState is to either show Login cards or SignUp cards
  const [cardState, setCardState] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [spinnerVisibility, setSpinnerVisibility] = useState(false);
  const { signIn, signUp, signOut } = React.useContext(AuthContext);
  const [isValidLogin, setIsValidLogin] = useState({
    email: true,
    nom: true,
    prenom: true,
    country: true,
    city: true,
  });
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [data, setData] = React.useState({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    confirm_password: '',
    birthday: undefined,
    birthhour: '',
    country: '',
    city: '',
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
  const dateInputChange = (val) => {
    setData({
      ...data,
      birthday: val,
    });
  };
  const countryInputChange = (val) => {
    setData({
      ...data,
      country: val,
    });
  };
  const cityInputChange = (val) => {
    setData({
      ...data,
      city: val,
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
              setIsValidLogin({ ...isValidLogin, email: true });
              setIsValidPassword(true);
              signIn({ userEmail: data.email, password: data.password }).catch(
                (response) => {
                  setIsValidLogin({ ...isValidLogin, email: false });
                  setIsValidPassword(false);
                  console.log(('\n\n\nSIGNIN RESP: ', response));
                },
              );
            }
          : async () => {
              data.email.length < 7
                ? setIsValidLogin({ ...isValidLogin, email: false })
                : setIsValidLogin({ ...isValidLogin, email: true });
              data.firstname.length < 7
                ? setIsValidLogin({ ...isValidLogin, prenom: false })
                : setIsValidLogin({ ...isValidLogin, prenom: true });
              data.lastname.length < 7
                ? setIsValidLogin({ ...isValidLogin, nom: false })
                : setIsValidLogin({ ...isValidLogin, nom: true });
              console.log('\n\n cunt: ', data.country.length);
              data.country.length == 0
                ? setIsValidLogin({ ...isValidLogin, country: false })
                : setIsValidLogin({ ...isValidLogin, country: true });
              data.city.length == 0
                ? setIsValidLogin({ ...isValidLogin, city: false })
                : setIsValidLogin({ ...isValidLogin, city: true });
              data.password.length < 7
                ? setIsValidPassword(false)
                : setIsValidPassword(true);
              await signUp({
                userEmail: data.email,
                firstname: data.firstname,
                lastname: data.lastname,
                password: data.password,
                birthday: data.birthday,
                birthhour: data.birthday.toISOString().slice(11, 16),
                country: data.country,
                city: data.city,
              })
                .then(() => {
                  setModalVisible(true);
                })
                .catch((response) => {
                  console.log(('\n\n\nSINGUP RESP: ', response));
                });
              signOut();
              setCardState(!cardState);
            }
      }>
      <Text style={styles.loginButtonTextStyle}>
        {cardState ? 'LOGIN NOW' : 'SIGN ME UP'}
      </Text>
    </TouchableOpacity>
  );

  const SuccessSignUp = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.modal}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
            }}>
            <Text style={{ fontWeight: 'bold', fontSize: 40 }}>
              Inscription réussie ! vous pouvez vous connecter à votre compte.
            </Text>
            <Icon
              name="done"
              type="ionicons"
              size={50}
              color="green"
              style={{ alignSelf: 'center' }}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  return (
    <KeyboardAvoidingView behavior="position" style={styles.container}>
      <SuccessSignUp />
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: defaultBackground }}
          borderRadius={24}
          resizeMode="cover"
          style={styles.imagebackgroundStyle}>
          <View style={styles.blackoverlay}>
            <SafeAreaView style={styles.safeAreaViewStyle}>
              <View style={styles.loginContainer}>
                <Logo logoText="Astro-Attraction" cardState={cardState} />
              </View>
              <BottomContainer
                validLogin={isValidLogin}
                validEmail={isValidEmail}
                validPassword={isValidPassword}
                cardState={cardState}
                emailOnChange={(val) => emailInputChange(val)}
                firstnameOnChange={(val) => firstnameInputChange(val)}
                lastnameOnChange={(val) => lastnameInputChange(val)}
                passwordOnChange={(val) => handlePasswordChange(val)}
                repasswordOnChange={(val) => handleConfirmPasswordChange(val)}
                dateOnChange={(val) => dateInputChange(val)}
                countryOnChange={(val) => countryInputChange(val)}
                cityOnChange={(val) => cityInputChange(val)}
                updateSecureTextEntry={() => updateSecureTextEntry()}
                updateConfirmSecureTextEntry={() =>
                  updateConfirmSecureTextEntry()
                }
                onPressChange={() => {
                  setCardState(!cardState);
                }}
                secureText={data.secureTextEntry}
                confirmSecureText={data.confirm_secureTextEntry}
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
