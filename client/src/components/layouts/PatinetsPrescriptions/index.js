import React, { useState } from "react";
import { Box } from "@material-ui/core";
import PatientIdInput from "./Partials/patientIdInput";
import "./style/style.scss";
import PrescriptionsList from "./Partials/PrescriptionsList";

const PatientsPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [loading, setLoading] = useState(false);

  const onPatientIdChange = async patinetId => {
    setLoading(true);
    const res = await fetch(
      `api/patients/prescriptions?patientId=${patinetId}`
    );
    const data = await res.json();
    setPrescriptions(data.prescriptions);
    setPatientName(data.prescriptions[0] && data.prescriptions[0].Patient_Name);
    setLoading(false);
  };

  return (
    <Box>
      <Box py={5} display="flex">
        <PatientIdInput
          handleSubmit={onPatientIdChange}
          patientName={patientName}
        />
      </Box>
      <PrescriptionsList prescriptions={prescriptions} loading={loading} />
    </Box>
  );
};

export default PatientsPrescriptions;
