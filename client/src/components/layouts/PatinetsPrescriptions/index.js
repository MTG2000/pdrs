import React from "react";
import { Box } from "@material-ui/core";
import PatientIdInput from "./Partials/patientIdInput";
import "./style/style.scss";
import PrescriptionsList from "./Partials/PrescriptionsList";

const PatientsPrescriptions = () => {
  return (
    <Box>
      <Box py={5} display="flex">
        <PatientIdInput />
      </Box>
      <PrescriptionsList />
    </Box>
  );
};

export default PatientsPrescriptions;
