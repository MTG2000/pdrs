import React from "react";

import NewPrescriptionStore from "./NewPrescriptionStore";
import PatientPrescriptionsStore from "./PatientPrescriptionsStore";
import PrescriptionsDispensingStore from "./PrescriptionsDispensingStore";

import AppStore from "./AppStore";

export const mainContext = React.createContext();

export const ContextProvider = props => {
  return (
    <mainContext.Provider
      value={{
        NewPrescriptionStore,
        PatientPrescriptionsStore,
        AppStore,
        PrescriptionsDispensingStore
      }}
    >
      {props.children}
    </mainContext.Provider>
  );
};
