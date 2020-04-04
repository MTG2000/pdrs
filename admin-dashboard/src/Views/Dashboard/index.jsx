import React, { useContext, useState } from "react";
import { Container } from "@material-ui/core";
import NewMessagesList from "./Partials/NewMessagesList";
import { mainContext } from "../../stores/Context";
import NewAccountRequests from "./Partials/NewAccountRequests";

const Dashboard = () => {
  const { DashboardStore } = useContext(mainContext);
  const [store] = useState(DashboardStore);

  return (
    <Container className="py-5">
      <div className="row">
        <div className="col-12 col-lg-6">
          <NewMessagesList store={store} />
        </div>
        <div className="col-12 col-lg-6">
          <NewAccountRequests store={store} />
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
