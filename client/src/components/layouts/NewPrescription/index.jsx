import React, { useState, useEffect } from "react";
import PatientIdInput from "./Partials/patientIdInput";
import { Box } from "@material-ui/core";
import "./style/style.scss";
import ClassificationsFilter from "./Partials/ClassificationsFilter";
import PrescriptionNote from "./Partials/PrescriptionNote";
import MedicinSelect from "./Partials/MedicinSelect";
import MedicinsList from "./Partials/MedicinsList";

const NewPrescription = () => {
  const [patientId, setPatientId] = useState("");
  const [selectedClassification, setSelectedClassification] = useState();
  const [medicins, setMedicins] = useState([
    { value: 4, label: "Shfazien-Forte" },
    { value: 5, label: "Benzamien" },
    { value: 1, label: "Sitamol" }
  ]);

  const [classifications, setClassifications] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/medicins/classifications");
      const data = await res.json();
      setClassifications(data);
    })();
  }, []);
  console.log(medicins);
  return (
    <Box pb={8}>
      <Box py={5} display="flex">
        <PatientIdInput patientId={patientId} setPatientId={setPatientId} />
      </Box>
      <ClassificationsFilter
        classifications={classifications}
        selectedClassification={selectedClassification}
        setSelectedClassification={id => setSelectedClassification(id)}
      />
      <PrescriptionNote />
      <div className="row">
        <MedicinSelect
          handleSelect={medicine => setMedicins([medicine, ...medicins])}
        />
        <MedicinsList medicins={medicins} />
      </div>
    </Box>
  );
};

export default NewPrescription;
