import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import Card from './Card';
import DateHourPicker from './DateHourPicker';
import styles, { container } from './BottomContainer.style';

const BottomContainer = (props) => {
  const {
    cardState,
    onPressChange,
    backgroundColor,
    onPressSettings,

    emailOnChange,
    firstnameOnChange,
    lastnameOnChange,
    passwordOnChange,
    repasswordOnChange,

    updateSecureTextEntry,
    updateConfirmSecureTextEntry,
    secureTextEntry,
  } = props;

  renderLoginCards = () => {
    return (
      <View>
        <Card
          nameIcon="envelope-open"
          title="E-mail"
          placeholder="john@doe.com"
          onChangeText={emailOnChange}
        />
        <Card
          nameIcon="lock"
          name="key"
          secureTextEntry
          title="Password"
          placeholder="Enter your password"
          onChangeText={passwordOnChange}
        />
      </View>
    );
  };

  renderSignupCards = () => {
    return (
      <ScrollView>
        <Card
          nameIcon="envelope-open"
          title="E-mail"
          placeholder="john@doe.com"
          onChangeText={emailOnChange}
        />
        <Card
          nameIcon="user"
          title="First name"
          placeholder="Your first name"
          onChangeText={firstnameOnChange}
        />
        <Card
          nameIcon="user"
          title="Last name"
          placeholder="Your last name"
          onChangeText={lastnameOnChange}
        />
        <Card
          nameIcon="lock"
          secureTextEntry
          title="Password"
          placeholder="Enter your password"
          onChangeText={passwordOnChange}
        />
        <Card
          nameIcon="lock"
          secureTextEntry
          title="Password confirmation"
          placeholder="Re-enter your password"
          onChangeText={repasswordOnChange}
        />
      </ScrollView>
    );
  };

  renderCardContent = () => {
    return cardState ? renderLoginCards() : renderSignupCards();
  };

  return (
    <ScrollView style={container(backgroundColor, cardState)}>
      <View style={styles.containerGlue}>{renderCardContent()}</View>
      {cardState ? undefined : <DateHourPicker />}
      <View style={styles.footerContainer}>
        <TouchableOpacity
          onPress={onPressSettings}
          style={{ marginRight: 'auto', marginTop: cardState ? 20 : 50 }}>
          <Icon size={45} type="Ionicons" name="ios-settings" color="#5dbcd2" />
        </TouchableOpacity>
        <View>
          {cardState ? (
            <Text>Dont have an account?</Text>
          ) : (
            <Text style={{ marginTop: 30 }}>Already have an account</Text>
          )}
          <TouchableOpacity
            style={styles.signupButtonStyle}
            onPress={onPressChange}>
            <Text style={styles.signupTextStyle}>
              {cardState ? 'Create account' : 'Login'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default BottomContainer;
