import React from "react";

import NewPrescriptionStore from "./NewPrescriptionStore";
import PatientPrescriptionsStore from "./PatientPrescriptionsStore";

export const mainContext = React.createContext();

export const ContextProvider = props => {
  return (
    <mainContext.Provider
      value={{ NewPrescriptionStore, PatientPrescriptionsStore }}
    >
      {props.children}
    </mainContext.Provider>
  );
};
