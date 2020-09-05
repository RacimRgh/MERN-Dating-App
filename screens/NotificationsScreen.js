import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import images from '../services/Images';

// Notifications screens
const NotificationsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.tabTitle}> Vous avez 0 Notifications</Text>
        <Text style={styles.tabTitle}>
          Likez des utilisateurs pour avoir des matchs !
        </Text>
        <View style={styles.divider} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Recherche');
          }}>
          <Text style={styles.titles}>Aller</Text>
        </TouchableOpacity>
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

export default NotificationsScreen;
