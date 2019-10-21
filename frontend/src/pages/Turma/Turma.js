import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Trabalho from "../../components/TrabalhoProfessor/Trabalho";
const Turma = ({ match }) => {
  const [trabalhos, setTrabalhos] = useState([]);

  useEffect(() => {
    const runEffect = async () => {
      try {
        const { data } = await api.get(`/professor/turmas/${match.params.id}`);
        setTrabalhos(data.trabalhos);
      } catch (err) {
        console.log(err);
      }
    };
    runEffect();
  }, [match.params.id]);

  return (
    <div>
      {trabalhos.map(doc => (
        <Trabalho key={doc} id={doc}></Trabalho>
      ))}
    </div>
  );
};

export default Turma;
