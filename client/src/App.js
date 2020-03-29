import React from "react";
import Header from "./components/layouts/Partials/Header";
import Footer from "./components/layouts/Partials/Footer";
import { Route, Switch } from "react-router-dom";

import { Container } from "react-bootstrap";
// import Home from "./components/layouts/Home";
import PatientsPrescriptions from "./components/layouts/PatinetsPrescriptions";
import NewPrescription from "./components/layouts/NewPrescription";
// import Overlay from "./components/layouts/Partials/Overlay";

function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <Switch>
          <Route
            path="/patients-prescriptions"
            component={PatientsPrescriptions}
          />
          <Route path="/" component={NewPrescription} />
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
