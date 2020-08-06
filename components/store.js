// store.js
import React, { createContext, useReducer } from 'react';
import axios from 'axios';

const initialState = {
  email: '',
  firstname: '',
  lastname: '',
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'GET_PROFILE':
        const result = axios.get('http://10.0.2.2:3000/users/me');
        console.log('\n\n\n*************', result, '\n\n\n');
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
