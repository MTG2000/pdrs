import React, { useState } from "react";
import date from "date-and-time";
import Tooltip from "@material-ui/core/Tooltip";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

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
const PrescriptionCard = ({ prescription, store }) => {
  const newDate = date.format(
    new Date(prescription.Prescription_Date),
    "DD MMM"
  );

  const note = prescription.Note;
  const allowedNoteLength = 60;
  const [medicinsToDispense, setMedicinsToDispense] = useState({});
  const [selectAll, setSelectAll] = useState(true);
  const toggleMedicineDispens = (id, v) => {
    setMedicinsToDispense({ ...medicinsToDispense, [id]: v });
  };

  const toggleAll = () => {
    let medicins = {};
    prescription.medicins.forEach(m => {
      medicins = { ...medicins, [m.Id]: selectAll };
    });
    setMedicinsToDispense(medicins);
    setSelectAll(!selectAll);
  };

  const handleDispense = () => {
    const medicinsIds = Object.keys(medicinsToDispense)
      .filter(m => medicinsToDispense[m])
      .map(Number);
    console.log(medicinsIds);

    store.Dispense(prescription.Id, medicinsIds);
  };

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
        <div className="col-10 mx-2">
          <Checkbox
            color="primary"
            checked={!selectAll}
            onChange={e => toggleAll(e.target.checked)}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
          <p className="d-inline-block ml-2 "></p>{" "}
        </div>

        {prescription.medicins.map((m, i) => (
          <div key={i} className="col-10 mx-2">
            <Checkbox
              color="primary"
              checked={medicinsToDispense[m.Id] === true}
              onChange={e => toggleMedicineDispens(m.Id, e.target.checked)}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
            <p className="d-inline-block ml-2 ">{m.Name}</p>
          </div>
        ))}
        <Button
          variant="contained"
          color="primary"
          className="mx-4"
          onClick={handleDispense}
        >
          Dispense
        </Button>
      </div>
      <div className="date bg-primary">
        <span className="h4 text-center">{newDate.split(" ")[0]}</span>
        <span>{newDate.split(" ")[1]}</span>
      </div>
    </div>
  );
};

export default PrescriptionCard;
