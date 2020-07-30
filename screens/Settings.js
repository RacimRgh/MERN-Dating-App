import React from 'react';
import { ScrollView, FlatList, View, Text, StyleSheet } from 'react-native';

const Settings = ({ navigation }) => {
  const DATA = [
    {
      email: 'racim45@gmail.com',
      password: 'xxxxx',
      name: 'racim',
      lastname: 'righi',
    },
  ];
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titleStyle}>Mon compte</Text>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <View>
              <View style={styles.cards}>
                <Text style={styles.cardText}>Your email: {item.email}</Text>
              </View>
              <View style={styles.cards}>
                <Text style={styles.cardText}>Your name: {item.name}</Text>
              </View>
              <View style={styles.cards}>
                <Text style={styles.cardText}>{item.password}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.email}
        />
        <View style={styles.divider} />
      </View>
      <View>
        <Text style={styles.titleStyle}>Notifications</Text>
        <View style={styles.divider} />
      </View>
      <View>
        <Text style={styles.titleStyle}>Sécurité</Text>
        <View style={styles.divider} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
  },
  divider: {
    marginTop: 10,
    borderBottomColor: '#ccffff',
    borderBottomWidth: 1,
  },
  titleStyle: {
    marginHorizontal: 20,
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  cards: {
    padding: 10,
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 20,
  },
});
export default Settings;
