import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const PrivateRoute = ({ component: Component, type, ...rest }) => {
  const { auth } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={props =>
        auth === type ? (
          <Component {...props}></Component>
        ) : (
          <Redirect
            to={{
              pathname: `/`,
              state: {
                z: props.location
              }
            }}
          ></Redirect>
        )
      }
    ></Route>
  );
};
