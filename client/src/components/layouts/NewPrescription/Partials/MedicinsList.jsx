import React from "react";
import MedicineCard from "./MedicineCard";

const MedicinsList = ({ medicins = [] }) => {
  return (
    <div
      className="row justify-content-center mx-auto col-md-6"
      style={{ maxWidth: 500 }}
    >
      <div className="col-12 row justify-content-between">
        <label className="ml-2">Medicine Name</label>
        <div>
          <label className="mx-1">Chronic</label>
          <label className="mx-1 mr-4 mr-xs-5">Bold</label>
        </div>
      </div>
      {medicins.map(m => {
        return <MedicineCard key={m.value} name={m.label} />;
      })}
    </div>
  );
};

export default MedicinsList;
