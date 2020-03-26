import React, { useState, useEffect } from "react";
import PatientIdInput from "./Partials/patientIdInput";
import { Box } from "@material-ui/core";
import "./style/style.scss";
import ClassificationsFilter from "./Partials/ClassificationsFilter";
import PrescriptionNote from "./Partials/PrescriptionNote";

const NewPrescription = () => {
  const [patientId, setPatientId] = useState("");
  const [selectedClassification, setSelectedClassification] = useState();

  const [classifications, setClassifications] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/medicins/classifications");
      const data = await res.json();
      setClassifications(data);
    })();
  }, []);

  return (
    <Box>
      <Box py={5} display="flex">
        <PatientIdInput patientId={patientId} setPatientId={setPatientId} />
      </Box>
      <ClassificationsFilter
        classifications={classifications}
        selectedClassification={selectedClassification}
        setSelectedClassification={id => setSelectedClassification(id)}
      />
      <PrescriptionNote />
    </Box>
  );
};

export default NewPrescription;
