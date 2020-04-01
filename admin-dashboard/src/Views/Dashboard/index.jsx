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
      <NewMessagesList store={store} />
      <NewAccountRequests store={store} />
    </Container>
  );
};

export default Dashboard;
