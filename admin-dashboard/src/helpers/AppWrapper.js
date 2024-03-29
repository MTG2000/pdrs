import React from "react";
import "./theme.scss";
import "./App.scss";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./materialTheme";
import ScrollToTop from "./ScrollToTopController";
import { BrowserRouter } from "react-router-dom";
import "react-notifications/lib/notifications.css";
import { ContextProvider } from "../stores/Context";

const AppWrapper = props => {
  return (
    <BrowserRouter>
      <ContextProvider>
        <ThemeProvider theme={theme}>
          <ScrollToTop>{props.children}</ScrollToTop>
        </ThemeProvider>
      </ContextProvider>
    </BrowserRouter>
  );
};

export default AppWrapper;
