import React from "react";
import PrescriptionCard from "./PrescriptionCard";
import { observer } from "mobx-react";
import LoadingPage from "../../Shared/LoadingPage";

const PrescriptionsList = ({ store }) => {
  if (store.loadingPrescriptions)
    return <LoadingPage message="Getting Prescriptions To Dispense" />;

  return (
    <div>
      {store.prescriptions.map((p, i) => (
        <PrescriptionCard key={i} prescription={p} store={store} />
      ))}
    </div>
  );
};

export default observer(PrescriptionsList);
