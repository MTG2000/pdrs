import React from "react";
import PrescriptionCard from "./PrescriptionCard";
import { observer } from "mobx-react";
import ChronicMedicins from "./ChronicMedicins";
import LoadingPage from "../../Shared/LoadingPage";

const PrescriptionsList = ({ store }) => {
  if (store.loadingPrescriptions)
    return <LoadingPage message="Getting Prescriptions" />;

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
