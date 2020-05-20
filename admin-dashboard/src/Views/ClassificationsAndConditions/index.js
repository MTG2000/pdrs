import React, { useContext, useState } from "react";
import Container from "@material-ui/core/Container";
import { Box, Paper } from "@material-ui/core";
import { mainContext } from "../../stores/Context";
import ClassificationsSection from "./partials/ClassificationsSection";
import ConditionsSection from "./partials/ConditionsSection";
import NewClassification from "./partials/NewClassification";

const ClassificationsAndConditions = () => {
  const { ManageClassificationsStore } = useContext(mainContext);
  const [store] = useState(ManageClassificationsStore);

  return (
    <Container className="py-5">
      <Paper style={{ height: "80vh" }}>
        <div className="row" style={{ position: "relative", height: "100%" }}>
          <ClassificationsSection store={store} />
          <NewClassification store={store} />
          <ConditionsSection store={store} />
        </div>
      </Paper>
    </Container>
  );
};

export default ClassificationsAndConditions;
