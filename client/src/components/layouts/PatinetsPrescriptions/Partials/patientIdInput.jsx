import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles, useTheme, Button } from "@material-ui/core";
import { observer } from "mobx-react";

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
    <form
      className="mx-auto  row justify-content-between align-items-center"
      style={{ maxWidth: 320 }}
      onSubmit={e => {
        e.preventDefault();
        store.FetchPrescriptions();
      }}
    >
      <TextField
        type="number"
        id="patient-id"
        label="Patient Id"
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
      <div className="mx-2 my-2">
        <Button variant="contained" color="primary" type="submit">
          Search
        </Button>
      </div>

      <h4 className="col-12  my-2 px-1">{store.patientName}</h4>
    </form>
  );
};

export default observer(PatientIdInput);
