import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import TextInput from 'react-native-improved-text-input';
import styles from './Card.style';

/* Component for individual cards that can be used 
  in the login screen where the user can write 
  depending on the card's field
*/
const Card = (props) => {
  const { nameIcon, title, placeholder, onChangeText } = props;
  return (
    <View style={styles.container}>
      <View style={styles.containerGlue}>
        <View style={{ width: 35, justifyContent: 'center' }}>
          <Icon
            size={25}
            name={nameIcon}
            color="black"
            type="SimpleLineIcons"
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>{title}</Text>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor="#ccc"
            selectionColor="#757575"
            onChangeText={onChangeText}
            style={styles.textInputStyle}
            {...props}
          />
        </View>
        <View style={{ width: 35, justifyContent: 'center', marginRight: 20 }}>
          <Icon size={25} name="eye" color="black" type="SimpleLineIcons" />
        </View>
      </View>
    </View>
  );
};

export default Card;
