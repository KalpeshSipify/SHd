/* This code is defining a React component called `PrivateRoute`. */
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { IsAuthenticateContext } from "../Context/IsAuthenticateContext";

const PrivateRoute = () => {
  // Assessing the is authenticated function form context to set state
  const { IsAuth } = React.useContext(IsAuthenticateContext);
  // navigated based on conditions
  return IsAuth ? <Outlet /> : <Navigate to="/Auth/login" />;
};

export default PrivateRoute;
