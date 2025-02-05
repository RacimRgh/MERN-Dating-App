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
    gender: true,
    confirmPass: true,
  });
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [validConfirmation, setValidConfirmation] = useState(true);
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
    gender: '',
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
  const genderInputChange = (val) => {
    setData({
      ...data,
      gender: val,
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
              data.email.length == 0
                ? setIsValidLogin({ email: false })
                : setIsValidLogin({ email: true });
              console.log('\n\n Email: ', data.email.length);

              data.firstname.length == 0
                ? setIsValidLogin({ prenom: false })
                : setIsValidLogin({ prenom: true });
              console.log('\n\n firstname: ', data.firstname.length);

              data.lastname.length == 0
                ? setIsValidLogin({ nom: false })
                : setIsValidLogin({ nom: true });
              console.log('\n\n lastname: ', data.lastname.length);

              data.country.length == 0
                ? setIsValidLogin({ country: false })
                : setIsValidLogin({ country: true });
              console.log('\n\n country: ', data.country.length);

              data.city.length == 0
                ? setIsValidLogin({ city: false })
                : setIsValidLogin({ city: true });
              console.log('\n\n city: ', data.city.length);

              data.gender.length == 0
                ? setIsValidLogin({ gender: false })
                : setIsValidLogin({ gender: true });
              console.log('\n\n gender: ', data.gender.length);

              data.confirm_password.length == 0
                ? setIsValidLogin({ confirmPass: false })
                : setIsValidLogin({ confirmPass: true });
              console.log('\n\n confirm: ', data.confirm_password.length);

              data.password.length < 7
                ? setIsValidPassword(false)
                : setIsValidPassword(true);
              console.log('\n\n password: ', data.password.length);

              data.password != data.confirm_password
                ? setValidConfirmation(false)
                : setValidConfirmation(true);

              await signUp({
                userEmail: data.email,
                firstname: data.firstname,
                lastname: data.lastname,
                password: data.password,
                birthday: data.birthday,
                birthhour: data.birthday.toISOString().slice(11, 16),
                country: data.country,
                city: data.city,
                gender: data.gender,
              }).catch((response) => {
                console.log(('\n\n\nSINGUP RESP: ', response));
              });
              setModalVisible(true);
              signOut();
              setCardState(!cardState);
            }
      }>
      <Text style={styles.loginButtonTextStyle}>
        {cardState ? 'CONNEXION' : "M'INSCRIRE"}
      </Text>
      <Icon
        type="MaterialCommunityIcons"
        name="login"
        size={35}
        color="black"
      />
    </TouchableOpacity>
  );

  const SuccessSignUp = () => {
    return (
      <Modal
        animationType="fade"
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
            <Text style={{ fontFamily: 'DancingScript-Bold', fontSize: 40 }}>
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
    <KeyboardAvoidingView behavior="height" style={styles.container}>
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
                validConfirmation={validConfirmation}
                cardState={cardState}
                emailOnChange={(val) => emailInputChange(val)}
                firstnameOnChange={(val) => firstnameInputChange(val)}
                lastnameOnChange={(val) => lastnameInputChange(val)}
                passwordOnChange={(val) => handlePasswordChange(val)}
                repasswordOnChange={(val) => handleConfirmPasswordChange(val)}
                dateOnChange={(val) => dateInputChange(val)}
                countryOnChange={(val) => countryInputChange(val)}
                cityOnChange={(val) => cityInputChange(val)}
                genderInputChange={(val) => genderInputChange(val)}
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
