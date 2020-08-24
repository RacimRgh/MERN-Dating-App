import React, { useContext } from 'react';
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
  // (async function () {
  //   const user_token = await deviceStorage.loadJWT();
  //   const patchProfile = await axios({
  //     method: 'PATCH',
  //     url: 'http://10.0.2.2:3000/users/add',
  //     headers: {
  //       Authorization: 'Bearer ' + user_token,
  //     },
  //     data: {
  //       description: {
  //         phydesc: {
  //           height: 250,
  //           weight: 70,
  //           eyecolor: 'brown',
  //         },
  //         tastes: {
  //           sports: ['Football', 'Tennis'],
  //           musique: ['Dragonforce'],
  //         },
  //       },
  //     },
  //   });
  // console.log('\n\n\n____Edit profile', patchProfile.data.description);
  // })();
  /* Here the user can edit his profile by
  adding/deleting/updating his informations
  */
  const { state } = useContext(store);

  let data = Object.keys(state)
    .map(function (key) {
      if (key !== 'themeAstral' && key !== 'description') {
        return { title: key, data: [state[key]] };
      }
    })
    .filter(function (element) {
      return element !== undefined;
    });

  console.log('\n\n\n Edit profile: ', state.description.tastes);
  let physique = [
    {
      title: 'Taille',
      data: [state.description.phydesc.height + 'cm'],
    },
    {
      title: 'Poids',
      data: [state.description.phydesc.weight + 'kg'],
    },
    {
      title: 'Couleur des yeux',
      data: [state.description.phydesc.eyecolor],
    },
    {
      title: 'Couleur des cheveux',
      data: [state.description.phydesc.haircolor],
    },
    {
      title: 'Style',
      data: [state.description.phydesc.style],
    },
  ];

  let gouts = [
    {
      title: 'Sports',
      data: state.description.tastes.sports,
    },
    {
      title: 'Musique',
      data: state.description.tastes.musique,
    },
    {
      title: 'Cinéma',
      data: state.description.tastes.movies,
    },
  ];
  return (
    <ScrollView style={styles.container}>
      <EditSection sectionTitle="Informations personnelles" data={data} />
      <EditSection sectionTitle="Physique" data={physique} />
      <EditSection sectionTitle="Passions et goûts" data={gouts} />
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
