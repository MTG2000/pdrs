import React, { useState, useEffect, useContext } from "react";
import { Box } from "@material-ui/core";
import PatientIdInput from "./Partials/PatientIdInput";
import "./style/style.scss";
import PrescriptionsList from "./Partials/PrescriptionsList";
import ClassificationsFilter from "../NewPrescription/Partials/ClassificationsFilter";
import { observer } from "mobx-react";
import { mainContext } from "../../stores/Context";
import { toJS } from "mobx";

const PatientsPrescriptions = () => {
  const { PatientPrescriptionsStore } = useContext(mainContext);

  const [store] = useState(new PatientPrescriptionsStore());

  useEffect(() => {
    store.FetchClassifications();
  }, [store]);

  if (store.loading) return <h2 className="py-5 px-5 text-center">Loading</h2>;
  console.log(toJS(store.prescriptions));

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
