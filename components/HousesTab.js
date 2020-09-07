import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native';

import { signs, signsIcons } from '../services/astrology';
import images from '../services/Images';
// Astrology tab in the user profile screen
const AstroTab = (props) => {
  const { fullState } = props;

  let houses = Object.keys(fullState.themeAstral.houses).map(function (key) {
    return {
      id: key,
      title: fullState.themeAstral.houses[key][0],
    };
  });

  const Item = ({ item }) => (
    <TouchableOpacity style={styles.content}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.title}>House {item.id.slice(1)}</Text>
      </View>
      <ImageBackground source={images.ellipseWhite} style={styles.ellipse}>
        <View style={styles.item}>
          <Image source={signsIcons[item.title]} style={styles.icons} />
          <Text style={styles.contentText}>{signs[item.title]} </Text>
        </View>
        {/* <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          ullamcorper purus sed risus condimentum pulvinar. Sed sit amet urna id
          lacus eleifend tristique. Sed tristique placerat rhoncus.
        </Text> */}
      </ImageBackground>
      <View style={styles.divider} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.divider} />
      <Text style={styles.tabTitle}> Maisons astrologiques</Text>
      <View style={styles.divider} />
      <FlatList
        data={houses}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-around',
          margin: 1,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D2CBCB',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9E7E7',
    width: 200,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  ellipse: {
    height: 120,
    width: 120,
    justifyContent: 'center',
    resizeMode: 'center',
  },
  tabTitle: {
    fontFamily: 'DancingScript-Bold',
    fontSize: 40,
    marginVertical: 5,
    alignSelf: 'center',
  },
  icons: {
    marginLeft: 5,
    padding: 10,
    height: 40,
    width: 45,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: 'DancingScript-Bold',
    fontSize: 30,
    marginLeft: 10,
    marginVertical: 5,
  },
  divider: {
    marginTop: 10,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  contentText: {
    marginTop: 6,
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  text: {
    marginTop: 3,
    marginHorizontal: 5,
    fontSize: 15,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AstroTab;
