import React from "react";
import date from "date-and-time";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
import { Tooltip } from "@material-ui/core";

/*{
            "Id": 1,
            "Doctor_Id": 1,
            "Note": "The Patient sufferd from an intense injuery in his right arm",
            "Prescription_Date": "2020-03-26 16:08:20",
            "Classification_Name": "Heart",
            "ClassificationIconUrl": "\\images\\classifications\\heart.svg",
            "medicins": [
                {
                    "Name": "Sitamol",
                    "IsBold": "0",
                    "IsChronic": "0",
                    "Pharmacy_Id": null
                },
                {
                    "Name": "Panadol",
                    "IsBold": "0",
                    "IsChronic": "0",
                    "Pharmacy_Id": null
                },
                {
                    "Name": "Benzamien",
                    "IsBold": "1",
                    "IsChronic": "1",
                    "Pharmacy_Id": null
                }
            ]
        }
        */
const PrescriptionCard = ({ prescription }) => {
  const newDate = date.format(
    new Date(prescription.Prescription_Date),
    "DD MMM"
  );

  const note = prescription.Note;
  const allowedNoteLength = 60;

  return (
    <div className="prescription-card mx-auto py-5">
      <Tooltip title={<h6>{note}</h6>}>
        <div className="note  bg-primary px-3 py-3">
          <p className=" mb-0 ">
            {note.slice(0, allowedNoteLength)}
            {note.length > allowedNoteLength && "...."}
          </p>
        </div>
      </Tooltip>
      <div className="icon ">
        <img src={prescription.ClassificationIconUrl} alt="classification" />
      </div>

      <div className="medicins px-4 py-5 py-md-0  row justify-content-begin">
        {prescription.medicins.map((m, i) => (
          <div key={i} className="col-10 col-md-5 mx-2">
            {m.Pharmacy_Id ? (
              <Check style={{ color: "green" }} />
            ) : (
              <Close style={{ color: "red" }} />
            )}{" "}
            <p
              className={`d-inline-block ml-2 ${
                m.IsBold === "1" ? "font-weight-bold" : ""
              }`}
            >
              {m.Name}
            </p>
          </div>
        ))}
      </div>
      <div className="date bg-primary">
        <span className="h4 text-center">{newDate.split(" ")[0]}</span>
        <span>{newDate.split(" ")[1]}</span>
      </div>
    </div>
  );
};

export default PrescriptionCard;
