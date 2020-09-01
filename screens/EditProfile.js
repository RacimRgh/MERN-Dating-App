import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
  Button,
  Image,
} from 'react-native';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';
// local imports
import { store } from '../components/store';
import deviceStorage from '../services/deviceStorage';
import EditSection from '../components/EditSection';

const EditProfile = () => {
  const { dispatch, state } = useContext(store);
  const [photo, setPhoto] = useState();
  const [descriptionData, setDescription] = useState({ isLoading: true });
  useEffect(() => {
    async function fetchData() {
      await dispatch({ type: 'GET_PROFILE' });
    }
    fetchData();
    console.log('\n\n\nEditProfile: ', state);
    setTimeout(() => {
      setDescription({
        height: state.initialState.description.phydesc.height,
        weight: state.initialState.description.phydesc.weight,
        eyecolor: state.initialState.description.phydesc.eyecolor,
        haircolor: state.initialState.description.phydesc.haircolor,
        style: state.initialState.description.phydesc.style,
        sports: state.initialState.description.tastes.sports,
        musique: state.initialState.description.tastes.musique,
        movies: state.initialState.description.tastes.movies,
        isLoading: false,
      });
    }, 2000);
  }, []);

  if (descriptionData.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  async function onPressSave(value) {
    const user_token = await deviceStorage.loadJWT();
    const patchProfile = await axios({
      method: 'PATCH',
      url: 'http://10.0.2.2:3000/users/add',
      headers: {
        Authorization: 'Bearer ' + user_token,
      },
      data: {
        description: {
          phydesc: {
            height: value.height,
            weight: value.weight,
            eyecolor: value.eyecolor,
            haircolor: value.haircolor,
            style: value.style,
          },
          tastes: {
            sports: ['Football', 'Tennis'],
            musique: ['Dragonforce'],
          },
        },
      },
    }).then(async () => {
      await dispatch({ type: 'GET_PROFILE' });
      console.log('\n\n\n____Edit profile', patchProfile);
    });
  }
  /* Here the user can edit his profile by
  adding/deleting/updating his informations
  */

  const heightOnChange = (val) => {
    setDescription({
      ...descriptionData,
      height: val,
    });
  };
  const weightOnChange = (val) => {
    setDescription({
      ...descriptionData,
      weight: val,
    });
  };
  const eyecolorOnChange = (val) => {
    setDescription({
      ...descriptionData,
      eyecolor: val,
    });
  };
  const haircolorOnChange = (val) => {
    setDescription({
      ...descriptionData,
      haircolor: val,
    });
  };
  const styleOnChange = (val) => {
    setDescription({
      ...descriptionData,
      style: val,
    });
  };
  const sportsOnChange = (val) => {
    setDescription({
      ...descriptionData,
      sports: val,
    });
  };
  const musiqueOnChange = (val) => {
    setDescription({
      ...descriptionData,
      musique: val,
    });
  };
  const moviesOnChange = (val) => {
    setDescription({
      ...descriptionData,
      movies: val,
    });
  };

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        setPhoto({ photo: response });
        var data = new FormData();
        data.append('my_photo', {
          uri: response.uri, // your file path string
          name: response.fileName,
          type: response.type,
        });
        console.log('\n\n\nPIC: ', response);
        deviceStorage.loadJWT().then((user_token) => {
          axios({
            method: 'POST',
            url: 'http://10.0.2.2:3000/users/me/avatar',
            headers: {
              Authorization: 'Bearer ' + user_token,
            },
            data: {
              avatars: response,
            },
          }).catch(function (error) {
            if (error.response) {
              // Request made and server responded
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
          });
        });
      }
    });
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Photo de profil</Text>
        <View style={styles.divider} />
        <Button title="Choisir une photo" onPress={handleChoosePhoto} />
      </View>
      <EditSection
        sectionTitle="Physique"
        data={descriptionData}
        heightOnChange={(val) => heightOnChange(val)}
        weightOnChange={(val) => weightOnChange(val)}
        eyecolorOnChange={(val) => eyecolorOnChange(val)}
        haircolorOnChange={(val) => haircolorOnChange(val)}
        styleOnChange={(val) => styleOnChange(val)}
      />
      <View>
        <TouchableOpacity
          style={styles.saveButtonStyle}
          onPress={() => {
            onPressSave({
              height: descriptionData.height,
              weight: descriptionData.weight,
              eyecolor: descriptionData.eyecolor,
              haircolor: descriptionData.haircolor,
              style: descriptionData.style,
            });
          }}>
          <Text style={styles.title}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
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
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginHorizontal: 10,
    marginTop: 5,
  },
  content: {
    backgroundColor: 'white',
    borderBottomStartRadius: 10,
    marginHorizontal: 20,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divider: {
    marginBottom: 10,
    marginTop: 5,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 10,
  },
  contentText: {
    marginTop: 3,
    marginLeft: 15,
    fontWeight: 'bold',
    fontSize: 17,
  },
  saveButtonStyle: {
    left: 140,
    right: 140,
    zIndex: 9,
    height: 50,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fbe7c2',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
});

export default EditProfile;
