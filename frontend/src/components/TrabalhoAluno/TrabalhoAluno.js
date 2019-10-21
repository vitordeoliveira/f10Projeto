import React, { useEffect, useState, Fragment } from "react";
import api from "../../services/api";
import FileUpload from "../../components/FileUpload/FileUpload";
import Moment from "react-moment";

//CSS
import "./TrabalhoAluno.css";
const Trabalho = ({ id, aluno, entrege }) => {
  const [trabalho, setTrabalho] = useState({
    descricao: "",
    turma: "",
    inicio: "",
    fim: ""
  });

  const [entreges, setEntreges] = useState({ nota: "" });

  useEffect(() => {
    const runEffect = async () => {
      try {
        const { data } = await api.get(`/aluno/trabalho/${id}`);
        setTrabalho({
          descricao: data.descricao,
          turma: data.turma_id,
          inicio: data.inicio,
          fim: data.fim
        });
        const filter = data.entreges.filter(doc => {
          return (doc.aluno = aluno);
        });
        setEntreges({ nota: filter[0].nota });
      } catch (err) {
        console.log(err);
      }
    };
    runEffect();
  }, [id, aluno]);

  return (
    <Fragment>
      <div className="trabalhoAluno-container">
        <h3>{`Descrição: ${trabalho.descricao}`}</h3>
        <p>{`Turma: ${trabalho.turma}`}</p>
        <p>
          Data de Inicio: <Moment format="DD/MM/YYYY">{trabalho.inicio}</Moment>
        </p>
        <p>
          Data Final: <Moment format="DD/MM/YYYY">{trabalho.fim}</Moment>
        </p>
        <p>{`Nota: ${entreges.nota}`}</p>
      </div>

      <div className="status-trabalho">
        {entrege === "true" ? (
          <FileUpload id={id} status={true}></FileUpload>
        ) : (
          <FileUpload id={id} status={false}></FileUpload>
        )}
      </div>
    </Fragment>
  );
};

export default Trabalho;
