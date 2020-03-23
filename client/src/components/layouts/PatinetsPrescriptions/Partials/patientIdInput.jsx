import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Box, makeStyles, useTheme } from "@material-ui/core";

const useStyle = makeStyles({
  input: theme => ({
    borderColor: `${theme.palette.primary.main} !important`
  })
});

const PatientIdInput = () => {
  const theme = useTheme();
  const classes = useStyle({ ...theme });

  const [patientId, setPatientId] = useState("");
  return (
    <Box mx="auto">
      <TextField
        id="patient-id"
        label="Patient Id"
        value={patientId}
        onChange={e => setPatientId(e.target.value)}
        variant="outlined"
        color="primary"
        className={classes.input}
      />
    </Box>
  );
};

export default PatientIdInput;
