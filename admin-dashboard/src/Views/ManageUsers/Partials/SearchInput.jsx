import React from "react";
import { TextField, makeStyles, useTheme } from "@material-ui/core";
import { useState } from "react";

const useStyle = makeStyles({
  input: theme => ({
    borderColor: `${theme.palette.primary.main} !important`,
    borderWidth: 2,
    maxWidth: 280
  })
});

const SearchInput = ({ store }) => {
  const theme = useTheme();
  const classes = useStyle({ ...theme });
  const [search, setSearch] = useState("");

  return (
    <div className="row justify-content-center">
      <TextField
        id="search-users"
        label="Search Users"
        value={search}
        onChange={e => {
          setSearch(e.target.value);
          store.SearchUsers(e.target.value);
        }}
        variant="outlined"
        color="primary"
        className={`${classes.input} mx-auto mb-3 col-12 `}
        InputProps={{
          classes: {
            notchedOutline: classes.input
          }
        }}
      />
    </div>
  );
};

export default SearchInput;
