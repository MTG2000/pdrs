import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAuth = false, ...props }) => {
  console.log("Private");
  return (
    <Route
      {...props}
      render={innerProps => {
        return isAuth ? (
          <Component {...innerProps} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

export default PrivateRoute;
