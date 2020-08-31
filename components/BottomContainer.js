import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import ModalDropdown from 'react-native-modal-dropdown';
// Local Imports
import Card from './Card';
import DateHourPicker from './DateHourPicker';
import styles, { container } from './BottomContainer.style';
import { s_a, country_arr } from '../services/countries';

const BottomContainer = (props) => {
  const [numCountry, setNumCountry] = useState(0);
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
          title="Mot de passe"
          placeholder="Entrez votre mot de passe"
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
          title="Prénom"
          placeholder="Entrez votre prénom"
          onChangeText={firstnameOnChange}
          isPassword={false}
        />
        <Card
          nameIcon="user"
          title="Nom"
          placeholder="Entrez votre nom de famille"
          onChangeText={lastnameOnChange}
          isPassword={false}
        />
        <Card
          nameIcon="lock"
          title="Mot de passe"
          placeholder="Entrez votre mot de passe"
          onChangeText={passwordOnChange}
          onPressSecure={updateSecureTextEntry}
          secureText={secureText}
          isPassword={true}
        />
        <Card
          nameIcon="lock"
          title="Confirmation du mot de passe"
          placeholder="Retapez votre mot de passe"
          onChangeText={repasswordOnChange}
          onPressSecure={updateConfirmSecureTextEntry}
          secureText={confirmSecureText}
          isPassword={true}
        />
        {/* GENDER PICKER */}
        <View style={styles.ovalcontainer}>
          <View style={styles.ovalcontainerglue}>
            <Icon size={25} type="SimpleLineIcons" name="list" color="black" />
          </View>
          <View style={{ width: '80%' }}>
            <Text style={styles.textStyle}>Gendre</Text>
            <ModalDropdown
              options={['Homme', 'Femme']}
              textStyle={styles.textStyle}
              style={{ width: '90%' }}
              dropdownStyle={{
                width: '60%',
                shadowColor: '#000',
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.3,
                shadowRadius: 1,
                elevation: 2,
              }}
              dropdownTextStyle={styles.textStyle}
              onSelect={(idx, data) => {}}
            />
          </View>
        </View>
        {/* COUNTRY PICKER */}
        <View style={styles.ovalcontainer}>
          <View style={styles.ovalcontainerglue}>
            <Icon
              size={25}
              type="SimpleLineIcons"
              name="location-pin"
              color="black"
            />
          </View>
          <View style={{ width: '80%' }}>
            <Text style={styles.textStyle}>Pays de naissance</Text>
            <ModalDropdown
              options={country_arr}
              textStyle={styles.textStyle}
              style={{ width: '90%' }}
              dropdownStyle={{
                width: '60%',
                shadowColor: '#000',
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.3,
                shadowRadius: 1,
                elevation: 2,
              }}
              dropdownTextStyle={styles.textStyle}
              onSelect={(idx, data) => {
                countryOnChange(data);
                setNumCountry(idx + 1);
              }}
            />
          </View>
        </View>
        {/* CITY PICKER */}
        <View style={styles.ovalcontainer}>
          <View style={styles.ovalcontainerglue}>
            <Icon
              size={25}
              type="SimpleLineIcons"
              name="location-pin"
              color="black"
            />
          </View>
          <View style={{ width: '80%' }}>
            <Text style={styles.textStyle}>Ville de naissance</Text>
            <ModalDropdown
              options={s_a[numCountry]}
              textStyle={styles.textStyle}
              style={{ width: '90%' }}
              dropdownStyle={{
                width: '60%',
                shadowColor: '#000',
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.3,
                shadowRadius: 1,
                elevation: 2,
              }}
              dropdownTextStyle={styles.textStyle}
              onSelect={(idx, data) => {
                cityOnChange(data);
              }}
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
            <Text style={{ color: 'white' }}>
              Vous n'avez pas de compte? Inscrivez vous
            </Text>
          ) : (
            <Text style={{ marginTop: 30, color: 'white' }}>
              J'ai déjà un compte
            </Text>
          )}
          <TouchableOpacity
            style={styles.signupButtonStyle}
            onPress={onPressChange}>
            <Text style={styles.signupTextStyle}>
              {cardState ? "S'inscrire" : 'Se connecter'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default BottomContainer;
