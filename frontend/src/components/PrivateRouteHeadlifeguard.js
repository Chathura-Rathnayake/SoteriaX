import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRouteHeadLifeguard({
  component: Component,
  ...rest
}) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser &&
          currentUser.email.toUpperCase() !=
            process.env.REACT_APP_ADMIN_EMAIL.toUpperCase() ? ( //gues i do not need to handle mobile app lifeguards in here -- see this
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
