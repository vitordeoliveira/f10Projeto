import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import api from "../services/api";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const [auth, setAuth] = useState(true);

  const runAsyncEffect = async () => {
    try {
      const { data } = await api.get("/deu");
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    runAsyncEffect();
  }, []);

  return (
    <Route
      {...rest}
      render={props =>
        auth ? (
          <Component {...props}></Component>
        ) : (
          <Redirect
            to={{
              pathname: `/`,
              state: {
                from: props.location
              }
            }}
          ></Redirect>
        )
      }
    ></Route>
  );
};
