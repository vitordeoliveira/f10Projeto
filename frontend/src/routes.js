import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./auth/PrivateRoute";
import Home from "./pages/Home/Login";
import Professor from "./pages/Professor/Professor";
import Turma from "./pages/Turma/Turma";
import Aluno from "./pages/Aluno/Aluno";

const routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <PrivateRoute
          path="/professor"
          exact
          component={Professor}
        ></PrivateRoute>
        <Route path="/turmas/:id" exact component={Turma}></Route>
        <Route path="/hum" exact component={Aluno}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default routes;
