import React, { createContext, useReducer } from 'react';
import CollageReducer from './CollageReducer';

// Initial global state
const initialState = {
  layout: 1, 
  photos: []
};

// Create context with the initial state
export const CollageContext = createContext(initialState);

/**
 * Context provider
 * @param {React.Component} param0 Components inside the context provider
 */
export const CollageContextProvider = ({ children }) => {
  // Set reducer
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

