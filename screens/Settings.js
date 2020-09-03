import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Modal,
  ActivityIndicator,
  Image,
} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import axios from 'axios';
import { store } from '../components/store';
import { AuthContext } from '../components/context';
import deviceStorage from '../services/deviceStorage';
import images from '../components/Images';

/* 
  This is the settings screen (modal)
  The user can modify his account information and more to come
*/
const Settings = () => {
  const { state } = useContext(store);
  const { deleteProfile } = React.useContext(AuthContext);
  const [notifications, setNotifications] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // console.log('\n\n\n Settings: ', state);

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

  const Card = (props) => {
    const { title, iconName, iconType, data, edit } = props;
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={styles.cards}>
          <Icon name={iconName} size={25} type={iconType} />
          <Text style={styles.cardText}>
            {title} {data}
          </Text>
        </View>
        {edit ? (
          <TouchableOpacity>
            <View style={styles.editButton}>
              <Icon name="pencil" size={30} type="MaterialCommunityIcons" />
            </View>
          </TouchableOpacity>
        ) : undefined}
      </View>
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
    <View style={styles.container}>
      <Delete />
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleStyle}>Mon compte</Text>
        </View>
        <Card
          title="Email:"
          iconName="email-edit"
          iconType="MaterialCommunityIcons"
          data={state.initialState.email}
          edit={true}
        />
        <Card
          title="Nom:"
          iconName="account-group"
          iconType="MaterialCommunityIcons"
          data={state.initialState.lastname}
          edit={true}
        />
        <Card
          title="Prenom:"
          iconName="person"
          iconType="MaterialIcons"
          data={state.initialState.firstname}
          edit={true}
        />
      </View>
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleStyle}>Notifications</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Card
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
        <Card
          title="Changer mon mot de passe"
          iconName="pencil-lock"
          iconType="MaterialCommunityIcons"
        />
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}>
          <Card
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
        <Card
          title="Termes d'utilisation"
          iconName="file-outline"
          iconType="MaterialCommunityIcons"
          edit={false}
        />
        <Card
          title="A propos"
          iconName="information-outline"
          iconType="MaterialCommunityIcons"
          edit={false}
        />
      </View>
    </View>
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
    backgroundColor: '#CCC6BD',
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
    backgroundColor: '#faf2dd',
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
    backgroundColor: '#faf2dd',
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
