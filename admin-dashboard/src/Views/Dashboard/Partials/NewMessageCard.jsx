import React from "react";
import { makeStyles } from "@material-ui/core";
import Clear from "@material-ui/icons/Clear";

const useStyle = makeStyles({
  card: {
    backgroundColor: "#FFF",
    boxShadow: "3px 5px 10px #9b9b9b",
    maxWidth: 700
  },
  removeIcon: {
    color: "red",
    cursor: "pointer"
  }
});

const NewMessageCard = ({ message, onRead }) => {
  const classes = useStyle();

  return (
    <div className="col-12">
      <div
        className={`${classes.card}  px-3 mb-4 py-3 row mx-0 justify-content-between`}
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
    </div>
  );
};

export default NewMessageCard;
