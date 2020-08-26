import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import { store } from '../components/store';
/* 
  This is the settings screen (modal)
  The user can modify his account information and more to come
*/
const Settings = ({ navigation }) => {
  const DATA = [
    {
      email: 'racim45@gmail.com',
      password: 'xxxxx',
      name: 'racim',
      lastname: 'righi',
    },
  ];
  const { state } = useContext(store);
  console.log('\n\n\n Settings: ', state);

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

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleStyle}>Mon compte</Text>
        </View>
        <Card
          title="Email:"
          iconName="email-edit"
          iconType="MaterialCommunityIcons"
          data={state.email}
          edit={true}
        />
        <Card
          title="Nom:"
          iconName="account-group"
          iconType="MaterialCommunityIcons"
          data={state.lastname}
          edit={true}
        />
        <Card
          title="Prenom:"
          iconName="person"
          iconType="MaterialIcons"
          data={state.firstname}
          edit={true}
        />
        <View style={styles.divider} />
      </View>
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleStyle}>Notifications</Text>
        </View>
        <View style={styles.divider} />
        <Card
          title="Activer/désactiver les notifications"
          iconName="bell"
          iconType="MaterialCommunityIcons"
          edit={false}
        />
      </View>
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleStyle}>Sécurité</Text>
        </View>
        <View style={styles.divider} />
        <Card
          title="Changer mon mot de passe"
          iconName="pencil-lock"
          iconType="MaterialCommunityIcons"
        />
      </View>
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleStyle}>Mentions légales et règlements</Text>
        </View>
        <View style={styles.divider} />
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
});
export default Settings;
