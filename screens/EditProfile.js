import React, { useContext, useState } from 'react';
import {
  View,
  ScrollView,
  SectionList,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import axios from 'axios';
// local imports
import { store } from '../components/store';
import deviceStorage from '../services/deviceStorage';
import EditSection from '../components/EditSection';

const EditProfile = () => {
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
    });
    console.log('\n\n\n____Edit profile', patchProfile.data.description);
  }
  /* Here the user can edit his profile by
  adding/deleting/updating his informations
  */
  const { state } = useContext(store);

  const [descriptionData, setDescription] = useState({
    height: state.description.phydesc.height,
    weight: state.description.phydesc.weight,
    eyecolor: state.description.phydesc.eyecolor,
    haircolor: state.description.phydesc.haircolor,
    style: state.description.phydesc.style,
    sports: state.description.tastes.sports,
    musique: state.description.tastes.musique,
    movies: state.description.tastes.movies,
  });
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
