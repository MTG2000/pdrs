import React from "react";
import PrescriptionCard from "./PrescriptionCard";
import { observer } from "mobx-react";

const PrescriptionsList = ({ store }) => {
  if (store.loadingPrescriptions) return <h2>Loading Prescriptions</h2>;
  return (
    <div>
      {store.prescriptions.map((p, i) => (
        <PrescriptionCard key={i} prescription={p} store={store} />
      ))}
    </div>
  );
};

export default observer(PrescriptionsList);
