import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  root: (props) => ({
    width: "100%",
    height: "110vh",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -2,
    "&::before": {
      content: "''",
      position: "absolute",
      display: "block",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.33)",
      zIndex: 4,
    },
    clipPath: "polygon(0 0, 100% 1%, 100% 93%, 50% 100%, 0 93%)",
  }),
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

const HeroImage = ({ imgSrc }) => {
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <img className={classes.img} src={imgSrc} alt="Hero" />
    </div>
  );
};

export default HeroImage;
