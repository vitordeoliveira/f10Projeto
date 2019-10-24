import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";

const Turma = ({ id }) => {
  const [turmas, setTurmas] = useState([]);
  const [numeroAlunos, setNumeroAlunos] = useState(0);
  const [numeroTrabalhos, setNumeroTrabalhos] = useState(0);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const runEffect = async () => {
      try {
        const { data } = await api.get(`/professor/turmas/${id}`);

        if (data.alunos) {
          setNumeroAlunos(data.alunos.length);
        }
        if (data.trabalhos) {
          setNumeroTrabalhos(data.trabalhos.length);
        }
        setTurmas(data);
        setloading(false);
      } catch (err) {
        console.log(err);
      }
    };
    runEffect();
  }, [id]);

  return (
    <li Style={"list-style: none"}>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <div className="turma-container">
          <h3>{`${turmas.turma} - Numero de alunos: ${numeroAlunos}`}</h3>
          <p>{`Trabalhos: ${numeroTrabalhos}`}</p>
          <p>{turmas.curso}</p>
          <p>{turmas.materia_atual}</p>
          <p>{turmas.periodo}</p>
          <p>{turmas.dias}</p>
          <Link
            to={`/turmas/${turmas._id}`}
          >{`Acessar turma: ${turmas.turma_id}`}</Link>
        </div>
      )}
    </li>
  );
};

export default Turma;
