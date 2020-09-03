import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';

const TabBarIcon = (props) => {
  const { pathIcon, onPressTab } = props;
  return (
    <TouchableOpacity onPress={onPressTab}>
      {/* <Icon
        name={pathIcon}
        type="MaterialCommunityIcons"
        size={40}
        color="black"
      /> */}
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
  },
});

export default TabBarIcon;
