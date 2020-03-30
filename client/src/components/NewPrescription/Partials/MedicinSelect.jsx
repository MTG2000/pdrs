import React from "react";
import SearchableSelect from "../../Shared/SearchableSelect";

const MedicinSelect = ({ store }) => {
  return (
    <div className="col-md-6 py-5 mx-auto row justify-content-center">
      <div style={{ maxWidth: 500, width: "100%" }}>
        <SearchableSelect
          fetchUrl="/api/medicins"
          queryName="name"
          classes="w-100"
          placeholder="Type A Medicine Name"
          handleSelect={v => {
            store.AddMedicine(v);
          }}
        />
      </div>
    </div>
  );
};

export default MedicinSelect;
