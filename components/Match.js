import FastImage from 'react-native-fast-image';
import React from 'react';
import { View, Text } from 'react-native';

const Match = () => {
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

export default Match;
