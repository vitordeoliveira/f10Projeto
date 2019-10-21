import React, { useState, useEffect } from "react";
import Trabalho from "../../components/TrabalhoAluno/TrabalhoAluno";
import api from "../../services/api";

//CSS
import "./Aluno.css";
const Aluno = () => {
  const [aluno, setAluno] = useState({
    nome: "",
    trabalhos: [],
    usuario_id: ""
  });

  useEffect(() => {
    const runEffect = async () => {
      try {
        const { data } = await api.get(`/aluno`);
        setAluno(data);
      } catch (err) {
        console.log(err);
      }
    };
    runEffect();
  }, []);

  return (
    <div className="aluno-container">
      <h1 className="aluno-nome">Aluno: {aluno.nome}</h1>
      <h3 className="aluno-usuario">Usuario: {aluno.usuario_id}</h3>
      <div className="aluno-trabalhos">
        {aluno.trabalhos.map(doc => (
          <div className="trabalho-aluno-container" key={doc._id}>
            <Trabalho
              id={doc.trabalho}
              aluno={aluno.usuario_id}
              entrege={doc.entrege}
            ></Trabalho>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Aluno;
