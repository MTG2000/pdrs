import React from "react";
import { makeStyles } from "@material-ui/core";
import { toJS } from "mobx";
import Clear from "@material-ui/icons/Clear";

const useStyle = makeStyles({
  card: {
    backgroundColor: "#FFF",
    boxShadow: "3px 5px 10px #333"
  },
  removeIcon: {
    color: "red",
    cursor: "pointer"
  }
});

const AccountRequestCard = ({ requset, onRead }) => {
  const classes = useStyle();

  return (
    <div
      className={`${classes.card} col-12 mb-4 py-3 row mx-0 justify-content-between`}
    >
      <div>
        <div>
          <span className="text-info ">{requset.Type}</span>
          <br />
          <span className="text-dark ">{requset.Name}</span>
        </div>
        <h5>{requset.Phone}</h5>
        <h5>{requset.Email}</h5>
      </div>
      <Clear
        className={`${classes.removeIcon} align-self-center`}
        onClick={onRead}
      />
    </div>
  );
};

export default AccountRequestCard;
