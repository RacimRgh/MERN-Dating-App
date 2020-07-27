import FastImage from 'react-native-fast-image';
import React from 'react';
import { View, Text } from 'react-native';
import images from './Images';

const Match = () => {
  return (
    <View>
      <FastImage
        style={{
          width: 400,
          height: 400,
          borderRadius: 200,
        }}
        source={{
          uri: 'https://unsplash.it/400/400?image=1',
          headers: { Picture: 'Match pictures' },
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

export default Match;
