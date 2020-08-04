import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import images from '../components/Images';
import ProfileBar from '../components/ProfileBar';
import ProfileTabs from '../components/ProfileTabs';

const { width, height } = Dimensions.get('window');
/* this is the user profile screen
  all his information will be displayed
  there are 5 different tabs: General info, Astrology, Taste, LifeStyle and 
*/
const ProfileScreen = ({ navigation }) => {
  const [activeIcon, setActiveIcon] = useState(3);
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>YOUR PROFILE</Text>
      </View>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={images.userPic}
          style={{
            width: width,
            height: height * 0.4,
            justifyContent: 'flex-end',
          }}
        />
        <View style={styles.editButton}>
          <TouchableOpacity onPress={() => navigation.navigate('Edit profile')}>
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
        <Text style={styles.footerText}>Julien , 26</Text>
        <Text style={styles.footerTextLocalisation}>Marseille, France</Text>
        <View style={styles.profileBar}>
          <ProfileBar
            pathIcon={
              activeIcon == 1 ? images.profile.sexeActif : images.profile.sexe
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
          <ProfileBar
            pathIcon={
              activeIcon == 5
                ? images.profile.castleActif
                : images.profile.castle
            }
            onPressTab={() => setActiveIcon(5)}
          />
        </View>
        <ProfileTabs activeTab={activeIcon} />
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
    top: 225,
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
  },
});
export default ProfileScreen;
