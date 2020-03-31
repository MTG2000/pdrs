import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./helpers/vendors";
import AppWrapper from "./helpers/AppWrapper";

ReactDOM.render(
  <AppWrapper>
    <App />
  </AppWrapper>,
  document.getElementById("root")
);
