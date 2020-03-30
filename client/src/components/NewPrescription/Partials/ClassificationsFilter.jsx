import React from "react";
import { observer } from "mobx-react";

const ClassificationsFilter = ({ store }) => {
  return (
    <div className="row justify-content-center">
      {store.classifications.map(c => (
        <div
          key={c.Id}
          data-id={c.Id}
          className={`classification-icon  mx-4 my-2 ${
            store.selectedClassification === c.Id ? "selected" : ""
          }`}
          onClick={() => store.SelectClassification(c.Id)}
        >
          <img src={c.ImageUrl} alt={c.Name} />
        </div>
      ))}
    </div>
  );
};

export default observer(ClassificationsFilter);
