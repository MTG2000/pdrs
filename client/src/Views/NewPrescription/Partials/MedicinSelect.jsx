import React from "react";
import SearchableSelect from "../../Shared/SearchableSelect";
import { useTranslation } from "react-i18next";

const MedicinSelect = ({ store }) => {
  const { t } = useTranslation("common");

  return (
    <div className="col-12 py-5 mx-auto row justify-content-center">
      <div style={{ width: "100%" }}>
        <SearchableSelect
          fetchUrl="/api/medicins"
          autoFocus={true}
          queryName="name"
          classes="w-100"
          placeholder={t("type med name")}
          handleSelect={v => {
            store.AddMedicine(v);
          }}
        />
      </div>
    </div>
  );
};

export default MedicinSelect;
