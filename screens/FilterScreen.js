import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import ModalDropdown from 'react-native-modal-dropdown';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import images from '../components/Images';
import { s_a, country_arr } from '../services/countries';

// Messages screens
// Work in progress
const FilterScreen = ({ navigation }) => {
  const [numCountry, setNumCountry] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.tabTitle}>Recherche par région</Text>
        <View style={styles.divider} />
        <View style={styles.content}>
          <Text style={styles.titles}>Pays</Text>
          <ModalDropdown
            options={country_arr}
            textStyle={styles.titles}
            style={{ width: '60%' }}
            dropdownStyle={{
              width: '60%',
              shadowColor: '#000',
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.3,
              shadowRadius: 1,
              elevation: 2,
            }}
            dropdownTextStyle={styles.titles}
            onSelect={(idx, data) => {
              setNumCountry(idx + 1);
            }}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.titles}>Ville</Text>
          <ModalDropdown
            options={s_a[numCountry]}
            textStyle={styles.titles}
            style={{ width: '60%' }}
            dropdownStyle={{
              width: '60%',
              shadowColor: '#000',
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.3,
              shadowRadius: 1,
              elevation: 2,
            }}
            dropdownTextStyle={styles.titles}
            onSelect={(idx, data) => {}}
          />
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.titles}>Rechercher</Text>
          <Icon name="search" type="ionicons" size={35} />
        </TouchableOpacity>
      </View>
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}></MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  section: {
    // backgroundColor: '#fbe7c2',
    // backgroundColor: '#ECCFC3',
    backgroundColor: '#D2CBCB',
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
  content: {
    flexDirection: 'row',
    backgroundColor: '#F9E7E7',
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
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#F9E7E7',
    borderRadius: 50,
    padding: 10,
    width: '50%',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    margin: 5,
  },
  mapContainer: {
    height: 400,
    width: 400,
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
  tabTitle: {
    fontWeight: 'bold',
    fontSize: 25,
    marginVertical: 5,
    alignSelf: 'center',
  },
  contentText: {
    fontSize: 18,
    alignSelf: 'center',
  },
});

export default FilterScreen;
