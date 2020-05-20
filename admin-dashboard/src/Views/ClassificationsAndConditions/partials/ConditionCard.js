import React from "react";

const ConditionCard = ({ data }) => {
  return (
    <div className="px-2 py-2 my-2">
      <p className="m-0">{data.Name}</p>
    </div>
  );
};

export default ConditionCard;
