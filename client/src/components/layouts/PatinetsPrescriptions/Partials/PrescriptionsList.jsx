import React from "react";
import PrescriptionCard from "./PrescriptionCard";

const resData = {
  prescriptions: [
    {
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
          IsBold: "1",
          IsChronic: "0",
          Pharmacy_Id: "123"
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
          Pharmacy_Id: "123"
        }
      ]
    },
    {
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
          Pharmacy_Id: "123"
        },
        {
          Name: "Panadol",
          IsBold: "1",
          IsChronic: "0",
          Pharmacy_Id: "123"
        },
        {
          Name: "Benzamien",
          IsBold: "0",
          IsChronic: "1",
          Pharmacy_Id: "123"
        }
      ]
    },
    {
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
          Pharmacy_Id: "123"
        },
        {
          Name: "Benzamien",
          IsBold: "0",
          IsChronic: "1",
          Pharmacy_Id: "123"
        }
      ]
    }
  ],
  chronicMedicins: []
};

const PrescriptionsList = () => {
  return (
    <div>
      {resData.prescriptions.map((p, i) => (
        <PrescriptionCard key={i} prescription={p} />
      ))}
    </div>
  );
};

export default PrescriptionsList;
