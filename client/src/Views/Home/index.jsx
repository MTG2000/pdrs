import React, { useContext, useState } from "react";
import LoadingPage from "../Shared/LoadingPage";
import HeroImage from "./Partials/HeroImage";
import BG from "./Partials/pdrs-bg.jpg";
import { mainContext } from "../../stores/Context";

const Home = () => {
  const { AppStore } = useContext(mainContext);
  const [store] = useState(AppStore);

  return (
    <div>
      <HeroImage imgSrc={BG} />
      <div
        style={{ height: "90vh" }}
        className="row align-content-center justify-content-center"
      >
        <h2 className="h1 text-white text-center">Welcome To PDR System </h2>
        <p className="text-white col-12 text-center mt-4">
          login with your account and start using the system now
        </p>
      </div>
    </div>
  );
};

export default Home;
