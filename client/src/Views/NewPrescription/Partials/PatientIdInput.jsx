import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { observer } from "mobx-react";

const PatientIdInput = ({ store }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

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
        className=" mb-3"
      />
      {!store.showPatientNameInput && (
        <h2 className="my-2">{store.patientName}</h2>
      )}

      {store.showPatientNameInput && (
        <TextField
          id="patient-name"
          label="Patient Name"
          value={name}
          onChange={e => setName(e.target.value)}
          onBlur={() => store.SetPatientName(name)}
          variant="outlined"
          color="primary"
          className=" mb-3"
        />
      )}
    </div>
  );
};

export default observer(PatientIdInput);
