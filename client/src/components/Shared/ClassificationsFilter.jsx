import React from "react";
import { observer } from "mobx-react";
import { Tooltip } from "@material-ui/core";

const ClassificationsFilter = ({ store }) => {
  return (
    <div className="row justify-content-center">
      {store.classifications.map(c => (
        <Tooltip title={c.Name} key={c.Id} enterDelay={1000}>
          <div
            className={`classification-icon  mx-4 my-2 ${
              store.selectedClassification === c.Id ? "selected" : ""
            }`}
            onClick={() => store.SelectClassification(c.Id)}
          >
            <img src={c.ImageUrl} alt={c.Name} />
          </div>
        </Tooltip>
      ))}
    </div>
  );
};

export default observer(ClassificationsFilter);
