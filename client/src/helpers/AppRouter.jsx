import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import PatientsPrescriptions from "../components/PatinetsPrescriptions";
import NewPrescription from "../components/NewPrescription";
import LoginPage from "../components/Login";
import PrivateRoute from "../components/Shared/PrivateRoute";
import { observer } from "mobx-react";
import DispensePrescription from "../components/PrescriptionsDispensing";

const AppRouter = ({ store }) => {
  const { username, role } = store;

  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <PrivateRoute
        path="/new-prescription"
        component={NewPrescription}
        isAuth={role === "Doctor"}
      />
      <PrivateRoute
        path="/dispense-prescription"
        component={DispensePrescription}
        isAuth={role === "Pharmacy"}
      />
      <PrivateRoute
        path="/patients-prescriptions"
        component={PatientsPrescriptions}
        isAuth={username}
      />
      <Route path="/" component={Home} />
    </Switch>
  );
};

export default observer(AppRouter);
