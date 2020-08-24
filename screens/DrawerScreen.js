import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-dynamic-vector-icons';
import DrawerHeader from '../components/DrawerHeader';
import { AuthContext } from '../components/context';
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
          labelStyle={{ fontSize: 16, fontFamily: 'OpenSans-SemiBold' }}
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
          label="Settings"
          onPress={() => props.navigation.navigate('Settings')}
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
          label="Edit my profile"
          onPress={() => props.navigation.navigate('Edit profile')}
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
          label="Sign out"
          onPress={() => {
            signOut();
          }}
          style={styles.signOutButton}
          labelStyle={{ fontSize: 16, fontFamily: 'OpenSans-SemiBold' }}
          activeTintColor="#2196f3"
          activeBackgroundColor="rgba(0, 0, 0, .04)"
          inactiveTintColor="rgba(0, 0, 0, .87)"
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
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 120,
    backgroundColor: '#faf2dd',
    height: height,
  },
  drawerContainer: {
    backgroundColor: '#faf2dd',
    height: height,
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
