// store.js
import React, { createContext, useReducer, useState } from 'react';
import axios from 'axios';
import deviceStorage from './deviceStorage';

let initialState = {
  email: '',
  firstname: '',
  lastname: '',
  birthday: undefined,
  birthhour: '',
  country: '',
  city: '',
  gender: '',
  themeAstral: {},
  description: {},
  avatar: [],
};

// (async function () {
//   const user_token = await deviceStorage.loadJWT();
//   const result = await axios({
//     method: 'GET',
//     url: 'http://10.0.2.2:3000/users/me',
//     headers: {
//       Authorization: 'Bearer ' + user_token,
//     },
//   });
//   console.log('\n\n\n Store: ', result.data.description);
//   initialState = {
//     email: result.data.email,
//     firstname: result.data.prenom,
//     lastname: result.data.nom,
//     birthday: result.data.birthdaydate,
//     birthhour: result.data.birthHour,
//     country: result.data.countryName,
//     city: result.data.cityName,
//     themeAstral: result.data.themeastral,
//     description: result.data.description,
//   };
// })();

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'GET_PROFILE':
        const result = deviceStorage.loadJWT().then((user_token) => {
          axios({
            method: 'GET',
            url: 'http://10.0.2.2:3000/users/me',
            headers: {
              Authorization: 'Bearer ' + user_token,
            },
          }).then((result) => {
            // console.log('\n\nSTATE: ', result.data);
            // return {
            initialState.email = result.data.email;
            initialState.firstname = result.data.prenom;
            initialState.lastname = result.data.nom;
            initialState.birthday = result.data.birthdaydate;
            initialState.birthhour = result.data.birthHour;
            initialState.country = result.data.countryName;
            initialState.city = result.data.cityName;
            initialState.description = result.data.description;
            initialState.themeAstral = result.data.themeastral;
            initialState.avatar = result.data.avatars;
            initialState.gender = result.data.Gender;
            // };
          });
          // console.log('\n\nSTATE: ', initialState);
        });
        return { initialState };
      case 'SET_PROFILE':
        return {
          isLoading: false,
          description: action.data,
        };
      default:
        throw new Error();
    }
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
