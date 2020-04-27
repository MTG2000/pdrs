import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

const PatientIdInput = ({ store }) => {
  const [id, setId] = useState("");
  const { t } = useTranslation("common");

  return (
    <div className=" mx-auto row flex-column" style={{ maxWidth: 330 }}>
      <TextField
        id="patient-id"
        label={t("patient id")}
        type="number"
        value={id}
        onChange={e => setId(e.target.value)}
        onBlur={() => store.SetPatientId(id)}
        onKeyUp={e => e.keyCode === 13 && e.target.blur()} //if Enter was pressed
        variant="outlined"
        color="primary"
        className="mb-3"
      />
      {!store.showPatientNameInput && (
        <h2 className="my-2">{store.patientName}</h2>
      )}
    </div>
  );
};

export default observer(PatientIdInput);
