const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  //Basic Settings
  turma_id: {
    type: String,
    required: true
  },

  turma: {
    type: String,
    required: true
  },

  curso: {
    type: String,
    required: true
  },

  materia_atual: {
    type: String,
    required: true
  },

  periodo: {
    type: String,
    required: true
  },

  dias: {
    type: String,
    required: true
  },

  alunos: [
    {
      type: Schema.Types.ObjectId,
      ref: "aluno"
    }
  ],

  trabalhos: [
    {
      type: Schema.Types.ObjectId,
      ref: "trabalho"
    }
  ]
});

module.exports = model("turma", UserSchema);
