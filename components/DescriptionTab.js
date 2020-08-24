import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import { store } from '../components/store';

const DescriptionTab = () => {
  const { state } = useContext(store);
  const DATA = [
    {
      title: 'Description',
      data: [
        {
          Bio:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porttitor metus nibh, et finibus massa pharetra ornare. Vivamus vitaeest interdum, bibendum metus sit amet, elementum nisl. In ac arcu ut mi placerat ultrices non sed nibh.',
        },
      ],
    },
    {
      title: 'Apparence',
      data: [
        { Yeux: state.description.phydesc.eyecolor },
        { Cheveux: state.description.phydesc.haircolor },
        { Taille: state.description.phydesc.height },
        { Poids: state.description.phydesc.weight },
      ],
    },
  ];

  const icons = {
    Bio: { iconType: 'ionicons', name: 'person' },
    Yeux: { iconType: 'FontAwesome', name: 'eye' },
    Cheveux: { iconType: 'MaterialCommunityIcons', name: 'head' },
    Taille: { iconType: 'MaterialCommunityIcons', name: 'human-male-height' },
    Poids: { iconType: 'MaterialCommunityIcons', name: 'weight' },
  };
  return (
    <View>
      <Text style={styles.tabTitle}>Informations générales</Text>
      <View style={styles.section}>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <View style={styles.content}>
              <Icon
                size={25}
                name={icons[Object.keys(item)].name}
                color="black"
                type={icons[Object.keys(item)].iconType}
                style={{ marginRight: 10 }}
              />
              <Text style={styles.contentText}>
                {Object.keys(item)} :{' '}
                {Object.values(item)[0] === undefined
                  ? 'Pas mentionné'
                  : Object.values(item)}
              </Text>
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View>
              <View style={styles.divider} />
              <Text style={styles.titles}>{title}</Text>
              <View style={styles.divider} />
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#fbe7c2',
    borderRadius: 10,
    margin: 8,
    padding: 10,
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  titles: {
    fontWeight: 'bold',
    fontSize: 20,
    marginHorizontal: 10,
  },
  divider: {
    marginVertical: 10,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  content: {
    flexDirection: 'row',
    backgroundColor: '#faf2dd',
    borderRadius: 10,
    margin: 8,
    padding: 10,
    paddingRight: 30,
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  tabTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    marginVertical: 5,
    alignSelf: 'center',
  },
  contentText: {
    fontSize: 18,
    alignSelf: 'center',
  },
});

export default DescriptionTab;
