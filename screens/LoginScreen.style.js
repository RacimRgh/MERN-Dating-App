import { StyleSheet } from 'react-native';
import {
  isAndroid,
  ScreenWidth,
  ScreenHeight,
  isIPhoneXFamily,
} from '@freakycoder/react-native-helpers';

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
    width: ScreenWidth,
    height: ScreenHeight,
  },
  spinnerStyle: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 'auto',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    bottom: isIPhoneXFamily() ? 24 : 12,
  },
  loginButtonStyle: {
    // left: 140,
    // right: 140,
    zIndex: 9,
    height: 50,
    width: 200,
    borderRadius: 20,
    backgroundColor: '#f4e2e8',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
    bottom: isAndroid ? 24 : isIPhoneXFamily() ? 24 : 12,
  },
  loginButtonTextStyle: {
    color: 'black',
    fontSize: 25,
    fontFamily: 'DancingScript-Bold',
  },
  imagebackgroundStyle: {
    flex: 1,
    zIndex: -1,
    width: ScreenWidth,
    height: ScreenHeight,
    ...StyleSheet.absoluteFillObject,
  },
  blackoverlay: {
    width: ScreenWidth,
    height: ScreenHeight,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  safeAreaViewStyle: {
    flex: 1,
  },
  loginContainer: {
    margin: 24,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
    margin: 20,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
});

export default styles;
