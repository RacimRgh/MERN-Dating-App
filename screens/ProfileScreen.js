import React, { useState, useContext, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-dynamic-vector-icons';
import images from '../services/Images';
import ProfileBar from '../components/ProfileBar';
import ProfileTabs from '../components/ProfileTabs';
import { store } from '../services/store';

const { width, height } = Dimensions.get('window');
/* this is the user profile screen
  all his information will be displayed
  there are 5 different tabs: General info, Astrology, Taste, LifeStyle and 
*/

const ProfileScreen = ({ navigation }) => {
  const [activeIcon, setActiveIcon] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const { dispatch, state } = useContext(store);
  const [fullState, setState] = useState(state);
  const [photo, setPhoto] = useState({});

  // async function fetchData() {
  //   await dispatch({ type: 'GET_PROFILE' });
  // }
  // fetchData().then(() => {
  //   setState(state);
  // });

  useEffect(() => {
    async function fetchData() {
      await dispatch({ type: 'GET_PROFILE' });
    }
    fetchData().then(() => {
      setState(state);
      setTimeout(() => {
        // console.log(
        //   '\n\n\nProfile Screen 1:______________\n',
        //   state.description,
        // );
        console.log(
          '\n\n\nProfile Screen 2:______________\n',
          fullState.avatar,
        );
        setPhoto(fullState.avatar);
        setIsLoading(false);
      }, 5000);
    });
  }, []);

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
        <Text> LOADING ...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground
          defaultSource={images.userPic3}
          source={
            fullState.avatar == undefined ? images.userPic3 : fullState.avatar
          }
          imageStyle={{
            borderRadius: 200,
          }}
          style={{
            marginTop: 20,
            width: width,
            height: height * 0.52,
          }}
        />
        <View style={styles.editButton}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Modifier mon profil')}>
            <ImageBackground source={images.ellipse} style={styles.ellipseIcon}>
              <ImageBackground
                source={images.pencil}
                style={styles.pencilIcon}
              />
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.divider} />
        <Text style={styles.footerText}>
          {fullState.lastname} ,{' '}
          {new Date().getFullYear() -
            new Date(fullState.birthday).getFullYear()}{' '}
          ans
        </Text>
        <Text style={styles.footerTextLocalisation}>
          {fullState.city.toUpperCase()}, {fullState.country.toUpperCase()}
        </Text>
        <View style={styles.profileBar}>
          <ProfileBar
            pathIcon={
              activeIcon == 1
                ? images.profile.castleActif
                : images.profile.castle
            }
            onPressTab={() => setActiveIcon(1)}
          />
          <ProfileBar
            pathIcon={
              activeIcon == 2
                ? images.profile.planeteActif
                : images.profile.planete
            }
            onPressTab={() => setActiveIcon(2)}
          />
          <ProfileBar
            pathIcon={
              activeIcon == 3 ? images.profile.manActif : images.profile.man
            }
            onPressTab={() => setActiveIcon(3)}
          />
          <ProfileBar
            pathIcon={
              activeIcon == 4 ? images.profile.coeurActif : images.profile.coeur
            }
            onPressTab={() => setActiveIcon(4)}
          />
        </View>
        <ProfileTabs activeTab={activeIcon} data={fullState} />
        <View style={styles.divider} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingBottom: 100,
  },
  header: {
    flex: 1,
    width: width,
    backgroundColor: '#fd5098',
  },
  headerText: {
    marginTop: 20,
    alignSelf: 'center',
    fontSize: 26,
    fontFamily: 'arial',
    color: 'white',
  },
  footer: {
    width: '100%',
    flex: 3,
    marginTop: 5,
    backgroundColor: 'white',
  },
  footerText: {
    marginTop: 10,
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  footerTextLocalisation: {
    marginBottom: 10,
    marginLeft: 20,
    fontSize: 15,
    color: 'black',
  },
  imageContainer: {
    marginBottom: 10,
  },
  editButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    top: 335,
  },
  ellipseIcon: {
    height: 80,
    width: 80,
    justifyContent: 'center',
    resizeMode: 'center',
  },
  pencilIcon: {
    height: 40,
    width: 40,
    alignSelf: 'center',
    resizeMode: 'center',
  },
  divider: {
    marginTop: 10,
    borderBottomColor: '#ccffff',
    borderBottomWidth: 1,
  },
  profileBar: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
export default ProfileScreen;
