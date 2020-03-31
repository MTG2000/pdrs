import React, { useContext, useState } from "react";
import PatientIdInput from "../PatinetsPrescriptions/Partials/PatientIdInput";
import { mainContext } from "../../stores/Context";
import PrescriptionsList from "./Partials/PrescriptionsList";

const DispensePrescription = () => {
  const { PrescriptionsDispensingStore } = useContext(mainContext);
  const [store] = useState(new PrescriptionsDispensingStore());

  return (
    <div className="py-5">
      <div style={{ maxWidth: 230 }} className="mx-auto">
        <PatientIdInput store={store} />
      </div>
      <PrescriptionsList store={store} />
    </div>
  );
};

export default DispensePrescription;
