import React, { useContext } from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';

import { store } from '../components/store';

const GoutsTab = (props) => {
  const { state } = useContext(store);
  const { fullState } = props;
  const DATA = [
    {
      title: 'Sports',
      data: fullState.description.tastes.sports,
    },
    {
      title: 'Musique',
      data: fullState.description.tastes.musique,
    },
    {
      title: 'Cinéma',
      data: fullState.description.tastes.movies,
    },
  ];
  const icons = {
    Sports: { iconType: 'MaterialCommunityIcons', name: 'basketball' },
    Musique: { iconType: 'MaterialCommunityIcons', name: 'music' },
    Cinéma: { iconType: 'MaterialCommunityIcons', name: 'movie' },
  };
  return (
    <View>
      <Text style={styles.tabTitle}>Gouts</Text>
      <View style={styles.section}>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <View style={styles.content}>
              <Text style={styles.contentText}>{item}</Text>
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Icon
                  size={25}
                  name={icons[title].name}
                  color="black"
                  type={icons[title].iconType}
                  style={{ marginRight: 10 }}
                />
                <Text style={styles.titles}>{title}</Text>
              </View>
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

export default GoutsTab;
