import React from "react";
import "./theme.scss";
import "./App.scss";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./materialTheme";
import ScrollToTop from "./ScrollToTopController";
import { BrowserRouter } from "react-router-dom";
import "./aos";

const AppWrapper = props => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ScrollToTop>{props.children}</ScrollToTop>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default AppWrapper;
