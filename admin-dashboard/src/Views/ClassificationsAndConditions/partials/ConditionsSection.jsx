import React from "react";
import { observer } from "mobx-react";
import ConditionCard from "./ConditionCard";
import { TextField, Button } from "@material-ui/core";
import { useState } from "react";

const ConditionsSection = ({ store }) => {
  const [condition, setcondition] = useState("");

  return (
    <div
      className=" col-12 col-md-6 bg-primary text-white pt-3"
      style={{ height: "100%", overflowY: "auto" }}
    >
      {store.clsConditions[store.selectedClassificationIndex] && (
        <>
          <div
            className="row mx-auto  justify-content-center align-items-center"
            style={{ maxWidth: 280 }}
          >
            <TextField
              label="New Condition"
              value={condition}
              onChange={(e) => setcondition(e.target.value)}
              variant="filled"
              InputProps={{
                style: {
                  color: "white",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
              className=" mx-auto   "
            />
            <Button
              variant="contained"
              onClick={async () => {
                const res = await store.AddCondition(condition);
                if (res) setcondition("");
              }}
            >
              Add
            </Button>
          </div>
          {store.clsConditions[store.selectedClassificationIndex].map(
            (c, i) => (
              <ConditionCard key={i} data={c} />
            )
          )}
        </>
      )}
    </div>
  );
};

export default observer(ConditionsSection);
