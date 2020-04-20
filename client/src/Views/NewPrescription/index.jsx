import React, { useContext, useState, useEffect } from "react";
import PatientIdInput from "./Partials/PatientIdInput";
import { Box } from "@material-ui/core";
import PrescriptionNote from "./Partials/PrescriptionNote";
import MedicinSelect from "./Partials/MedicinSelect";
import MedicinsList from "./Partials/MedicinsList";
import { Button } from "@material-ui/core";
import { mainContext } from "../../stores/Context";
import { observer } from "mobx-react";
import { Redirect } from "react-router-dom";
import ActionBtn from "../Shared/ActionBtn";
import LoadingMini from "../Shared/LoadingMini";
import ClassificationsFilter from "../Shared/ClassificationsFilter";
import LoadingPage from "../Shared/LoadingPage";
import MedicinsPaper from "./Partials/MedicinsPaper";

const NewPrescription = () => {
  const { NewPrescriptionStore } = useContext(mainContext);
  const [store] = useState(new NewPrescriptionStore());

  useEffect(() => {
    store.FetchClassifications();
  }, [store]);

  if (store.redirect) return <Redirect to="/" />;

  if (store.loading) return <LoadingPage />;

  return (
    <Box pb={8}>
      <Box pt={5} display="flex">
        <PatientIdInput store={store} />
      </Box>

      <ClassificationsFilter store={store} />
      <PrescriptionNote store={store} />
      <MedicinsPaper store={store} />
      <div className="row justify-content-center py-3">
        <ActionBtn loading={store.submitingPrescription}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => store.SubmitPrescription()}
          >
            <span className="content">Submit Prescription</span>
            <div className="loading">
              <LoadingMini color={"#FFF"} />
            </div>
          </Button>
        </ActionBtn>
      </div>
    </Box>
  );
};

export default observer(NewPrescription);
