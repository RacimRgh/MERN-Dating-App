import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DescriptionTab = () => {
  return (
    <View>
      <View style={styles.divider} />
      <Text style={styles.titles}>Informations générales</Text>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
        porttitor metus nibh, et finibus massa pharetra ornare. Vivamus vitae
        est interdum, bibendum metus sit amet, elementum nisl. In ac arcu ut mi
        placerat ultrices non sed nibh. Pellentesque habitant morbi tristique
        senectus et netus et malesuada fames ac turpis egestas. Suspendisse
        dictum mattis ornare. Pellentesque habitant morbi tristique senectus et
        netus et malesuada fames ac turpis egestas. Aliquam fringilla diam ut
        euismod facilisis. Nam placerat, enim id aliquam dignissim, magna ex
        rhoncus tellus, condimentum dictum nunc ante sit amet libero. In
        bibendum malesuada erat, at fringilla mauris rhoncus vitae. Vivamus
        metus nisi, scelerisque vitae lacus in, blandit vulputate mi. Cras
        molestie eros enim, in pretium nisi pharetra nec.
      </Text>
      <View style={styles.divider} />
      <Text style={styles.titles}>Lifestyle</Text>
      <View style={styles.divider} />
      <Text style={styles.titles}>Apparence</Text>
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

export default DescriptionTab;
