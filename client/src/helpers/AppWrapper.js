import React from "react";
import "./theme.scss";
import "./App.scss";
import "./i18n";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./materialTheme";
import ScrollToTop from "./ScrollToTopController";
import { BrowserRouter } from "react-router-dom";
import "react-notifications/lib/notifications.css";
import { ContextProvider } from "../stores/Context";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import RTL from "./RTL";

const AppWrapper = props => {
  return (
    <BrowserRouter>
      <ContextProvider>
        <ThemeProvider theme={theme}>
          <RTL>
            <ScrollToTop>
              <GoogleReCaptchaProvider reCaptchaKey="6Lc05esUAAAAALzJgbFxf6KG-jY4EMjdY_Ifsxqt">
                {props.children}
              </GoogleReCaptchaProvider>
            </ScrollToTop>
          </RTL>
        </ThemeProvider>
      </ContextProvider>
    </BrowserRouter>
  );
};

export default AppWrapper;
