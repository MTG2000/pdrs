import React from "react";

const ClassificationsFilter = ({
  classifications = [],
  selectedClassification,
  setSelectedClassification
}) => {
  return (
    <div className="row justify-content-center">
      {classifications.map(c => (
        <div
          key={c.Id}
          data-id={c.Id}
          className={`classification-icon  mx-4 my-2 ${
            selectedClassification === c.Id ? "selected" : ""
          }`}
          onClick={() => setSelectedClassification(c.Id)}
        >
          <img src={c.ImageUrl} alt={c.Name} />
        </div>
      ))}
    </div>
  );
};

export default ClassificationsFilter;
