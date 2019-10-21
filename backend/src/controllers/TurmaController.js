const Turma = require("../models/Turma");
const Professor = require("../models/Professor");
const User = require("../models/User");

module.exports = {
  //Index
  async index(req, res) {
    try {
      const { nome, usuario_id, account } = req.user;
      const { turmas } = await Professor.findById({ _id: account });
      const turmasAll = await Turma.find({ _id: turmas });

      return res.json(turmasAll);
    } catch (error) {
      console.log(error);
    }
  },

  async indexOne(req, res) {
    try {
      const id = req.params.id;
      const turma = await Turma.findById({ _id: id });
      if (turma) {
        return res.json(turma);
      }
      res.status(404).json({ msg: "turma não encontrada" });
    } catch (err) {
      res.status(404).json({ msg: "turma não encontrada" });
    }
  },

  async store(req, res) {
    //Adicionar novas turmas
    try {
    } catch (err) {}
  }
};
