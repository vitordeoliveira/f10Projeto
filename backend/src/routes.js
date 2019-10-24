const { Router } = require("express");
const UserController = require("./controllers/UserController");
const ProfessorController = require("./controllers/ProfessorController");
const AlunoController = require("./controllers/AlunoController");
const TurmaController = require("./controllers/TurmaController");
const TrabalhoController = require("./controllers/TrabalhoController");
const {
  Authenticated,
  forwardAuthenticated
} = require("../middleware/Authentication");

const { professor, aluno } = require("../middleware/Autorization");

const routes = Router();

routes.post("/login", UserController.login);
routes.get("/logout", Authenticated, UserController.logout);
routes.get("/", (req, res) => {
  res.json({ home: "home" });
});

//Professor
routes.get("/professor", Authenticated, professor, ProfessorController.index);
routes.get(
  "/professor/turmas",
  Authenticated,
  professor,
  TurmaController.index
);

routes.get(
  "/professor/turmas/:id",
  Authenticated,
  professor,
  TurmaController.indexOne
);

routes.post(
  "/professor/turmas/:id",
  Authenticated,
  professor,
  TrabalhoController.store
);

routes.get(
  "/professor/trabalho/:id",
  Authenticated,
  professor,
  TrabalhoController.index
);

routes.get(
  "/professor/aluno/:id",
  Authenticated,
  professor,
  AlunoController.indexOne
);

routes.post(
  "/professor/trabalho/:id/aluno/:id_aluno/avaliar",
  Authenticated,
  professor,
  TrabalhoController.avaliar
);

routes.get(
  "/professor/trabalho/:id/aluno/:id_aluno/download",
  Authenticated,
  professor,
  TrabalhoController.downloadTrabalho
);

//Aluno
routes.get("/aluno", Authenticated, aluno, AlunoController.index);
routes.get(
  "/aluno/trabalho/:id",
  Authenticated,
  aluno,
  TrabalhoController.index
);
routes.post(
  "/aluno/trabalho/:id",
  Authenticated,
  aluno,
  AlunoController.entregarTrabalho
);

routes.get("/deu", (req, res) => {
  return res.status(200).json(req.user);
});
routes.get("/naodeu", (req, res) => {
  return res.status(401).json({ msg: "Login não existe" });
});

//Admin

module.exports = routes;
