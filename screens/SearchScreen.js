import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Match from '../components/Match';
/*
 Search screen ?
 work in progress
*/

const SearchScreen = () => {
  return (
    <View style={styles.page}>
      <Match />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default SearchScreen;
