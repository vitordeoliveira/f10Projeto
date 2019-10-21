import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Login";
import Professor from "./pages/Professor/Professor";
import Turma from "./pages/Turma/Turma";
import Aluno from "./pages/Aluno/Aluno";

const routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route
          path="/professor"
          exact
          component={Professor}
          auth={false}
        ></Route>
        <Route path="/turmas/:id" exact component={Turma}></Route>
        <Route path="/aluno" exact component={Aluno}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default routes;
