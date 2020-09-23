import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import ModalDropdown from 'react-native-modal-dropdown';

const EditCard = (props) => {
  const { title, data, onChangeDescription, num, dropdown } = props;

  return (
    <View>
      <View style={styles.content}>
        <TextInput
          defaultValue={
            data !== undefined && data !== 0 && data !== ''
              ? data + ''
              : 'Non mentionné'
          }
          placeholder={title}
          style={styles.contentText}
          selectionColor="#757575"
          onChangeText={onChangeDescription}
          keyboardType={num ? 'numeric' : 'default'}
        />
        <Icon
          size={25}
          name="arrow-right"
          color="black"
          type="SimpleLineIcons"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginHorizontal: 15,
    marginTop: 5,
  },
  content: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 2,
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
    width: '50%',
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
  dropdown: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default EditCard;
