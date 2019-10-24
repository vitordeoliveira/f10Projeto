import React, { useState } from "react";
import "./Login.css";
import api from "../../services/api";
import { useAuth } from "../../context/UserContext";

function Login({ history }) {
  const { setAuthToken } = useAuth();

  const [formData, setFormData] = useState({
    usuario_id: "",
    login: ""
  });

  const [toggle, setToggle] = useState(false);

  const [error, setError] = useState({});

  const { usuario_id, login } = formData;

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      const { data } = await api.post("/login", formData);
      if (data.role === "professor") {
        setAuthToken("professor");
        return history.push(`/professor`);
      }

      if (data.role === "aluno") {
        setAuthToken("aluno");
        return history.push("/aluno");
      }
    } catch (err) {
      setError(err.response.data);
      setToggle(true);
      setTimeout(() => {
        setToggle(false);
        setError("");
      }, 3000);
    }
  }

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="container-login">
      <img
        src="http://www.f10.com.br/wp-content/uploads/2019/03/logo_f101.png"
        alt="Portal F10 Software"
        className="regular-logo"
      ></img>

      <form className="form-login" onSubmit={e => handleSubmit(e)}>
        {toggle && <div className="error-msg">{error.msg}</div>}

        <input
          type="text"
          placeholder="usuario"
          name="usuario_id"
          value={usuario_id}
          onChange={e => onChange(e)}
        ></input>
        <input
          type="text"
          placeholder="login"
          name="login"
          value={login}
          onChange={e => onChange(e)}
        ></input>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Login;
