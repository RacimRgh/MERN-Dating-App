import { isAndroid } from '@freakycoder/react-native-helpers';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  textInputStyle: {
    fontSize: 14,
    fontWeight: '800',
    right: isAndroid ? 5 : 0,
    marginTop: isAndroid ? 0 : 3,
    height: isAndroid ? 35 : null,
  },
  textStyle: {
    fontSize: 15,
    fontWeight: '700',
  },
  container: {
    margin: 8,
    height: 75,
    width: '95%',
    marginTop: 0,
    borderRadius: 24,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  containerGlue: {
    marginLeft: 24,
    marginRight: 60,
    flexDirection: 'row',
  },
  textContainer: {
    width: '90%',
    marginLeft: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: isAndroid ? 10 : null,
  },
});

export default styles;
