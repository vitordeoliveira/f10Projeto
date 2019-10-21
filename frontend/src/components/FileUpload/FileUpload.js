import React, { Fragment, useState } from "react";
import api from "../../services/api";

//CSS
import "./FileUpload.css";
const FileUpload = ({ id, status }) => {
  const [file, setFile] = useState();
  const [filename, setFilename] = useState("Escolha o arquivo");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [message, setMessage] = useState("");
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(!status);
  const [info, setInfo] = useState(status);

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post(`/aluno/trabalho/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
          //Clear percentage
          setTimeout(() => setUploadPercentage(0), 2000);
          setOpen(false);
          setInfo(true);
        }
      });
    } catch (err) {
      setMessage(err.response.data);
      setToggle(true);
      setOpen(true);
      setInfo(false);
      setTimeout(() => {
        setToggle(false);
      }, 2000);
    }
  };
  return (
    <Fragment>
      {info ? (
        <p>
          Status do trabalho: <span className="entrege">Trabalho Entregue</span>
        </p>
      ) : (
        <p>
          Status do trabalho:{" "}
          <span className="pendente">Trabalho Pendente</span>
        </p>
      )}

      {toggle && <div className="error-msg">{message.msg}</div>}
      {open && (
        <Fragment>
          <form onSubmit={onSubmit}>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="customFile"
                onChange={onChange}
              ></input>
              <label className="custom-file-label" htmlFor="customFile">
                {filename}
              </label>
            </div>

            <input type="submit" value="Upload" className="btn-upload"></input>
          </form>
        </Fragment>
      )}

      <div>
        {uploadPercentage > 0 ? (
          <Fragment>{`Fazendo upload: ${uploadPercentage}%`}</Fragment>
        ) : (
          ""
        )}
      </div>
    </Fragment>
  );
};

export default FileUpload;
