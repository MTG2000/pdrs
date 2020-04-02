import React from "react";
import LoadingMini from "./LoadingMini";

const ActionBtn = props => {
  const classes = props.btnClasses || "btn-none action-btn";

  return (
    <button className={classes} disabled={props.loading || undefined}>
      {!props.loading && <div>{props.children}</div>}
      {props.loading && (
        <div>
          <LoadingMini />
        </div>
      )}
    </button>
  );
};

export default ActionBtn;
