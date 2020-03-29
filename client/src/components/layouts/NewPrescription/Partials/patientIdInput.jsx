import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles, useTheme } from "@material-ui/core";

const useStyle = makeStyles({
  input: theme => ({
    borderColor: `${theme.palette.primary.main} !important`,
    borderWidth: 2
  })
});

const PatientIdInput = ({ store }) => {
  const theme = useTheme();
  const classes = useStyle({ ...theme });

  return (
    <div className="w-100 row justify-content-center">
      <TextField
        id="patient-id"
        label="Patient Id"
        type="number"
        value={store.patientId}
        onChange={e => store.SetPatientId(e.target.value)}
        variant="outlined"
        color="primary"
        className={classes.input}
        InputProps={{
          classes: {
            notchedOutline: classes.input
          }
        }}
      />
    </div>
  );
};

export default PatientIdInput;
