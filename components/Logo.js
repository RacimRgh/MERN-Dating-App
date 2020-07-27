import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';

const Logo = (props) => {
  const { logoText, logoComponent } = props;
  return (
    <View style={styles.container}>
      {logoComponent || (
        <View style={styles.row}>
          <Text style={styles.textStyle}>{logoText}</Text>
          <View style={styles.iconStyle}>
            <Icon size={30} color="white" type="AntDesign" />
          </View>
        </View>
      )}
    </View>
  );
};

Logo.propTypes = {
  logoText: PropTypes.string,
};

Logo.defaultProps = {
  logoText: 'Dating App',
};
const styles = StyleSheet.create({
  container: {
    marginTop: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 30,
    color: 'white',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconStyle: { marginLeft: 12 },
});

export default Logo;
