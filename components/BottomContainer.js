import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import Card from './Card';
import DateHourPicker from './DateHourPicker';
import styles, { container } from './BottomContainer.style';

const BottomContainer = (props) => {
  const {
    cardState,
    onPressSignup,
    backgroundColor,
    onPressSettings,
    contentComponent,
    emailOnChangeText,
    fullnameOnChangeText,
    passwordOnChangeText,
    repasswordOnChangeText,
    disableSignupButton,
    passwordTextInputValue,
    emailTextInputValue,
    fullnameTextInputValue,
    repasswordTextInputValue,
  } = props;

  renderLoginCards = () => {
    return (
      <View>
        <Card
          nameIcon="envelope-open"
          title="E-mail"
          value={emailTextInputValue}
          placeholder="john@doe.com"
          onChangeText={emailOnChangeText}
        />
        <Card
          nameIcon="lock"
          name="key"
          secureTextEntry
          title="Password"
          value={passwordTextInputValue}
          placeholder="Enter your password"
          onChangeText={(text) => passwordOnChangeText(text)}
        />
      </View>
    );
  };

  renderSignupCards = () => {
    return (
      <View>
        <Card
          nameIcon="envelope-open"
          title="E-mail"
          value={emailTextInputValue}
          placeholder="john@doe.com"
          onChangeText={emailOnChangeText}
        />
        <Card
          nameIcon="user"
          title="Full name"
          value={fullnameTextInputValue}
          placeholder="Your fullname"
          onChangeText={fullnameOnChangeText}
        />
        <Card
          nameIcon="lock"
          secureTextEntry
          title="Password"
          value={passwordTextInputValue}
          placeholder="Enter your password"
          onChangeText={(text) => passwordOnChangeText(text)}
        />
        <Card
          nameIcon="lock"
          secureTextEntry
          title="Password confirmation"
          value={repasswordTextInputValue}
          placeholder="Re-enter your password"
          onChangeText={(text) => repasswordOnChangeText(text)}
        />
      </View>
    );
  };

  renderCardContent = () => {
    return cardState ? renderLoginCards() : renderSignupCards();
  };

  return (
    <View style={container(backgroundColor, cardState)}>
      <View style={styles.containerGlue}>{renderCardContent()}</View>
      {cardState ? undefined : <DateHourPicker />}
      <View style={styles.footerContainer}>
        <TouchableOpacity
          onPress={onPressSettings}
          style={{ marginRight: 'auto', marginTop: cardState ? 20 : 50 }}>
          <Icon size={45} type="Ionicons" name="ios-settings" color="#5dbcd2" />
        </TouchableOpacity>
        {!disableSignupButton && (
          <View>
            {cardState ? (
              <Text>Dont have an account?</Text>
            ) : (
              <Text style={{ marginTop: 30 }}>Already have an account</Text>
            )}
            <TouchableOpacity
              style={styles.signupButtonStyle}
              onPress={() => onPressSignup()}>
              <Text style={styles.signupTextStyle}>
                {cardState ? 'Create account' : 'Login'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

BottomContainer.propTypes = {
  disableSwitch: PropTypes.bool,
  disableSettings: PropTypes.bool,
  backgroundColor: PropTypes.string,
};

BottomContainer.defaultProps = {
  disableSwitch: false,
  disableSettings: false,
  backgroundColor: 'rgba(255,255,255,0.45)',
};

export default BottomContainer;
