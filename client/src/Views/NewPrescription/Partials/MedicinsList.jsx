import React from "react";
import MedicineCard from "./MedicineCard";
import { observer } from "mobx-react";

const MedicinsList = ({ store }) => {
  const medicins = store.medicins;

  return (
    <div
      className="row justify-content-center align-content-start mx-auto col-12"
      style={{ minHeight: 400 }}
    >
      <div className="col-12 px-0 row justify-content-between">
        <label className="">Medicine Name</label>
        <div>
          <label className="mx-1">Chronic</label>
          <label className="mx-1 mr-4">Bold</label>
        </div>
      </div>
      <div className=" w-100">
        {medicins.map((m, i) => {
          return (
            <MedicineCard
              key={m.value}
              name={m.label}
              onRemove={() => store.RemoveMedicin(i)}
              onToggleBold={() => store.ToggleBold(i)}
              onToggleChronic={() => store.ToggleChronic(i)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default observer(MedicinsList);
