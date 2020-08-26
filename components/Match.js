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
          height: height * 0.69,
          borderRadius: 30,
          flexDirection: 'column-reverse',
        }}
        imageStyle={{ borderRadius: 30 }}
        source={images.userPic2}>
        <View style={styles.infoContainer}>
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
            <View style={styles.divider} />
            <Text style={styles.textInfo}>
              <Icon
                name="face-profile"
                type="MaterialCommunityIcons"
                size={25}
                color="white"
              />
              Racima, 20 ans
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
      </ImageBackground>
      <View style={styles.iconsContainer}>
        <TouchableOpacity>
          <View style={styles.choiceIcon}>
            <Icon size={40} name="cross" type="Entypo" color="red" />
          </View>
        </TouchableOpacity>
        <View style={styles.choiceIcon}>
          <Text style={styles.iconText}> 100 %</Text>
        </View>
        <TouchableOpacity>
          <View style={styles.choiceIcon}>
            <Icon
              size={40}
              name="heart"
              type="MaterialCommunityIcons"
              color="red"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {},
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fbe7c2',
    borderRadius: 200,
    marginTop: 3,
  },
  choiceIcon: {
    padding: 20,
    margin: 10,
    borderRadius: 200,
    backgroundColor: '#faf2dd',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
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
    justifyContent: 'center',
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    padding: 10,
  },
  textInfo: {
    color: 'white',
    fontSize: 25,
    marginLeft: 8,
  },
});
export default Match;
