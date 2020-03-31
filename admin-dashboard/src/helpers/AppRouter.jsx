import React from "react";
import { Route, Switch } from "react-router-dom";

import { observer } from "mobx-react";
import Home from "../Views/Home";
import AddUser from "../Views/AddUser";

const AppRouter = ({ store }) => {
  // const { username, role } = store;

  return (
    <Switch>
      <Route path="/add-user" component={AddUser} />
      <Route path="/" component={Home} />
    </Switch>
  );
};

export default observer(AppRouter);
