import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import { store } from './store';
import images from './/Images';
const DrawerHeader = (props) => {
  // const { state } = useContext(store);
  // console.log('\n\n\n Drawer Header', state);

  return (
    <View style={styles.header}>
      <View style={styles.account}>
        <ImageBackground
          source={images.userPic1}
          imageStyle={{
            borderRadius: 200,
          }}
          style={{
            marginTop: 10,
            width: 60,
            height: 60,
          }}
        />
        <View>
          {/* <Text style={styles.textStyle}>Signed in as: </Text> */}
          <Text style={styles.textStyle}> Racim RIGHI </Text>
          <Text style={styles.textStyle}> Email: racim@gmail.com </Text>
        </View>
        {/* <TouchableOpacity
          onPress={() => props.navigation.navigate('Settings')}
          style={styles.settingsButton}>
          <Icon
            size={35}
            type="Ionicons"
            name="ios-settings"
            color="black"
            {...props}
          />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fce0d8',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsButton: {
    position: 'absolute',
    top: 10,
    left: 220,
    right: 0,
  },
  account: {
    flexDirection: 'row',
    backgroundColor: '#faf2dd',
    padding: 5,
    margin: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 260,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  textStyle: {
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default DrawerHeader;
