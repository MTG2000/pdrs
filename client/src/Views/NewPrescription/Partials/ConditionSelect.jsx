import React from "react";
import { useTranslation } from "react-i18next";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { observer } from "mobx-react";
import { TextField } from "@material-ui/core";

const ConditionSelect = ({ store }) => {
  const { t } = useTranslation("common");

  const [inputValue, setInputValue] = React.useState();

  return (
    <div className="col-12 py-5 mx-auto row justify-content-center">
      <Autocomplete
        value={store.selectedCondition}
        onChange={(event, newValue) => {
          store.SelectCondition(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        getOptionLabel={(option) => option.Name || ""}
        options={store.conditions}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={t("select condition")}
            variant="outlined"
          />
        )}
      />
    </div>
  );
};

export default observer(ConditionSelect);
