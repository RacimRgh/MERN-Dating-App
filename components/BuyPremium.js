import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import images from '../services/Images';

// Messages screens
// Work in progress

const BuyPremium = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const Premium = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.modalView}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.text}>Avantages premium</Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}>
              <Icon
                name="close-circle"
                type="MaterialCommunityIcons"
                size={40}
                color="red"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <Text style={styles.textInfo}>- Envoyer des messages</Text>
          <Text style={styles.textInfo}>
            - Filtrer les utilisateurs selon plusieurs paramètres
          </Text>
          <Text style={styles.textInfo}>- Revoir les utilisateurs passés</Text>
          <Text style={styles.text}> Prix: xx/mois</Text>
          <View style={{ marginTop: 100 }}>
            <Button
              title="Procéder au payement"
              onPress={() => {
                setModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <Premium />
      <Icon name="lock" type="MaterialCommunityIcons" size={100} />
      <View>
        <Text style={styles.text}>
          Cette fonctionnalité est réservée aux membres premium seulement
        </Text>
      </View>
      <Image
        source={images.logo}
        style={{ height: 200, width: 200, marginVertical: 10 }}
      />
      <Button
        title="Acheter premium"
        onPress={() => {
          setModalVisible(true);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
  },
  modalView: {
    height: '80%',
    margin: 20,
    width: '90%',
    backgroundColor: '#F9E7E7',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontFamily: 'DancingScript-Bold',
    fontSize: 30,
    marginHorizontal: 5,
  },
  textInfo: {
    fontFamily: 'monospace',
    color: 'black',
    fontSize: 20,
    marginHorizontal: 5,
    marginVertical: 20,
  },
  divider: {
    marginVertical: 10,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
});

export default BuyPremium;
