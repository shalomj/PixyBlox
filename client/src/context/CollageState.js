import React, { createContext, useReducer } from 'react';
import CollageReducer from './CollageReducer';

const initialState = {
  layout: 1, 
};

export const CollageContext = createContext(initialState);

export const CollageContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CollageReducer, initialState);

  return (
        <CollageContext.Provider value={{
            state, 
            dispatch
        }}>
            {children}
        </CollageContext.Provider>
    );
};

