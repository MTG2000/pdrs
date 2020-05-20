import React from "react";
import { useEffect } from "react";
import ClassificationCard from "./ClassificationCard";
import { observer } from "mobx-react";

const ClassificationsSection = ({ store }) => {
  useEffect(() => {
    store.FetchClassifications();
  }, []);

  return (
    <div
      className=" col-12 col-md-6"
      style={{ height: "100%", overflowY: "auto" }}
    >
      {store.classifications.map((c, i) => (
        <ClassificationCard
          key={i}
          data={c}
          onClick={() => store.SelectClassification(i)}
          isSelected={store.selectedClassificationIndex === i}
        />
      ))}
    </div>
  );
};

export default observer(ClassificationsSection);
