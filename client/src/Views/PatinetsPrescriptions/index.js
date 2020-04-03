import React, { useState, useEffect, useContext } from "react";
import { Box } from "@material-ui/core";
import PatientIdInput from "./Partials/PatientIdInput";
import "./style/style.scss";
import PrescriptionsList from "./Partials/PrescriptionsList";
import { observer } from "mobx-react";
import { mainContext } from "../../stores/Context";
import { toJS } from "mobx";
import LoadingPage from "../Shared/LoadingPage";
import ClassificationsFilter from "../Shared/ClassificationsFilter";

const PatientsPrescriptions = () => {
  const { PatientPrescriptionsStore } = useContext(mainContext);

  const [store] = useState(new PatientPrescriptionsStore());

  useEffect(() => {
    store.FetchClassifications();
  }, [store]);

  if (store.loading) return <LoadingPage />;

  return (
    <Box>
      <Box py={5} display="flex">
        <PatientIdInput store={store} />
      </Box>
      <ClassificationsFilter store={store} />
      <PrescriptionsList store={store} />
    </Box>
  );
};

export default observer(PatientsPrescriptions);
