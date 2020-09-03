import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import TabBarIcon from './TabBarIcon';
import images from './Images';

const ProfileBar = (props) => {
  const { pathIcon, onPressTab } = props;
  return (
    <ImageBackground source={images.ellipseGrey} style={styles.ellipseIcon}>
      <TabBarIcon pathIcon={pathIcon} onPressTab={onPressTab} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  icons: {
    margin: 20,
    padding: 10,
    height: 40,
    width: 45,
    resizeMode: 'stretch',
  },
  ellipseIcon: {
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'center',
  },
});

export default ProfileBar;
