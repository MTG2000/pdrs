import React from "react";
import MedicinSelect from "./MedicinSelect";
import MedicinsList from "./MedicinsList";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  root: {
    maxWidth: 500,
    backgroundColor: "#fff",
    boxShadow: "3px 4px 10px #999"
  }
});

const MedicinsPaper = ({ store }) => {
  const classes = useStyle();

  return (
    <div className={`${classes.root} row mx-auto mb-5 px-3`}>
      <MedicinSelect store={store} />
      <MedicinsList store={store} />
    </div>
  );
};

export default MedicinsPaper;
