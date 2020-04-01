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

const NewMessageCard = ({ message, onRead }) => {
  const classes = useStyle();

  return (
    <div
      className={`${classes.card} col-12 mb-4 py-3 row mx-0 justify-content-between`}
    >
      <div>
        <div>
          <span className="text-info ">{message.Category}</span>
          <br />
          <span className="text-dark ">
            {message.DoctorName && `Doctor ${message.DoctorName}`}
            {message.PharmacyName && `Pharmacy ${message.PharmacyName}`}
          </span>
        </div>
        <h5>{message.Content}</h5>
      </div>
      <Clear
        className={`${classes.removeIcon} align-self-center`}
        onClick={onRead}
      />
    </div>
  );
};

export default NewMessageCard;