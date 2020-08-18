// store.js
import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import deviceStorage from '../services/deviceStorage';

const initialState = {
  email: '',
  firstname: '',
  lastname: '',
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(async (state, action) => {
    switch (action.type) {
      case 'GET_PROFILE':
        const user_token = await deviceStorage.loadJWT();
        // console.log('\n\n\n___________________', tok);
        const result = await axios({
          method: 'GET',
          url: 'http://10.0.2.2:3000/users/me',
          headers: {
            Authorization: 'Bearer ' + user_token,
          },
        });
        console.log('\n\n\n*************', result.data, '\n\n\n');
        return { result }; // do something with the action
      case 'SET_PROFILE':
        return { isAuthorized: false }; // do something with the action
      default:
        throw new Error();
    }
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
