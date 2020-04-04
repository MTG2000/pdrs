import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "../Views/Shared/PrivateRoute";
import { observer } from "mobx-react";
import LoadingPage from "../Views/Shared/LoadingPage";

const PatientsPrescriptions = React.lazy(() =>
  import("../Views/PatinetsPrescriptions")
);
const NewPrescription = React.lazy(() => import("../Views/NewPrescription"));
const LoginPage = React.lazy(() => import("../Views/Login"));
const Home = React.lazy(() => import("../Views/Home"));

const DispensePrescription = React.lazy(() =>
  import("../Views/PrescriptionsDispensing")
);
const Contact = React.lazy(() => import("../Views/Contact"));

const AppRouter = ({ store }) => {
  const { username, role } = store;

  return (
    <React.Suspense fallback={<LoadingPage fullPage={true} />}>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/contact" component={Contact} isAuth={username} />
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
    </React.Suspense>
  );
};

export default observer(AppRouter);
