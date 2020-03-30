import React, { useState } from "react";
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
  const [id, setId] = useState("");

  return (
    <div className=" mx-auto row flex-column" style={{ maxWidth: 330 }}>
      <TextField
        id="patient-id"
        label="Patient Id"
        type="number"
        value={id}
        onChange={e => setId(e.target.value)}
        onBlur={() => store.SetPatientId(id)}
        onKeyUp={e => e.keyCode === 13 && e.target.blur()} //if Enter was pressed
        variant="outlined"
        color="primary"
        className={`${classes.input} mb-3`}
        InputProps={{
          classes: {
            notchedOutline: classes.input
          }
        }}
      />
      {!store.showPatientNameInput && (
        <h2 className="my-2">{store.patientName}</h2>
      )}
    </div>
  );
};

export default observer(PatientIdInput);
