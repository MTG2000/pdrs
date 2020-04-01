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

const UserCard = ({ user, onRead }) => {
  const classes = useStyle();
  console.log(toJS(user));
  return (
    <div
      className={`${classes.card} col-12 mb-2 py-3 row mx-0 justify-content-between`}
    >
      <div>
        <div>
          <span className="text-info ">{user.Username}</span>
          <span className="text-dark mx-4">
            {user.DoctorName && `Doctor ${user.DoctorName}`}
            {user.PharmacyName && `Pharmacy ${user.PharmacyName}`}
          </span>
        </div>
      </div>
      <Clear
        className={`${classes.removeIcon} align-self-center`}
        onClick={onRead}
      />
    </div>
  );
};

export default UserCard;
