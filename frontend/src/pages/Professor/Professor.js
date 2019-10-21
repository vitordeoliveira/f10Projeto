import React, { useState, useEffect } from "react";
import api from "../../services/api";
import Turma from "../../components/Turma/Turma";

//CSS
import "./Professor.css";

const Professor = () => {
  const [professor, setProfessor] = useState({
    nome: "",
    turmas: [],
    usuario_id: ""
  });

  useEffect(() => {
    const runEffect = async () => {
      try {
        const professor = await api.get("/professor");
        setProfessor(professor.data);
      } catch (err) {
        console.log(err);
      }
    };
    runEffect();
  }, []);

  return (
    <div className="professor-container">
      <h1 className="professor-nome">Professor: {professor.nome}</h1>
      <h3 className="professor-usuario">Usuario: {professor.usuario_id}</h3>
      <div className="professor-turmas">
        <ul>
          {professor.turmas.map(turma => (
            <Turma key={turma._id} id={turma}></Turma>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Professor;
