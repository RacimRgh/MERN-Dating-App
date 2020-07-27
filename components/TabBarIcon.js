import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';

const TabBarIcon = (props) => {
  const { pathIcon, onPressTab } = props;
  return (
    <TouchableOpacity onPress={onPressTab}>
      <Image source={pathIcon} style={styles.icons} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icons: {
    margin: 20,
    padding: 10,
    height: 40,
    width: 45,
    resizeMode: 'contain',
  },
});

export default TabBarIcon;
