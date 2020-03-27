import React from "react";
import SearchableSelect from "../../Partials/SearchableSelect";

const MedicinSelect = ({ handleSelect }) => {
  return (
    <div className="col-md-6 py-5 mx-auto row justify-content-center">
      <div style={{ maxWidth: 500, width: "100%" }}>
        <SearchableSelect
          fetchUrl="/api/medicins"
          queryName="name"
          classes="w-100"
          placeholder="Type A Medicine Name"
          handleSelect={v => {
            handleSelect(v);
          }}
        />
      </div>
    </div>
  );
};

export default MedicinSelect;
