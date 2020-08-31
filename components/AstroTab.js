import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  ImageBackground,
} from 'react-native';

import { signs, signsIcons, planetsIcons } from './astrology';
import images from './Images';
// Astrology tab in the user profile screens

const AstroTab = (props) => {
  const { fullState } = props;

  let planetes = Object.keys(fullState.themeAstral.planetes).map(function (
    key,
  ) {
    return {
      id: key,
      title: fullState.themeAstral.planetes[key][0],
    };
  });

  const Item = ({ item }) => (
    <TouchableOpacity style={styles.content}>
      <View style={{ flexDirection: 'row' }}>
        <Image source={planetsIcons[item.id]} style={styles.icons} />
        <Text style={styles.title}>{item.id}</Text>
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
      <Text style={styles.tabTitle}> Planetes</Text>
      <View style={styles.divider} />
      <FlatList
        data={planetes}
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
    backgroundColor: '#fbe7c2',
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
    backgroundColor: '#faf2dd',
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
    fontWeight: 'bold',
    fontSize: 30,
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
    fontWeight: 'bold',
    fontSize: 25,
    marginLeft: 1,
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
