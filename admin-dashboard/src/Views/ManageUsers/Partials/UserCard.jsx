import React from "react";
import { makeStyles } from "@material-ui/core";
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
import ActionBtn from "../../Shared/ActionBtn";
import LoadingMini from "../../Shared/LoadingMini";

const useStyle = makeStyles({
  card: {
    backgroundColor: "#FFF",
    boxShadow: "3px 5px 10px #939393",
    borderRadius: 5,
  },
  activeIcon: {
    color: "green",
    cursor: "pointer",
  },
  deactiveIcon: {
    color: "red",
    cursor: "pointer",
  },
});

const UserCard = ({ user, onToggleActive }) => {
  const classes = useStyle();
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
      <ActionBtn loading={user.loadingToggleActive}>
        <button className="btn-none">
          <span className="content">
            {user.IsActive ? (
              <Check
                className={`${classes.activeIcon} align-self-center`}
                onClick={onToggleActive}
              />
            ) : (
              <Clear
                className={`${classes.deactiveIcon} align-self-center`}
                onClick={onToggleActive}
              />
            )}
          </span>
          <div className="loading">
            <LoadingMini color={"#FFF"} />
          </div>
        </button>
      </ActionBtn>
    </div>
  );
};

export default UserCard;
