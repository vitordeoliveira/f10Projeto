import React, { useEffect, useState, Fragment } from "react";
import api from "../../services/api";
import Aluno from "../Aluno/Aluno";
import Moment from "react-moment";

//CSS
import "./Trabalho.css";
const Trabalho = ({ id }) => {
  const [trabalho, setTrabalho] = useState({
    _id: "",
    turma_id: "",
    descricao: "",
    inicio: "",
    fim: "",
    entreges: []
  });
  const [entreges, setEntreges] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormdata] = useState({
    nota: ""
  });

  const { nota } = formData;

  // eslint-disable-next-line
  const runEffect = async () => {
    try {
      const { data } = await api.get(`professor/trabalho/${id}`);
      setTrabalho(data);
      if (data.entreges.length > 0) {
        setEntreges(data.entreges);
        setShow(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    runEffect();
  }, [runEffect]);

  const onClick = async (e, aluno) => {
    try {
      await api.post(
        `/professor/trabalho/${trabalho._id}/aluno/${aluno}/avaliar`,
        formData
      );
      runEffect();
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = e => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="trabalho-container">
      <h2>{trabalho.descricao}</h2>
      <h3>
        Data de Inicio: <Moment format="DD/MM/YYYY">{trabalho.inicio}</Moment>
      </h3>
      <h3>
        Prazo final: <Moment format="DD/MM/YYYY">{trabalho.fim}</Moment>{" "}
      </h3>
      <div className="trabalho-entreges">
        {show ? (
          <Fragment>
            {entreges.map(doc => (
              <Fragment key={doc._id}>
                <div className="info-container">
                  <p>{doc.nota}</p>
                  <p>{doc.dataEntrega}</p>
                  <Aluno id={doc.aluno}></Aluno>
                </div>
                <div className="button-container">
                  <input
                    type="number"
                    placeholder="nota"
                    name="nota"
                    value={nota}
                    onChange={e => onChange(e)}
                  ></input>
                  <button class="btn" onClick={e => onClick(e, doc.aluno)}>
                    Avaliar
                  </button>

                  <button class="btn">
                    <a
                      className="download"
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  </button>
                </div>
              </Fragment>
            ))}
          </Fragment>
        ) : (
          <p>Nenhum trabalho foi entrege</p>
        )}
      </div>
    </div>
  );
};

export default Trabalho;
