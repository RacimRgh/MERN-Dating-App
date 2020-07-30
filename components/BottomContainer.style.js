import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const container = (backgroundColor, cardState) => {
  return {
    backgroundColor,
    borderRadius: 24,
    width: width * 0.9,
    alignSelf: 'center',
    position: 'absolute',
    bottom: cardState ? height * 0.25 : height * 0.14,
    height: cardState ? 300 : 550,
  };
};

export default {
  containerGlue: {
    marginTop: 12,
  },
  footerContainer: {
    flex: 1,
    margin: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  signupContainer: {
    marginLeft: 'auto',
  },
  signupTextStyle: {
    color: '#fdfdfd',
    fontWeight: '700',
  },
  signupButtonStyle: {
    padding: 20,
    minHeight: 40,
    borderRadius: 16,
    marginLeft: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
};
