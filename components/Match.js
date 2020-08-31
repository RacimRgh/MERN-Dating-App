import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  Modal,
  ScrollView,
} from 'react-native';
const { width, height } = Dimensions.get('window');
import Icon from 'react-native-dynamic-vector-icons';
import axios from 'axios';
// Local components
import images from './Images';
import deviceStorage from '../services/deviceStorage';
import AstroTab from './AstroTab';
import DescriptionTab from './DescriptionTab';

const Match = () => {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState([]);
  const [active, setActive] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const pics = [images.userPic, images.userPic1, images.userPic2];

  useEffect(() => {
    deviceStorage.loadJWT().then((user_token) => {
      axios({
        method: 'GET',
        url: 'http://10.0.2.2:3000/users/me/compatibles',
        headers: {
          Authorization: 'Bearer ' + user_token,
        },
      }).then((result) => {
        console.log('\n\nMatch: ', result.data);
        setState(result.data);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
    });
  }, []);

  const SeeMoreModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.modalView}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.account}>
                <Icon
                  name="circle-with-cross"
                  type="Entypo"
                  size={35}
                  color="red"
                />
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
                  {state[active].nom.toUpperCase()}{' '}
                  {state[active].prenom.toUpperCase()}
                </Text>
              </TouchableOpacity>
              <DescriptionTab fullState={state[0]} />
              <AstroTab fullState={state[0]} />
            </View>
          </View>
        </ScrollView>
      </Modal>
    );
  };

  const onPressNext = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    setActive(active + 1);
  };
  const onPressLast = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    setActive(active - 1);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <SeeMoreModal />
      <ImageBackground
        style={{
          width: width * 0.95,
          height: height * 0.66,
          borderRadius: 30,
          flexDirection: 'column-reverse',
        }}
        imageStyle={{ borderRadius: 30 }}
        source={pics[active]}>
        <View style={styles.infoContainer}>
          <View style={styles.divider} />
          <View
            style={{
              flexDirection: 'row-reverse',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <View>
                <Text style={styles.textInfo}>
                  <Icon
                    name="arrow-bottom-right"
                    type="MaterialCommunityIcons"
                    size={25}
                    color="white"
                  />
                  Voir plus
                </Text>
              </View>
            </TouchableOpacity>
            <View>
              <Text style={styles.textInfo}>
                <Icon
                  name="face-profile"
                  type="MaterialCommunityIcons"
                  size={25}
                  color="white"
                />
                {state[active].nom},
                {new Date().getFullYear() -
                  new Date(state[active].birthday).getFullYear()}{' '}
                ans
              </Text>
              <Text style={styles.textInfo}>
                <Icon
                  name="location-on"
                  type="MaterialIcons"
                  size={25}
                  color="white"
                />
                {state[active].city},{state[active].country}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={onPressLast}>
          <View style={styles.choiceIcon}>
            <Icon
              size={35}
              name="rewind"
              type="MaterialCommunityIcons"
              color="black"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.choiceIcon}>
            <Icon size={50} name="report" type="MaterialIcons" color="black" />
          </View>
        </TouchableOpacity>
        <View style={styles.compatIcon}>
          <Icon
            size={40}
            name="percent"
            type="MaterialCommunityIcons"
            color="black"
          />
          <Text style={styles.iconText}>{state[active].compatibility}</Text>
        </View>
        <TouchableOpacity>
          <View style={styles.choiceIcon}>
            <Icon size={50} name="like" type="SimpleLineIcons" color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressNext}>
          <View style={styles.choiceIcon}>
            <Icon
              size={35}
              name="navigate-next"
              type="MaterialIcons"
              color="black"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    width: '90%',
    backgroundColor: 'white',
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
  iconText: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  divider: {
    marginVertical: 10,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  infoContainer: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    padding: 10,
  },
  textInfo: {
    color: 'white',
    fontSize: 25,
    marginLeft: 8,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#ece0e6',
    backgroundColor: '#EEB9D5',
    marginTop: 3,
    width: width,
  },
  choiceIcon: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFE2F1',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  compatIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginBottom: 20,
    marginTop: 5,
    backgroundColor: '#FFE2F1',
    borderRadius: 200,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  account: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    backgroundColor: '#faf2dd',
    padding: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
});
export default Match;
