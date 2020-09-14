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
    validLogin,
    validEmail,
    validPassword,
    validConfirmation,
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
    genderInputChange,

    updateSecureTextEntry,
    updateConfirmSecureTextEntry,
    secureText,
    confirmSecureText,
  } = props;

  console.log('\n\nvalidation: ', validLogin);

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
        {validPassword && validEmail ? null : (
          <Text style={styles.errorMessage}>Email ou mot de passe éronné</Text>
        )}
      </View>
    );
  };

  renderSignupCards = () => {
    return (
      <View>
        <Text style={styles.errorMessage}>*obligatoire</Text>
        <Card
          nameIcon="envelope-open"
          title="E-mail *"
          placeholder="john@doe.com"
          onChangeText={emailOnChange}
          isPassword={false}
        />
        {validLogin.email ? null : (
          <Text style={styles.errorMessage}>Email incorrect.</Text>
        )}
        <Card
          nameIcon="user"
          title="Prénom *"
          placeholder="Entrez votre prénom"
          onChangeText={firstnameOnChange}
          isPassword={false}
        />
        {validLogin.prenom ? null : (
          <Text style={styles.errorMessage}>Veuillez saisir votre prénom.</Text>
        )}
        <Card
          nameIcon="user"
          title="Nom *"
          placeholder="Entrez votre nom de famille"
          onChangeText={lastnameOnChange}
          isPassword={false}
        />
        {validLogin.nom ? null : (
          <Text style={styles.errorMessage}>Veuillez saisir votre nom.</Text>
        )}
        <Card
          nameIcon="lock"
          title="Mot de passe *"
          placeholder="Entrez votre mot de passe"
          onChangeText={passwordOnChange}
          onPressSecure={updateSecureTextEntry}
          secureText={secureText}
          isPassword={true}
        />
        {validPassword ? null : (
          <Text style={styles.errorMessage}>
            Votre mot de passe doit contenir au moins 7 caractères
          </Text>
        )}
        <Card
          nameIcon="lock"
          title="Confirmation du mot de passe *"
          placeholder="Retapez votre mot de passe"
          onChangeText={repasswordOnChange}
          onPressSecure={updateConfirmSecureTextEntry}
          secureText={confirmSecureText}
          isPassword={true}
        />
        {validLogin.confirmPass ? null : (
          <Text style={styles.errorMessage}>
            Veuillez confirmer votre mot de passe.
          </Text>
        )}
        {validConfirmation ? null : (
          <Text style={styles.errorMessage}>
            Vos mots de passe ne correspondent pas.
          </Text>
        )}
        {/* GENDER PICKER */}
        <View style={styles.ovalcontainer}>
          <View style={styles.ovalcontainerglue}>
            <Icon size={25} type="SimpleLineIcons" name="list" color="black" />
          </View>
          <View style={{ width: '80%' }}>
            <Text style={styles.textStyle}>Gendre *</Text>
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
              onSelect={(idx, data) => {
                genderInputChange(data);
              }}
            />
          </View>
        </View>
        {validLogin.gender ? null : (
          <Text style={styles.errorMessage}>
            Veuillez selectionner votre gendre.
          </Text>
        )}
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
            <Text style={styles.textStyle}>Pays de naissance *</Text>
            <ModalDropdown
              defaultValue="Veillez choisir"
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
        {validLogin.country ? null : (
          <Text style={styles.errorMessage}>
            Veuillez selectionner votre pays de naissance.
          </Text>
        )}
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
            <Text style={styles.textStyle}>Ville de naissance *</Text>
            <ModalDropdown
              defaultValue="Veillez choisir"
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
        {validLogin.city ? null : (
          <Text style={styles.errorMessage}>
            Veuillez selectionner votre ville de naissance.
          </Text>
        )}
        <DateHourPicker onChangeDate={dateOnChange} />
      </View>
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
