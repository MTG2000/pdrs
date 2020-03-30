import React, { useContext, useState, useEffect } from "react";
import PatientIdInput from "./Partials/PatientIdInput";
import { Box } from "@material-ui/core";
import "./style/style.scss";
import ClassificationsFilter from "./Partials/ClassificationsFilter";
import PrescriptionNote from "./Partials/PrescriptionNote";
import MedicinSelect from "./Partials/MedicinSelect";
import MedicinsList from "./Partials/MedicinsList";
import { Button } from "@material-ui/core";
import { mainContext } from "../../stores/Context";
import { observer } from "mobx-react";

const NewPrescription = () => {
  const { NewPrescriptionStore } = useContext(mainContext);

  const [store] = useState(new NewPrescriptionStore());

  useEffect(() => {
    store.FetchClassifications();
  }, [store]);

  if (store.loading) return <h2 className="py-5 px-5 text-center">Loading</h2>;

  return (
    <Box pb={8}>
      <Box pt={5} display="flex">
        <PatientIdInput store={store} />
      </Box>

      <ClassificationsFilter store={store} />
      <PrescriptionNote store={store} />
      <div className="row">
        <MedicinSelect store={store} />
        <MedicinsList store={store} />
      </div>
      <div className="row justify-content-center py-3">
        <Button
          variant="contained"
          color="primary"
          onClick={() => NewPrescriptionStore.SubmitPrescription()}
        >
          Submit Prescription
        </Button>
      </div>
    </Box>
  );
};

export default observer(NewPrescription);
