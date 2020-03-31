import React, { useContext, useState } from "react";
import Header from "./components/Shared/Header";
import Footer from "./components/Shared/Footer";
import { Route, Switch } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import { Container } from "react-bootstrap";
import Home from "./components/Home";
import PatientsPrescriptions from "./components/PatinetsPrescriptions";
import NewPrescription from "./components/NewPrescription";
import LoginPage from "./components/Login";
import PrivateRoute from "./components/Shared/PrivateRoute";
import { mainContext } from "./stores/Context";
// import Overlay from "./components/Shared/Overlay";

function App() {
  const { AppStore } = useContext(mainContext);
  const [store] = useState(AppStore);
  const { username, role } = store;

  return (
    <div className="App">
      <NotificationContainer />
      <Header store={store} />
      <Container>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <PrivateRoute
            path="/new-prescription"
            component={NewPrescription}
            isAuth={role === "Doctor"}
          />
          <PrivateRoute
            path="/patients-prescriptions"
            component={PatientsPrescriptions}
            isAuth={username}
          />
          <Route path="/" component={Home} />
        </Switch>
      </Container>
      <Footer />
      {/* <Overlay /> */}
    </div>
  );
}

export default App;
