const Turma = require("../models/Turma");
const Professor = require("../models/Professor");
const Trabalho = require("../models/Trabalho");
const Aluno = require("../models/Aluno");
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
      const id_trabalho = req.params.id;
      const trabalho = await Trabalho.findById({ _id: id_trabalho });
      if (!trabalho) {
        return res.status(404).json({ msg: "trabalho nao encontrado" });
      }
      return res.json(trabalho);
    } catch (error) {
      console.log(error);
    }
  },

  async store(req, res) {
    //Adicionar trabalhos
    try {
      // Conta do professor && Id da turma
      const { account } = req.user;
      const id = req.params.id;

      if (!account) {
        return res
          .status(404)
          .json({ msg: "Conta não foi configurada corretamente" });
      }

      const turma = await Turma.findById({ _id: id });
      if (!turma) {
        return res.status(404).json({ msg: "Turma não existe" });
      }

      //Criar o novo trabalho
      const { turma_id, descricao, inicio, fim } = req.body;
      const newTrabalho = {
        turma_id,
        descricao,
        inicio,
        fim
      };

      if (!turma_id || !descricao || !inicio || !fim) {
        return res.status(404).json({ msg: "Preencha todos os campos" });
      }

      //Adicionar trabalho a turma
      const trabalho = await Trabalho.create(newTrabalho);
      turma.trabalhos.push(trabalho._id);
      turma.save();

      //Adicionar referencia aos alunos da turma
      const alunos = await Aluno.find({ turma: id });
      const newTrabalhoObj = { trabalho: trabalho._id, entrege: false };

      alunos.forEach(aluno => {
        aluno.trabalhos.push(newTrabalhoObj);
        aluno.save();
      });

      return res.json({
        msg: `Trabalho adicionado com sucesso a Turma: ${turma.turma_id}`
      });
    } catch (err) {
      console.log("erro");
    }
  },

  async avaliar(req, res) {
    try {
      const { nota } = req.body;
      const id_trabalho = req.params.id;
      const id_aluno = req.params.id_aluno;

      const trabalho = await Trabalho.findById({ _id: id_trabalho });

      trabalho.entreges.forEach(doc => {
        if (doc.aluno == id_aluno) {
          doc.nota = nota;
        }
      });

      trabalho.save();
      res.json(trabalho);
    } catch (err) {
      console.log(err);
    }
  },

  async downloadTrabalho(req, res) {
    try {
      const id_trabalho = req.params.id;
      const id_aluno = req.params.id_aluno;
      const { usuario_id } = await User.findOne({ account: id_aluno });

      const options = {
        destination: "./src/data/trabalho.jpeg"
      };

      await professor
        .bucket("aluno-trabalhos")
        .file(`${usuario_id}-${id_trabalho}.jpeg`)
        .download(options);
    } catch (err) {
      console.log(err);
    }
  }
};
