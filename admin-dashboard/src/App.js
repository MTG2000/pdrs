import React, { useContext, useState } from "react";
import Header from "./Views/Shared/Header";
import Footer from "./Views/Shared/Footer";
import { NotificationContainer } from "react-notifications";
import AppRouter from "./helpers/AppRouter";
import SideBar from "./Views/Shared/SideBar";
import { Container } from "@material-ui/core";
// import Overlay from "./components/Shared/Overlay";

function App() {
  return (
    <div className="App">
      <NotificationContainer />
      <Header />
      <SideBar />
      <div
        id="app-container"
        style={{
          marginLeft: "auto",
          width: "100%"
        }}
      >
        <AppRouter />
      </div>
      <Footer />
      {/* <Overlay /> */}
    </div>
  );
}

export default App;
