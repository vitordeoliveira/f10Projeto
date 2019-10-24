import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/UserContext";

export const PrivateRoute = ({ component: Component, type, ...rest }) => {
  const { authToken } = useAuth();
  return (
    <Route
      {...rest}
      render={props =>
        authToken === type ? (
          <Component {...props}></Component>
        ) : (
          <Redirect
            to={{
              pathname: `/`,
              state: {
                referer: props.location
              }
            }}
          ></Redirect>
        )
      }
    ></Route>
  );
};
