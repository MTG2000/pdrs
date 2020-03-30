import React, { useEffect } from "react";
import styles from "./style/overlay.module.scss";
import BgImage from "./pdrs-bg.jpg";

const Overlay = () => {
  //Makes image loading async
  useEffect(() => {
    const image = document.querySelector("img[lazysrc]");
    image.setAttribute("src", image.getAttribute("lazysrc"));
  }, []);

  return (
    <div className={styles.overlay}>
      <img lazysrc={BgImage} alt="" className="overlay-image" />
    </div>
  );
};

export default Overlay;
