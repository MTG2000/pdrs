import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "../components/Shared/PrivateRoute";
import { observer } from "mobx-react";
import LoadingPage from "../components/Shared/LoadingPage";

const PatientsPrescriptions = React.lazy(() =>
  import("../components/PatinetsPrescriptions")
);
const NewPrescription = React.lazy(() =>
  import("../components/NewPrescription")
);
const LoginPage = React.lazy(() => import("../components/Login"));
const Home = React.lazy(() => import("../components/Home"));

const DispensePrescription = React.lazy(() =>
  import("../components/PrescriptionsDispensing")
);

const AppRouter = ({ store }) => {
  const { username, role } = store;

  return (
    <React.Suspense fallback={<LoadingPage fullPage={true} />}>
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
    </React.Suspense>
  );
};

export default observer(AppRouter);
