import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';

const SettingsCard = (props) => {
  const {
    title,
    iconName,
    iconType,
    data,
    edit,
    onChangeText,
    onPressSubmit,
  } = props;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={styles.cards}>
        {edit ? (
          <>
            <View style={{ justifyContent: 'center' }}>
              <Icon name={iconName} size={25} type={iconType} />
              <Text style={styles.editCard}>{title}</Text>
            </View>
            <TextInput
              defaultValue={data}
              placeholder={title}
              style={styles.inputStyle}
              onChangeText={onChangeText}
            />
          </>
        ) : (
          <>
            <Icon name={iconName} size={25} type={iconType} />
            <Text style={styles.cardText}>{title}</Text>
          </>
        )}
      </View>
      {edit ? (
        <TouchableOpacity onPress={onPressSubmit}>
          <View style={styles.editButton}>
            <Icon name="send" size={30} type="MaterialCommunityIcons" />
          </View>
        </TouchableOpacity>
      ) : undefined}
    </View>
  );
};

const styles = StyleSheet.create({
  cards: {
    padding: 10,
    width: '80%',
    backgroundColor: '#F9E7E7',
    marginHorizontal: 10,
    marginVertical: 5,
    flexDirection: 'row',
  },
  cardText: {
    fontSize: 20,
    marginRight: 5,
  },
  editCard: {
    fontSize: 20,
    marginRight: 5,
    width: 70,
  },
  inputStyle: {
    fontFamily: 'monospace',
    fontSize: 18,
    backgroundColor: 'white',
    borderRadius: 50,
    width: '75%',
    marginLeft: 5,
    paddingLeft: 15,
  },
  editButton: {
    borderRadius: 200,
    backgroundColor: '#F9E7E7',
    padding: 10,
  },
});

export default SettingsCard;
