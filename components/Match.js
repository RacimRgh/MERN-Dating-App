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
  Image,
} from 'react-native';
const { width, height } = Dimensions.get('window');
import Icon from 'react-native-dynamic-vector-icons';
import axios from 'axios';
// Local components
import images from '../services/Images';
import deviceStorage from '../services/deviceStorage';
import AstroTab from './AstroTab';
import DescriptionTab from './DescriptionTab';
import GoutsTab from './GoutsTab';
import HousesTab from './HousesTab';

const Match = () => {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState([]);
  const [active, setActive] = useState(0);
  const [noMatch, setNoMatch] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [matchModal, setMatchModal] = useState(false);
  const pics = [
    images.userPic1,
    images.userPic4,
    images.userPic3,
    images.userPic2,
  ];

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

  const SendLike = ({ id }) => {
    console.log(id);
    deviceStorage.loadJWT().then((user_token) => {
      axios({
        method: 'POST',
        url: 'http://10.0.2.2:3000/compatibles',
        headers: {
          Authorization: 'Bearer ' + user_token,
        },
        data: {
          userliked: id,
        },
      }).then((result) => {
        console.log('\n\nLiked: ', typeof result.data);
        if (typeof result.data == 'object') {
          setMatchModal(true);
        }
        // setState(result.data);
        setTimeout(() => {
          // setLoading(false);
        }, 2000);
      });
    });
  };

  const MatchModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={matchModal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.modalView}>
          <View style={styles.container}>
            <Text
              style={{
                fontSize: 25,
                fontFamily: 'DancingScript-Bold',
              }}>
              VOUS AVEZ UN COMPATIBLE !
            </Text>
            <Image source={images.logo} style={{ height: 100, width: 100 }} />
          </View>
          <View style={styles.container}>
            <Image
              style={{
                width: 350,
                height: 350,
                borderRadius: 100,
              }}
              imageStyle={{ borderRadius: 100 }}
              source={
                state[active].avatar == undefined ||
                state[active].avatar.length == 0
                  ? pics[2]
                  : state[active].avatar
              }
            />
            <Text
              style={{
                fontSize: 25,
                fontFamily: 'DancingScript-Bold',
              }}>
              {state[active].nom.toUpperCase()} {state[active].prenom}
            </Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity style={{ alignItems: 'center' }}>
              <Icon name="new-message" type="Entypo" size={40} color="red" />
              <Text>Envoyer un message</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={() => setMatchModal(false)}>
            <Icon
              name="circle-with-cross"
              type="Entypo"
              size={40}
              color="red"
            />
            <Text>Fermer</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

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
                  size={40}
                  color="red"
                />
                <Text
                  style={{
                    fontSize: 25,
                    fontFamily: 'DancingScript-Bold',
                  }}>
                  {state[active].nom.toUpperCase()} {state[active].prenom}
                </Text>
              </TouchableOpacity>
              <DescriptionTab fullState={state[active]} />
              <GoutsTab fullState={state[active]} />
              <AstroTab fullState={state[active]} />
              <HousesTab fullState={state[active]} />
            </View>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.account}>
              <Icon
                name="circle-with-cross"
                type="Entypo"
                size={40}
                color="red"
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>
    );
  };

  const onPressNext = () => {
    setLoading(true);
    setActive(active + 1);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    if (active == state.length - 1) setNoMatch(true);
  };
  const onPressLast = () => {
    setLoading(true);
    setActive(active - 1);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    console.log('\n\n active12: ', active);
    if (active < 0) setNoMatch(true);
  };

  const age = (birthDate) => {
    birthDate = new Date(birthDate);
    const otherDate = new Date();

    var years = otherDate.getFullYear() - birthDate.getFullYear();

    if (
      otherDate.getMonth() < birthDate.getMonth() ||
      (otherDate.getMonth() == birthDate.getMonth() &&
        otherDate.getDate() < birthDate.getDate())
    ) {
      years--;
    }

    return years;
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (noMatch) {
    console.log('\n\n\n HERE\n\n\n');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={images.logo} style={{ height: 100, width: 100 }} />
        <Text
          style={{
            marginHorizontal: 5,
            fontSize: 30,
            color: 'black',
            fontFamily: 'DancingScript-Bold',
          }}>
          Aucune nouvelle personne à proximité. Vous pouvez acheter un
          abonnement premium pour revoir les utilisateurs.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SeeMoreModal />
      <MatchModal />
      <ImageBackground
        style={{
          width: width * 0.95,
          height: height * 0.66,
          borderRadius: 30,
          flexDirection: 'column-reverse',
          justifyContent: 'space-between',
        }}
        imageStyle={{ borderRadius: 30 }}
        source={
          state[active].avatar == undefined || state[active].avatar.length == 0
            ? pics[2]
            : state[active].avatar
        }>
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
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon
                  name="face-profile"
                  type="MaterialCommunityIcons"
                  size={25}
                  color="white"
                />
                <Text style={styles.textInfo}>{state[active].prenom}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon
                  name="birthday-cake"
                  type="FontAwesome"
                  size={25}
                  color="white"
                />
                <Text style={styles.textInfo}>
                  {age(state[active].birthday)} ans
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon
                  name="location-on"
                  type="MaterialIcons"
                  size={25}
                  color="white"
                />
                <Text style={styles.textInfo}>
                  {state[active].city}, {state[active].country}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          // source={images.ellipseWhite}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: 'white',
            borderBottomStartRadius: 20,
            borderBottomEndRadius: 20,
            flexDirection: 'row',
            padding: 10,
            paddingTop: 0,
          }}>
          <Text style={styles.iconText}>{state[active].compatibility}</Text>
          <Icon
            size={30}
            name="percent"
            type="MaterialCommunityIcons"
            color="black"
          />
        </View>
      </ImageBackground>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={onPressLast}>
          <View style={styles.choiceIcon}>
            <Image source={images.undo} style={{ width: 40, height: 40 }} />
            <Text style={styles.iconText}>Revenir</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => SendLike({ id: state[active].id })}>
          <View style={styles.choiceIcon}>
            <Image source={images.like} style={{ width: 40, height: 40 }} />
            <Text style={styles.iconText}>Like</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressNext}>
          <View style={styles.choiceIcon}>
            <Image source={images.next} style={{ width: 40, height: 40 }} />
            <Text style={styles.iconText}>Prochain</Text>
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
    fontFamily: 'DancingScript-Bold',
    fontSize: 25,
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
    backgroundColor: 'white',
    marginTop: 3,
    width: width,
  },
  choiceIcon: {
    padding: 10,
    borderRadius: 50,
    width: 120,
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
    backgroundColor: '#D2CBCB',
    padding: 15,
    margin: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
});
export default Match;
