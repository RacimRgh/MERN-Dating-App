import React from 'react';
import { View, Text } from 'react-native';
import Match from '../components/Match';
import FastImage from 'react-native-fast-image';

const HomeScreen = () => {
  return (
    <FastImage
      style={{ width: 200, height: 200 }}
      source={{
        uri: 'https://unsplash.it/400/400?image=1',
        headers: { Authorization: 'someAuthToken' },
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.contain}
    />
  );
};

export default HomeScreen;
