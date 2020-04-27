import React from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

const PrescriptionNote = ({ store }) => {
  const { t } = useTranslation("common");

  return (
    <div className="row mt-5 mb-5 ">
      <div className="container-note col-8 mx-auto px-0">
        <p className="note bg-primary">{t("note")}</p>
        <textarea
          type="text"
          className="write-note"
          required
          value={store.note}
          onChange={e => store.SetNote(e.target.value)}
        ></textarea>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
        <div className="line4"></div>
        <div className="line5"></div>
      </div>
    </div>
  );
};

export default observer(PrescriptionNote);
