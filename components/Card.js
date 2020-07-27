import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import TextInput from 'react-native-improved-text-input';
import styles from './Card.style';

const Card = (props) => {
  const { nameIcon, title, textInputValue, placeholder, onChangeText } = props;
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
            value={textInputValue}
            placeholder={placeholder}
            placeholderTextColor="#ccc"
            selectionColor="#757575"
            onChangeText={onChangeText}
            style={styles.textInputStyle}
            {...props}
          />
        </View>
      </View>
    </View>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  textColor: PropTypes.string,
  titleColor: PropTypes.string,
  placeholder: PropTypes.string,
  selectionColor: PropTypes.string,
};

Card.defaultProps = {
  title: 'User Name',
  textColor: 'black',
  titleColor: '#c7c5c6',
  placeholder: 'John Doe',
  selectionColor: '#757575',
};

export default Card;
