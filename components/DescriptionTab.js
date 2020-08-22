import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  SafeAreaView,
} from 'react-native';
import { store } from '../components/store';

const DescriptionTab = () => {
  const DATA = [
    {
      title: 'Informations générales',
      data: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porttitor metus nibh, et finibus massa pharetra ornare. Vivamus vitaeest interdum, bibendum metus sit amet, elementum nisl. In ac arcu ut mi placerat ultrices non sed nibh.',
      ],
    },
    {
      title: 'Lifestyle',
      data: ['Football', 'Dragonforce'],
    },
    {
      title: 'Apparence',
      data: ['Marron', 'Chatins', '1m75', 63],
    },
  ];
  const Item = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.titles}>{item}</Text>
    </View>
  );

  return (
    <View>
      <Text style={styles.tabTitle}>Informations générales</Text>
      {/* <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.content}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View>
            <View style={styles.divider} />
            <Text style={styles.titles}>{title}</Text>
          </View>
        )}
      /> */}
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
    marginHorizontal: 10,
  },
  divider: {
    marginVertical: 10,
    borderBottomColor: '#ccffff',
    borderBottomWidth: 1,
  },
  content: {
    marginHorizontal: 10,
  },
  tabTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    marginVertical: 5,
    alignSelf: 'center',
  },
});

export default DescriptionTab;
