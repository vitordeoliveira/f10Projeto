import React, { useEffect, useState, Fragment } from "react";
import api from "../../services/api";

const Trabalho = ({ id }) => {
  const [aluno, setAluno] = useState({});

  useEffect(() => {
    const runEffect = async () => {
      try {
        const { data } = await api.get(`/professor/aluno/${id}`);
        setAluno(data);
      } catch (err) {
        console.log(err);
      }
    };
    runEffect();
  }, [id]);

  return (
    <Fragment>
      <p>{`Nome: ${aluno.nome}`}</p>
    </Fragment>
  );
};

export default Trabalho;
