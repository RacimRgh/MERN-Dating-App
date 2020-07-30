// store.js
import React, { createContext, useReducer } from 'react';

const initialState = { signedIn: false };
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'login':
        return { signedIn: true }; // do something with the action
      case 'logout':
        return { signedIn: false }; // do something with the action
      default:
        throw new Error();
    }
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
