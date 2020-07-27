import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GoutsTab = () => {
  return (
    <View>
      <View style={styles.divider} />
      <Text style={styles.titles}>Gouts</Text>
      <View style={styles.divider} />
    </View>
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
  titles: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  divider: {
    marginTop: 10,
    borderBottomColor: '#ccffff',
    borderBottomWidth: 1,
  },
});

export default GoutsTab;
