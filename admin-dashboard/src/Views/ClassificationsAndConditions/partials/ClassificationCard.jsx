import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  root: () => ({
    borderBottom: "1px solid",
    cursor: "pointer",
    transition: "transform .5s ease-in-out",
  }),

  icon: {
    width: 50,
    height: 50,
    margin: "0 20px",
    borderRadius: "50%",
  },
});

const ClassificationCard = ({ onClick, data, isSelected }) => {
  const classes = useStyle();

  return (
    <div
      className={`py-3 px-2 row mx-0  ${classes.root} ${
        isSelected ? " bg-primary text-white" : ""
      }`}
      onClick={onClick}
    >
      <div className={classes.icon}>
        <img src={data.ImageUrl} alt={data.Name} />
      </div>
      <Typography variant="h6">{data.Name}</Typography>
    </div>
  );
};

export default ClassificationCard;
