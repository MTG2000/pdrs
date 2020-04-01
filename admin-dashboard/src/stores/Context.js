import React from "react";
import AppState from "./AppState";
import DashboardStore from "./DashboardStore";
import ManageUsersStore from "./ManageUsersStore";

export const mainContext = React.createContext();

export const ContextProvider = props => {
  return (
    <mainContext.Provider
      value={{ AppState, DashboardStore, ManageUsersStore }}
    >
      {props.children}
    </mainContext.Provider>
  );
};
