// store.js
import React, { createContext, useReducer } from 'react';

const initialState = {
  email: '', // Store `email` when user enters their email
  password: '', // Store `password` when user enters their password
  errors: {}, // Store error data from the backend here
  isAuthorized: false, // If auth is successful, set this to `true`
  isLoading: false, // Set this to `true` if You want to show spinner
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'login':
        return { isAuthorized: true }; // do something with the action
      case 'logout':
        return { isAuthorized: false }; // do something with the action
      default:
        throw new Error();
    }
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
