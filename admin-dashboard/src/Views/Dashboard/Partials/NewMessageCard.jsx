import React from "react";
import { makeStyles, Chip } from "@material-ui/core";
import Clear from "@material-ui/icons/Clear";
import { toJS } from "mobx";

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

const selectColor = msg => {
  console.log(msg);
  if (msg.toLowerCase().indexOf("problem") !== -1) return "#f44336";
  if (msg.toLowerCase().indexOf("add") !== -1) return "#3d5afe";
  if (msg.toLowerCase().indexOf("feature") !== -1) return "#43a047";
  return "#546e7a";
};

const NewMessageCard = ({ message, onRead }) => {
  const classes = useStyle();
  return (
    <div className="col-12">
      <div
        className={`${classes.card}  px-3 mb-4 py-3 row mx-0 justify-content-between`}
      >
        <div className="col-10">
          <div className="mb-2">
            <Chip
              size="small"
              style={{
                background: selectColor(message.Category),
                color: "#FFF"
              }}
              label={message.Category}
            />
          </div>
          <h5>{message.Content}</h5>
          <span className="text-dark ">
            {message.DoctorName && `Doctor ${message.DoctorName}`}
            {message.PharmacyName && `Pharmacy ${message.PharmacyName}`}
          </span>
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
