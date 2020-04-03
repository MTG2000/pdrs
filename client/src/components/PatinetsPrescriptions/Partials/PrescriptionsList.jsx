import React from "react";
import PrescriptionCard from "./PrescriptionCard";
import { observer } from "mobx-react";
import ChronicMedicins from "./ChronicMedicins";

const PrescriptionsList = ({ store }) => {
  if (store.loadingPrescriptions) return <h2>Loading Prescriptions</h2>;

  return (
    <div>
      {store.chronicMedicins.length > 0 && (
        <ChronicMedicins medicins={store.chronicMedicins} />
      )}
      {store.prescriptions.map((p, i) => (
        <PrescriptionCard key={i} prescription={p} />
      ))}
    </div>
  );
};

export default observer(PrescriptionsList);
