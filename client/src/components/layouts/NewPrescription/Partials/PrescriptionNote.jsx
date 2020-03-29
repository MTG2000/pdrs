import React from "react";
import { observer } from "mobx-react";

const PrescriptionNote = ({ store }) => {
  return (
    <div className="row mt-5 mb-5 ">
      <div className="container-note col-8 mx-auto px-0">
        <p className="note bg-primary">Note</p>
        <textarea
          type="text"
          className="write-note"
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
