import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  TextInput,
} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import axios from 'axios';
// Local imports
import images from '../services/Images';
import deviceStorage from '../services/deviceStorage';
import BuyPremium from '../components/BuyPremium';
import { store } from '../services/store';
// Messages screens

const MessagesScreen = ({ navigation }) => {
  const [premium, setPremium] = useState(true);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState([]);
  const current = useContext(store);
  console.log(current.state.initialState.id);
  useEffect(() => {
    deviceStorage.loadJWT().then((user_token) => {
      axios({
        method: 'GET',
        url: 'http://10.0.2.2:3000/compatibles',
        headers: {
          Authorization: 'Bearer ' + user_token,
        },
      }).then((result) => {
        // console.log('\n\nMatch: ', result.data);
        setState(result.data);
        const DATA = result.data.map((value) => {
          return {
            otherId: value._id,
            currentId: current.state.initialState.id,
            name: value.prenom,
            photo: value.avatar,
          };
        });
        setTimeout(() => {
          setState(DATA);
          // console.log('\n\n matches: ', state);
          setLoading(false);
        }, 2000);
      });
    });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ChatRoom', {
            currentId: item.currentId,
            otherId: item.otherId,
            name: item.name,
            photo: item.photo,
          })
        }
        style={styles.userContainer}>
        <View>
          <Image
            source={
              item.photo === undefined || item.photo.length == 0
                ? images.userPic3
                : item.photo
            }
            style={{ height: 50, width: 50, borderRadius: 50 }}
          />
        </View>
        <View style={{ width: '70%' }}>
          <Text style={styles.textInfo}>{item.name}</Text>
          <View style={styles.messageContainer}>
            <Text> 1 NOUVEAU MESSAGE</Text>
          </View>
        </View>
        <View style={{ justifyContent: 'space-between' }}>
          <Icon type="AntDesign" name="message1" size={35} />
          <Icon type="MaterialCommunityIcons" name="link-off" size={35} />
        </View>
      </TouchableOpacity>
    );
  };

  return premium ? (
    <View style={styles.container}>
      <FlatList
        data={state}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  ) : (
    <BuyPremium />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    padding: 20,
  },
  userContainer: {
    padding: 10,
    margin: 5,
    borderColor: 'black',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F9E7E7',
  },
  messageContainer: {
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 10,
  },
  text: {
    fontFamily: 'DancingScript-Bold',
    fontSize: 30,
    marginHorizontal: 5,
  },
  textInfo: {
    fontFamily: 'monospace',
    color: 'black',
    fontSize: 17,
    marginHorizontal: 10,
  },
  divider: {
    marginVertical: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  textInputStyle: {
    fontSize: 14,
    fontWeight: '800',
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default MessagesScreen;
