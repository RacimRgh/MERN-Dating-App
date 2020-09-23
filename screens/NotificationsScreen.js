import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import images from '../services/Images';

// Notifications screens
const NotificationsScreen = (props) => {
  const { closeModal, modalVisible } = props;
  const [notif, setNotif] = useState(false);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titles3}>Notifications</Text>
        </View>
        <View style={styles.section}>
          {notif ? (
            <View>
              <View style={styles.content}>
                <Icon type="FontAwesome" name="envelope-o" size={35} />
                <Text style={styles.titles2}>
                  Vous avez recu un nouveau message de Yasmine !
                </Text>
              </View>
              <View style={styles.content}>
                <Icon type="FontAwesome" name="magic" size={35} />
                <Text style={styles.titles2}>
                  Vous avez un nouveau compatible !
                </Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  // navigation.navigate('Recherche');
                  closeModal();
                }}>
                <Text style={styles.titles}>Fermer</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Image
                source={images.logo}
                style={{ height: 150, width: 150, alignSelf: 'center' }}
              />
              <Text style={styles.tabTitle}> Vous avez 0 Notifications</Text>
              <Text style={styles.tabTitle}>
                Aimez les profils des utilisateurs pour trouver des compatibles
                !
              </Text>
              <View style={styles.divider} />
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  // navigation.navigate('Recherche');
                  closeModal();
                }}>
                <Text style={styles.titles}>Fermer</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    height: 70,
    width: '100%',
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    elevation: 0,
    backgroundColor: '#F9E7E7',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
    justifyContent: 'center',
  },
  section: {
    flex: 1,
    width: '95%',
    backgroundColor: '#D2CBCB',
    borderRadius: 10,
    margin: 8,
    padding: 10,
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    backgroundColor: '#F9E7E7',
    alignItems: 'center',
    borderRadius: 10,
    margin: 8,
    padding: 10,
    paddingRight: 30,
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#7D938A',
    borderRadius: 50,
    padding: 10,
    width: '50%',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
    marginTop: 300,
  },
  titles: {
    fontWeight: 'bold',
    fontSize: 20,
    marginHorizontal: 10,
  },
  titles2: {
    fontFamily: 'DancingScript-Bold',
    fontSize: 25,
    marginHorizontal: 10,
  },
  titles3: {
    fontFamily: 'DancingScript-Bold',
    fontSize: 30,
    marginHorizontal: 10,
  },
  divider: {
    marginVertical: 10,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  tabTitle: {
    fontWeight: 'bold',
    fontSize: 25,
    marginVertical: 5,
    alignSelf: 'center',
  },
  contentText: {
    fontSize: 18,
    alignSelf: 'center',
  },
});

export default NotificationsScreen;
