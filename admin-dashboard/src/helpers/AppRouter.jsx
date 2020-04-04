import React from "react";
import { Route, Switch } from "react-router-dom";

import { observer } from "mobx-react";
import Home from "../Views/Dashboard";
import ManageUsers from "../Views/ManageUsers";
import ManageMedicins from "../Views/ManageMedicins";

const AppRouter = ({ store }) => {
  // const { username, role } = store;

  return (
    <Switch>
      <Route path="/manage-users" component={ManageUsers} />
      <Route path="/manage-medicins" component={ManageMedicins} />

      <Route path="/" component={Home} />
    </Switch>
  );
};

export default observer(AppRouter);
