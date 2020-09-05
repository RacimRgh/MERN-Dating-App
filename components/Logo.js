import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import images from '../services/Images';

const Logo = (props) => {
  const { logoText, logoComponent, cardState } = props;
  return (
    <View style={styles.container}>
      {logoComponent || (
        <View style={styles.row}>
          <Text style={styles.textStyle}>{logoText}</Text>
          {cardState ? (
            <View style={styles.iconStyle}>
              <Image
                source={images.logo}
                style={{
                  height: 180,
                  width: 180,
                  marginRight: 30,
                  marginTop: 10,
                }}
              />
            </View>
          ) : undefined}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 50,
    color: 'white',
    fontFamily: 'DancingScript-Bold',
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: { marginLeft: 12 },
});

export default Logo;
