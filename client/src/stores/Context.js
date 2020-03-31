import React from "react";

import NewPrescriptionStore from "./NewPrescriptionStore";
import PatientPrescriptionsStore from "./PatientPrescriptionsStore";
import AppStore from "./AppStore";

export const mainContext = React.createContext();

export const ContextProvider = props => {
  return (
    <mainContext.Provider
      value={{ NewPrescriptionStore, PatientPrescriptionsStore, AppStore }}
    >
      {props.children}
    </mainContext.Provider>
  );
};
