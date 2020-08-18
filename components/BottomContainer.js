import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
// Local Imports
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
    dateOnChange,
    countryOnChange,
    cityOnChange,

    updateSecureTextEntry,
    updateConfirmSecureTextEntry,
    secureText,
    confirmSecureText,
  } = props;

  renderLoginCards = () => {
    return (
      <View>
        <Card
          nameIcon="envelope-open"
          title="E-mail"
          placeholder="john@doe.com"
          onChangeText={emailOnChange}
          isPassword={false}
        />
        <Card
          nameIcon="lock"
          name="key"
          title="Password"
          placeholder="Enter your password"
          onChangeText={passwordOnChange}
          onPressSecure={updateSecureTextEntry}
          secureText={secureText}
          isPassword={true}
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
          isPassword={false}
        />
        <Card
          nameIcon="user"
          title="First name"
          placeholder="Your first name"
          onChangeText={firstnameOnChange}
          isPassword={false}
        />
        <Card
          nameIcon="user"
          title="Last name"
          placeholder="Your last name"
          onChangeText={lastnameOnChange}
          isPassword={false}
        />
        <Card
          nameIcon="lock"
          title="Password"
          placeholder="Enter your password"
          onChangeText={passwordOnChange}
          onPressSecure={updateSecureTextEntry}
          secureText={secureText}
          isPassword={true}
        />
        <Card
          nameIcon="lock"
          title="Password confirmation"
          placeholder="Re-enter your password"
          onChangeText={repasswordOnChange}
          onPressSecure={updateConfirmSecureTextEntry}
          secureText={confirmSecureText}
          isPassword={true}
        />
        <Card
          nameIcon="location-pin"
          title="Country of birth"
          placeholder="Your birth country"
          onChangeText={countryOnChange}
          isPassword={false}
        />
        <Card
          nameIcon="location-pin"
          title="City of birth"
          placeholder="Your birth city"
          onChangeText={cityOnChange}
          isPassword={false}
        />
        <View style={styles.ovalcontainer}>
          <View style={styles.ovalcontainerglue}>
            <Icon size={25} type="SimpleLineIcons" name="list" color="black" />
          </View>
          <View style={{ width: '80%' }}>
            <Text style={styles.textStyle}>Gender</Text>
            <DropDownPicker
              items={[
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female' },
              ]}
              defaultIndex={0}
              containerStyle={{ height: 30, marginTop: 2 }}
              onChangeItem={(item) => console.log(item.label, item.value)}
            />
          </View>
        </View>
        <DateHourPicker onChangeDate={dateOnChange} />
      </ScrollView>
    );
  };

  renderCardContent = () => {
    return cardState ? renderLoginCards() : renderSignupCards();
  };

  return (
    <ScrollView style={container(backgroundColor, cardState)}>
      <View style={styles.containerGlue}>{renderCardContent()}</View>
      <View style={styles.footerContainer}>
        <TouchableOpacity
          onPress={onPressSettings}
          style={{ marginRight: 'auto', marginTop: cardState ? 20 : 50 }}>
          <Icon size={45} type="Ionicons" name="ios-settings" color="#5dbcd2" />
        </TouchableOpacity>
        <View>
          {cardState ? (
            <Text style={{ color: 'white' }}>Dont have an account?</Text>
          ) : (
            <Text style={{ marginTop: 30, color: 'white' }}>
              Already have an account
            </Text>
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
