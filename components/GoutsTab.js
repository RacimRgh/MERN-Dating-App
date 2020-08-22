import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GoutsTab = () => {
  return (
    <View>
      {/* <View style={styles.divider} /> */}
      <Text style={styles.tabTitle}>Gouts</Text>
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
  divider: {
    marginTop: 10,
    borderBottomColor: '#ccffff',
    borderBottomWidth: 1,
  },
  tabTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    marginVertical: 5,
    alignSelf: 'center',
  },
});

export default GoutsTab;
