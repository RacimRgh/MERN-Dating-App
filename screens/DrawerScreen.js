import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-dynamic-vector-icons';
import DrawerHeader from '../components/DrawerHeader';
import { AuthContext } from '../services/context';
const { width, height } = Dimensions.get('window');
/* The Drawer screens that pops up when swiping right 
or clicking the drawer button in the tab navigator
(Bottom left button in the home menu)
*/
const DrawerScreen = (props) => {
  const { onPressLogout } = props;
  const { signOut } = React.useContext(AuthContext);
  /* comment to explain all the drawer items later
   */
  return (
    <DrawerContentScrollView
      contentContainerStyle={styles.content}
      style={styles.drawerContainer}
      {...props}>
      <DrawerHeader {...props} />
      <View style={styles.container}>
        <DrawerItem
          label="Abonnement premium"
          labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
          style={styles.abonnement}
          inactiveBackgroundColor="#a2a6ac"
          icon={({ focused, color, size }) => (
            <Icon
              size={25}
              name="credit-card"
              color="black"
              type="SimpleLineIcons"
            />
          )}
        />
        <DrawerItem
          label="Paramètres"
          onPress={() => props.navigation.navigate('Paramètres')}
          labelStyle={{ fontSize: 18 }}
          icon={({ focused, color, size }) => (
            <Icon
              size={25}
              name="settings"
              color="black"
              type="SimpleLineIcons"
            />
          )}
        />
        <DrawerItem
          label="Modifier mon profil"
          onPress={() => props.navigation.navigate('Modifier mon profil')}
          labelStyle={{ fontSize: 18 }}
          icon={({ focused, color, size }) => (
            <Icon
              size={25}
              name="account-edit"
              color="black"
              type="MaterialCommunityIcons"
            />
          )}
        />
        <DrawerItem
          label="Filtrer les utilisateurs"
          onPress={() => props.navigation.navigate('Filtrer')}
          labelStyle={{ fontSize: 18 }}
          icon={({ focused, color, size }) => (
            <Icon
              size={25}
              name="filter"
              color="black"
              type="MaterialCommunityIcons"
            />
          )}
        />
        <DrawerItem
          label="Se déconnecter"
          onPress={() => {
            signOut();
          }}
          style={styles.signOutButton}
          labelStyle={{ fontSize: 18, fontWeight: 'bold' }}
          inactiveBackgroundColor="#a2a6ac"
          icon={({ focused, color, size }) => (
            <Icon
              size={25}
              name="logout"
              color="black"
              type="MaterialCommunityIcons"
            />
          )}
        />
      </View>
      <Text style={{ fontWeight: 'bold', alignSelf: 'flex-end', margin: 5 }}>
        Version x.x
      </Text>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 120,
    backgroundColor: '#faf2dd',
    height: height * 0.8,
  },
  drawerContainer: {
    backgroundColor: '#faf2dd',
    height: height * 0.8,
  },
  content: {
    margin: 0,
    fontWeight: 'bold',
    fontSize: 20,
  },
  signOutButton: {
    position: 'absolute',
    top: 550,
    alignSelf: 'center',
    alignItems: 'center',
    width: width,
  },
  abonnement: {
    width: width,
    alignSelf: 'center',
    alignItems: 'center',
  },
});

export default DrawerScreen;
