// store.js
import React, { createContext, useReducer, useState } from 'react';
import axios from 'axios';
import deviceStorage from '../services/deviceStorage';

let initialState = {
  email: '',
  firstname: '',
  lastname: '',
  birthday: undefined,
  birthhour: '',
  country: '',
  city: '',
  themeAstral: {},
  description: {},
};

(async function () {
  const user_token = await deviceStorage.loadJWT();
  const result = await axios({
    method: 'GET',
    url: 'http://10.0.2.2:3000/users/me',
    headers: {
      Authorization: 'Bearer ' + user_token,
    },
  });
  console.log('\n\n\n Store: ', result.data.description);
  initialState = {
    email: result.data.email,
    firstname: result.data.prenom,
    lastname: result.data.nom,
    birthday: result.data.birthdaydate,
    birthhour: result.data.birthHour,
    country: result.data.countryName,
    city: result.data.cityName,
    themeAstral: result.data.themeastral,
    description: result.data.description,
  };
})();

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(async (state, action) => {
    switch (action.type) {
      case 'GET_PROFILE':
        const user_token = await deviceStorage.loadJWT();
        const result = await axios({
          method: 'GET',
          url: 'http://10.0.2.2:3000/users/me',
          headers: {
            Authorization: 'Bearer ' + user_token,
          },
        });
        console.log('\n\n\n*************', result.data, '\n\n\n');
        return {
          email: result.data.email,
          firstname: result.data.prenom,
          lastname: result.data.nom,
          birthday: result.data.birthdaydate,
          birthhour: result.data.birthHour,
          country: result.data.countryName,
          city: result.data.cityName,
        }; // do something with the action
      case 'SET_PROFILE':
        return { isAuthorized: false }; // do something with the action
      default:
        throw new Error();
    }
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
