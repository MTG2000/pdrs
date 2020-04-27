import React from "react";
import { makeStyles, Checkbox } from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";

const useStyle = makeStyles({
  root: () => ({
    background: "#FFF",
    borderBottom: "1px solid #999",
    borderWidth: "1px !important"
  }),
  icon: {
    cursor: "pointer"
  }
});

const MedicineCard = ({
  name,
  id,
  onRemove,
  onToggleBold,
  onToggleChronic
}) => {
  const classes = useStyle();

  return (
    <div className="mb-">
      <div
        className={`${classes.root} mx-auto px-2 py-2 row justify-content-between `}
      >
        <h5 className="mb-0 align-self-center">{name}</h5>
        <div className="col-12 ml-auto  col-sm-auto row justify-content-end align-items-center">
          <Checkbox
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
            onChange={onToggleChronic}
          />
          <Checkbox
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
            onChange={onToggleBold}
          />
          <Delete
            onClick={onRemove}
            style={{ color: "#b90404" }}
            className={classes.icon}
          />
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;
