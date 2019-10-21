const Professor = require("../models/Professor");
const Trabalho = require("../models/Trabalho");
const User = require("../models/User");
const { Storage } = require("@google-cloud/storage");

//Google config
const professor = new Storage({
  keyFilename: "./config/professor_google.json",
  projectId: "mini-projeto-f10"
});

module.exports = {
  //Index
  async index(req, res) {
    try {
      const { _id, usuario_id, nome, account } = await req.user;

      //Verificar se conta ja existe
      if (account) {
        const { turmas } = await Professor.findById({ _id: account });
        return res.json({ turmas, nome, usuario_id });
      }

      //Criar Professor
      const newProfessor = {
        user: _id
      };
      const professor = await Professor.create(newProfessor);

      //Adicionar em User Account
      const user = await User.findById(_id);
      user.account = professor._id;
      user.save();

      //Extrair turmas do novo aluno
      const turmas = professor.turmas;

      return res.json({
        turmas,
        nome,
        usuario_id,
        msg: "Professor criado com sucesso"
      });
    } catch (error) {
      console.log(error);
    }
  }
};
