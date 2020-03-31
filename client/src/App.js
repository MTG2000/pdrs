import React from "react";
import Header from "./components/Shared/Header";
import Footer from "./components/Shared/Footer";
import { Route, Switch } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import { Container } from "react-bootstrap";
import Home from "./components/Home";
import PatientsPrescriptions from "./components/PatinetsPrescriptions";
import NewPrescription from "./components/NewPrescription";
import LoginPage from "./components/Login";
// import Overlay from "./components/Shared/Overlay";

function App() {
  return (
    <div className="App">
      <NotificationContainer />
      <Header />
      <Container>
        <Switch>
          <Route
            path="/patients-prescriptions"
            component={PatientsPrescriptions}
          />
          <Route path="/login" component={LoginPage} />

          <Route path="/new-prescription" component={NewPrescription} />
          <Route path="/" component={PatientsPrescriptions} />
          {/* <Route path="/" component={Home} /> */}
        </Switch>
      </Container>
      <Footer />
      {/* <Overlay /> */}
    </div>
  );
}

export default App;
