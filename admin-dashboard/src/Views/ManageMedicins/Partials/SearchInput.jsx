import React from "react";
import { TextField } from "@material-ui/core";
import { useState } from "react";

const SearchInput = ({ store }) => {
  const [search, setSearch] = useState("");

  return (
    <div
      className="row mx-auto justify-content-center"
      style={{ maxWidth: 280 }}
    >
      <TextField
        id="search-meds"
        label="Search Medicins"
        value={search}
        onChange={e => {
          setSearch(e.target.value);
          store.SearchMedicins(e.target.value);
        }}
        variant="outlined"
        color="primary"
        className=" mx-auto mb-3 col-12 "
      />
    </div>
  );
};

export default SearchInput;
