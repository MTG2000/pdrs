import React from "react";
import PrescriptionCard from "./PrescriptionCard";

const PrescriptionsList = ({ prescriptions, loading }) => {
  if (loading) return <h2>Loading</h2>;

  return (
    <div>
      {prescriptions.map((p, i) => (
        <PrescriptionCard key={i} prescription={p} />
      ))}
    </div>
  );
};

export default PrescriptionsList;
