import React from "react";
import AppState from "./AppState";

export const mainContext = React.createContext();

export const ContextProvider = props => {
  return (
    <mainContext.Provider value={{ AppState }}>
      {props.children}
    </mainContext.Provider>
  );
};
