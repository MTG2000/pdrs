import React, { useContext, useState } from "react";
import HeroImage from "./Partials/HeroImage";
import BG from "./Partials/pdrs-bg.jpg";
import { mainContext } from "../../stores/Context";
import { observer } from "mobx-react";
import { Container } from "@material-ui/core";
import RequestAccount from "./Partials/RequestAccount";
import { useTranslation } from "react-i18next";
import About from "./Partials/About";
import Footer from "../Shared/Footer";

const Home = () => {
  const { AppStore } = useContext(mainContext);
  const [store] = useState(AppStore);
  const { t } = useTranslation("home");

  return (
    <div>
      <HeroImage imgSrc={BG} />
      <div
        style={{ height: "90vh" }}
        className="row align-content-center justify-content-center"
      >
        <h2 className="h1 text-white text-center">{t("welcome to pdr")} </h2>
        {!store.username && (
          <p className="text-white col-12 text-center mt-4">
            {t("login to start")}
          </p>
        )}
        {store.doctorName && (
          <p className="text-white col-12 text-center mt-4">
            Welcome Doctor {store.doctorName}
          </p>
        )}
      </div>
      {!store.username && (
        <Container>
          <About />
          <RequestAccount store={store} />
        </Container>
      )}

      {!store.username && <Footer />}
    </div>
  );
};

export default observer(Home);
