import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Modal,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import axios from 'axios';
import { store } from '../services/store';
import { AuthContext } from '../services/context';
import deviceStorage from '../services/deviceStorage';
import images from '../services/Images';
import SettingsCard from '../components/SettingsCard';

/* 
  This is the settings screen (modal)
  The user can modify his account information and more to come
*/
const Settings = () => {
  const { state, dispatch } = useContext(store);
  const { deleteProfile } = React.useContext(AuthContext);
  const [notifications, setNotifications] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState({
    email: state.initialState.email,
    nom: state.initialState.lastname,
    prenom: state.initialState.firstname,
  });

  console.log('\n\n\n Settings: ', info);

  const emailInputChange = (val) => {
    setInfo({
      ...info,
      email: val,
    });
  };

  const firstnameInputChange = (val) => {
    setInfo({
      ...info,
      prenom: val,
    });
  };
  const lastnameInputChange = (val) => {
    setInfo({
      ...info,
      nom: val,
    });
  };

  const onPressSubmit = async (value) => {
    console.log('\n\n Submit: ', value);
    deviceStorage.loadJWT().then((user_token) => {
      axios({
        method: 'PATCH',
        url: 'http://10.0.2.2:3000/users/me',
        headers: {
          Authorization: 'Bearer ' + user_token,
        },
        data: {
          email: value.email,
          nom: value.nom,
          prenom: value.prenom,
        },
      }).then(async () => {
        await dispatch({ type: 'GET_PROFILE' });
        console.log('\n\n\n____Update profile', state.initialState);
      });
    });
  };

  const onPressDelete = () => {
    setTimeout(() => {
      setIsLoading(true);
    }, 500);
    deviceStorage.loadJWT().then((user_token) => {
      axios({
        method: 'DELETE',
        url: 'http://10.0.2.2:3000/users/me',
        headers: {
          Authorization: 'Bearer ' + user_token,
        },
      }).then(() => {
        setTimeout(() => {
          setIsLoading(false);
          deleteProfile();
        }, 2000);
      });
    });
  };

  const [modalVisible, setModalVisible] = useState(false);
  const Delete = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.modal}>
          <Text style={styles.cardText}>
            {' '}
            Etes vous sur de vouloir supprimer votre compte? Cette opération est
            irréversible.
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={styles.deleteButtons}
              onPress={() => {
                onPressDelete();
              }}>
              <Icon
                name="pistol"
                type="MaterialCommunityIcons"
                size={35}
                color="green"
              />
              <Text style={{ fontWeight: 'bold' }}>OUI</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButtons}
              onPress={() => {
                setModalVisible(false);
              }}>
              <Icon
                name="circle-with-cross"
                type="Entypo"
                size={35}
                color="red"
              />
              <Text style={{ fontWeight: 'bold' }}>NON</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={images.logo}
          style={{
            height: 180,
            width: 180,
          }}
        />
        <Text> Déconnexion ...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Delete />
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleStyle}>Mon compte</Text>
        </View>
        <SettingsCard
          title="Email"
          iconName="email-edit"
          iconType="MaterialCommunityIcons"
          data={state.initialState.email}
          edit={true}
          onChangeText={(val) => emailInputChange(val)}
          onPressSubmit={() => onPressSubmit(info)}
        />
        <SettingsCard
          title="Nom"
          iconName="account-group"
          iconType="MaterialCommunityIcons"
          data={state.initialState.lastname}
          edit={true}
          onChangeText={(val) => lastnameInputChange(val)}
          onPressSubmit={() => onPressSubmit(info)}
        />
        <SettingsCard
          title="Prenom"
          iconName="person"
          iconType="MaterialIcons"
          data={state.initialState.firstname}
          edit={true}
          onChangeText={(val) => firstnameInputChange(val)}
          onPressSubmit={() => onPressSubmit(info)}
        />
      </View>
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleStyle}>Notifications</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <SettingsCard
            title="Activer/désactiver les notifications"
            iconName="bell"
            iconType="MaterialCommunityIcons"
            edit={false}
          />
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={notifications ? '#f5e5fd' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setNotifications(!notifications)}
            value={notifications}
          />
        </View>
      </View>
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleStyle}>Sécurité</Text>
        </View>
        <SettingsCard
          title="Changer mon mot de passe"
          iconName="pencil-lock"
          iconType="MaterialCommunityIcons"
        />
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}>
          <SettingsCard
            title="Supprimer mon compte"
            iconName="delete"
            iconType="MaterialCommunityIcons"
          />
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleStyle}>Mentions légales et règlements</Text>
        </View>
        <SettingsCard
          title="Termes d'utilisation"
          iconName="file-outline"
          iconType="MaterialCommunityIcons"
          edit={false}
        />
        <SettingsCard
          title="A propos"
          iconName="information-outline"
          iconType="MaterialCommunityIcons"
          edit={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
    backgroundColor: 'white',
  },
  divider: {
    marginTop: 10,
    borderBottomColor: '#ccffff',
    borderBottomWidth: 1,
  },
  titleContainer: {
    backgroundColor: '#D2CBCB',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  titleStyle: {
    marginHorizontal: 20,
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  cards: {
    padding: 10,
    width: '80%',
    backgroundColor: '#F9E7E7',
    marginHorizontal: 10,
    marginVertical: 5,
    flexDirection: 'row',
  },
  cardText: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  editButton: {
    borderRadius: 200,
    backgroundColor: '#F9E7E7',
    padding: 10,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
    margin: 20,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  deleteButtons: {
    padding: 20,
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
export default Settings;
