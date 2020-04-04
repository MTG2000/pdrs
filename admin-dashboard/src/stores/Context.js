import React from "react";
import AppState from "./AppState";
import DashboardStore from "./DashboardStore";
import ManageUsersStore from "./ManageUsersStore";
import ManageMedicinsStore from "./ManageMedicinsStore";

export const mainContext = React.createContext();

export const ContextProvider = props => {
  return (
    <mainContext.Provider
      value={{
        AppState,
        DashboardStore,
        ManageUsersStore,
        ManageMedicinsStore
      }}
    >
      {props.children}
    </mainContext.Provider>
  );
};
