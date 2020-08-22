import { AsyncStorage } from 'react-native';

const deviceStorage = {
  async saveItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log('\n\n\n***AsyncStorage Error: ' + error.message);
    }
  },
  async loadJWT() {
    try {
      const value = await AsyncStorage.getItem('id_token');
      //   console.log('\n\n\n.................', value);
      return value;
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },
  async removeItemValue(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (exception) {
      return false;
    }
  },
  logCurrentStorage() {
    AsyncStorage.getAllKeys().then((keyArray) => {
      AsyncStorage.multiGet(keyArray).then((keyValArray) => {
        let myStorage = {};
        for (let keyVal of keyValArray) {
          myStorage[keyVal[0]] = keyVal[1];
        }
        // console.log(
        //   '\n\n\n\n*************************CURRENT STORAGE: ',
        //   myStorage,
        // );
      });
    });
  },
};

export default deviceStorage;
