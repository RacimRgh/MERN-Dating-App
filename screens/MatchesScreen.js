import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  TextInput,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-dynamic-vector-icons';
// Local imports
import images from '../services/Images';
import deviceStorage from '../services/deviceStorage';
import { age } from './ProfileScreen';
import FilterScreen from './FilterScreen';

// Matches screens
const MatchesScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [choice, setChoice] = useState(2);
  useEffect(() => {
    deviceStorage.loadJWT().then((user_token) => {
      axios({
        method: 'GET',
        url: 'http://10.0.2.2:3000/compatibles',
        headers: {
          Authorization: 'Bearer ' + user_token,
        },
      }).then((result) => {
        console.log('\n\nMatches: ', result.data);
        setState(result.data);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
    });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  const NoMatch = () => {
    return (
      <View style={styles.section}>
        <Text style={styles.tabTitle}>
          Vous n'avez pas de compatibles pour le moment
        </Text>
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
    );
  };

  const Item = ({ item }) => {
    return (
      <View style={styles.item}>
        <Image
          style={{ height: 150, width: '90%', borderRadius: 90 }}
          source={
            item.avatars == undefined || item.avatars.length == 0
              ? images.userPic3
              : item.avatars
          }
        />
        <Text style={styles.contentText}>{item.prenom}</Text>
        <Text style={styles.contentText}>{age(item.birthdaydate)} ans</Text>
        <Text style={styles.contentText}>
          {item.cityName}, {item.countryName}
        </Text>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TouchableOpacity style={styles.button}>
            <Icon name="unlink" type="FontAwesome" size={35} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('Messages');
            }}>
            <Icon name="message" type="Feather" size={35} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Icon name="profile" type="AntDesign" size={35} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {state.length == 0 ? (
        <NoMatch />
      ) : choice == 1 ? (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <TouchableOpacity
              style={choice == 1 ? styles.choice1 : styles.choice}
              onPress={() => setChoice(1)}>
              <Text style={styles.titles2}>Par nom</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={choice == 2 ? styles.choice1 : styles.choice}
              onPress={() => setChoice(2)}>
              <Text style={styles.titles2}>Par région</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              placeholder="Rechercher un compatible"
              style={{
                borderRadius: 50,
                margin: 10,
                borderWidth: 1,
                borderColor: '#D2CBCB',
                paddingLeft: 10,
                width: '80%',
              }}
              onChangeText={(val) => setSearchValue(val)}
            />
            <TouchableOpacity>
              <Icon type="AntDesign" name="search1" size={35} />
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <Text style={styles.titles}>
            Nombre de compatibles: {state.length}
          </Text>
          <View style={styles.divider} />
          <FlatList
            data={state}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-around',
              margin: 1,
            }}
          />
        </View>
      ) : (
        <>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <TouchableOpacity
              style={choice == 1 ? styles.choice1 : styles.choice}
              onPress={() => setChoice(1)}>
              <Text style={styles.titles2}>Par nom</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={choice == 2 ? styles.choice1 : styles.choice}
              onPress={() => setChoice(2)}>
              <Text style={styles.titles2}>Par région</Text>
            </TouchableOpacity>
          </View>
          <FilterScreen />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D2CBCB',
    flex: 1,
    backgroundColor: 'white',
  },
  section: {
    backgroundColor: '#D2CBCB',
    width: '100%',
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
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#D2CBCB',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  titles: {
    fontFamily: 'DancingScript-Bold',
    fontSize: 30,
    marginHorizontal: 10,
  },
  titles2: {
    fontFamily: 'DancingScript-Bold',
    fontSize: 23,
    marginHorizontal: 10,
  },
  divider: {
    marginVertical: 10,
    borderBottomColor: '#D2CBCB',
    borderBottomWidth: 1,
  },
  tabTitle: {
    fontWeight: 'bold',
    fontSize: 25,
    marginVertical: 5,
    alignSelf: 'center',
  },
  contentText: {
    fontSize: 25,
    fontFamily: 'DancingScript-Bold',
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    paddingVertical: 20,
    width: '48%',
    borderRadius: 50,
    backgroundColor: '#F9E7E7',
    borderWidth: 1,
    borderColor: '#D2CBCB',
  },
  choice: {
    borderWidth: 0.5,
    borderColor: '#7D938A',
    padding: 10,
  },
  choice1: {
    borderWidth: 0.5,
    borderColor: '#7D938A',
    padding: 10,
    backgroundColor: '#7D938A',
  },
});

export default MatchesScreen;
