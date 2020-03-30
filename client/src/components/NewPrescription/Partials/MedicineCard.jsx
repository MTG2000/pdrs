import React from "react";
import { makeStyles, Checkbox } from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";

const useStyle = makeStyles({
  root: () => ({
    background: "#FFF",
    boxShadow: "3px 3px 10px #333",
    borderRadius: 12,
    borderWidth: "2px !important"
  }),
  icon: {
    cursor: "pointer"
  }
});

const MedicineCard = ({ name, id }) => {
  const classes = useStyle();

  return (
    <div className="col-12 mb-2 mx-2">
      <div
        className={`${classes.root} mx-auto px-2 py-2 row justify-content-between border border-primary `}
      >
        <h4 className="mb-0 align-self-center">{name}</h4>
        <div className="col-12 ml-auto col-sm-auto row justify-content-end align-items-center">
          <Checkbox
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
          <Checkbox
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
          <Delete style={{ color: "#b90404" }} className={classes.icon} />
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;
