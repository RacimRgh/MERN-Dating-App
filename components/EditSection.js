import React, { useContext } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import EditCard from './EditCard';

const EditSection = (props) => {
  const {
    data,
    heightOnChange,
    weightOnChange,
    eyecolorOnChange,
    haircolorOnChange,
    styleOnChange,
  } = props;
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Physique</Text>
      <View style={styles.divider} />
      <EditCard
        title="Ma bio (0/250)"
        onChangeDescription={heightOnChange}
        num={false}
      />
      <EditCard
        title="Taille en CM"
        data={data.height}
        onChangeDescription={heightOnChange}
        num={true}
      />
      <EditCard
        title="Poids en KG"
        data={data.weight}
        onChangeDescription={weightOnChange}
        num={true}
      />
      <EditCard
        title="Couleur des yeux"
        data={data.eyecolor}
        onChangeDescription={eyecolorOnChange}
        dropdown={true}
      />
      <EditCard
        title="Couleurs des cheveux"
        data={data.haircolor}
        onChangeDescription={haircolorOnChange}
        dropdown={true}
      />
      <EditCard
        title="Style"
        data={data.style}
        onChangeDescription={styleOnChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginHorizontal: 15,
    marginTop: 5,
  },
  content: {
    backgroundColor: 'white',
    borderBottomStartRadius: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    zIndex: 9,
    height: 45,
    width: 100,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fbe7c2',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 10,
  },
});

export default EditSection;
