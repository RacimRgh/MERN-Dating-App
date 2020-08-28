import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
const { width, height } = Dimensions.get('window');
import Icon from 'react-native-dynamic-vector-icons';
import images from './Images';

const Match = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{
          width: width * 0.95,
          height: height * 0.66,
          borderRadius: 30,
          flexDirection: 'column-reverse',
        }}
        imageStyle={{ borderRadius: 30 }}
        source={images.userPic2}>
        <View style={styles.infoContainer}>
          <View style={styles.divider} />
          <View
            style={{
              flexDirection: 'row-reverse',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity>
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
                Sonia, 20 ans
              </Text>
              <Text style={styles.textInfo}>
                <Icon
                  name="location-on"
                  type="MaterialIcons"
                  size={25}
                  color="white"
                />
                100 km
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.iconsContainer}>
        <TouchableOpacity>
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
          <Text style={styles.iconText}> 100 </Text>
        </View>
        <TouchableOpacity>
          <View style={styles.choiceIcon}>
            <Icon size={50} name="like" type="SimpleLineIcons" color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
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
});
export default Match;
