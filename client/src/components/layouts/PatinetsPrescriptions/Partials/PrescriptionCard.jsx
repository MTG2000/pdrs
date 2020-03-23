import React from "react";
import icon from "./heart.svg";
import date from "date-and-time";

/*{
      Id: 1,
      Doctor_Id: 1,
      Patient_Id: "02114432341",
      Classification_Id: 1,
      Pre_Date: "2020-03-23 18:13:39",
      Description:
        "The Patient sufferd from an intense injuery in his right arm",
      medicins: [
        {
          Name: "Sitamol",
          IsBold: "0",
          IsChronic: "0",
          Pharmacy_Id: null
        },
        {
          Name: "Panadol",
          IsBold: "0",
          IsChronic: "0",
          Pharmacy_Id: null
        },
        {
          Name: "Benzamien",
          IsBold: "0",
          IsChronic: "1",
          Pharmacy_Id: null
        }
      ]
    }*/
const PrescriptionCard = ({ prescription }) => {
  const newDate = date.format(new Date(), "DD MMM");

  console.log(prescription);
  return (
    <div className="prescription-card mx-auto py-5">
      <div className="note  bg-primary">
        <p className=" mb-0">{prescription.Description}</p>
      </div>
      <div className="icon ">
        <img src={icon} alt="classification" />
      </div>

      <div className="medicins px-4 py-5 py-md-0  row justify-content-begin">
        {prescription.medicins.map((m, i) => (
          <p key={i} className="col-10 col-md-5 mx-2 ">
            {m.Name}
          </p>
        ))}
      </div>
      <div className="row no-gutters content-card"></div>
      <div className="date bg-primary">
        <span className="h4 text-center">{newDate.split(" ")[0]}</span>
        <span>{newDate.split(" ")[1]}</span>
      </div>
    </div>
  );
};

export default PrescriptionCard;
