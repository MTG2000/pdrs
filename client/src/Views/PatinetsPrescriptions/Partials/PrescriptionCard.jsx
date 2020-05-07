import React from "react";
import date from "date-and-time";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
import Note from "@material-ui/icons/Bookmark";
import Tooltip from "@material-ui/core/Tooltip";

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
  const fullDate = date.format(
    new Date(prescription.Prescription_Date),
    "YYYY-MM-DD "
  );

  const miniDate = date.format(
    new Date(prescription.Prescription_Date),
    "DD MMM"
  );

  return (
    <div className="prescription-card mx-auto py-5">
      {prescription.Note ? (
        <Tooltip title={<h6>{prescription.Note}</h6>}>
          <div className="note  bg-primary px-3 py-3">
            <p className=" mb-0 ">
              {prescription.Condition} <Note />
            </p>
          </div>
        </Tooltip>
      ) : (
        <div>
          <div className="note  bg-primary px-3 py-3">
            <p className=" mb-0 ">{prescription.Condition}</p>
          </div>
        </div>
      )}
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
      <Tooltip title={fullDate}>
        <div className="date bg-primary">
          <span className="h4 text-center">{miniDate.split(" ")[0]}</span>
          <span>{miniDate.split(" ")[1]}</span>
        </div>
      </Tooltip>
    </div>
  );
};

export default PrescriptionCard;
